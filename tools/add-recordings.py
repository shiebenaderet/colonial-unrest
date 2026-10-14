#!/usr/bin/env python3
"""Add Mr. B's recordings to the site.

    python3 tools/add-recordings.py unrest-recordings-2026-10-20.zip

The zip is what record.html's "Download all" gives: one audio file per reading
("A-core.webm", ...) and recordings.json with each one's sentence cues. Each file
is converted to a small mono MP3 (plays everywhere, iPads included) with its
loudness evened out and the silence before the first word trimmed (the cues move
with it), written to audio/<key>.mp3, and listed in
audio/recordings.js, which reader-tools.js reads. Readings already in
recordings.js and not in the zip are kept, so the zips can come a few at a time.
Needs ffmpeg.
"""
import hashlib, json, os, re, subprocess, sys, tempfile, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, 'audio')
JS = os.path.join(AUDIO, 'recordings.js')
KEY = re.compile(r'^[A-Z]-(l0|ss|core|adv)$')

HEADER = """/* Mr. B's recordings of the readings, read by reader-tools.js (the "Mr. B" voice).
   Written by tools/add-recordings.py from the zip that record.html downloads; don't
   edit by hand. Key: "<event id>-<level>", e.g. "A-core". src is the audio file,
   cues the start of each sentence in seconds, n the number of sentences. */
"""


def lead_silence(path):
    """Seconds of silence before the first word, from ffmpeg's silencedetect."""
    err = subprocess.run(['ffmpeg', '-hide_banner', '-i', path, '-af',
                          'silencedetect=n=-38dB:d=0.4', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    start = re.search(r'silence_start: (-?[\d.]+)', err)
    end = re.search(r'silence_end: ([\d.]+)', err)
    if start and end and float(start.group(1)) < 0.3:
        return float(end.group(1))
    return 0.0


def read_existing():
    if not os.path.exists(JS):
        return {}
    m = re.search(r'window\.READER_AUDIO\s*=\s*(\{.*\});', open(JS, encoding='utf-8').read(), re.S)
    return json.loads(m.group(1)) if m else {}


def main(zpath):
    entries = read_existing()
    with zipfile.ZipFile(zpath) as z, tempfile.TemporaryDirectory() as tmp:
        meta = json.loads(z.read('recordings.json'))
        for key, m in sorted(meta.items()):
            if not KEY.match(key):
                print(f'skip {key}: not a reading key')
                continue
            name = os.path.basename(m['file'])
            src = os.path.join(tmp, name)
            with open(src, 'wb') as f:
                f.write(z.read(m['file']))
            cues = [round(float(c), 2) for c in m['cues']]
            # Keep a short lead-in, and never cut into the second sentence.
            trim = max(0.0, lead_silence(src) - 0.3)
            if len(cues) > 1:
                trim = min(trim, max(0.0, cues[1] - 0.5))
            trim = round(trim, 2)
            cues = [0.0] + [round(max(0.0, c - trim), 2) for c in cues[1:]]
            out = os.path.join(AUDIO, key + '.mp3')
            subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', str(trim), '-i', src,
                            '-af', 'highpass=f=70,loudnorm=I=-18:TP=-1.5:LRA=11',
                            '-ac', '1', '-ar', '44100', '-b:a', '64k', out], check=True)
            ver = hashlib.sha1(open(out, 'rb').read()).hexdigest()[:8]
            if len(cues) != m['n']:
                print(f'warn {key}: {len(cues)} cues for {m["n"]} sentences')
            entries[key] = {'src': f'audio/{key}.mp3?v={ver}', 'cues': cues, 'n': m['n']}
            print(f'{key}: {m["n"]} sentences, {m.get("seconds", "?")}s, trimmed {trim}s of lead-in')
    with open(JS, 'w', encoding='utf-8') as f:
        f.write(HEADER)
        f.write('window.READER_AUDIO = ')
        f.write(json.dumps(dict(sorted(entries.items())), indent=1, ensure_ascii=False))
        f.write(';\n')
    print(f'{len(entries)} readings in audio/recordings.js')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
