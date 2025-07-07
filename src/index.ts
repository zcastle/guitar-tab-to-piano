// guitar-tab-to-piano/src/index.ts

export function convertTabToNotes(tabText: string) {
  const tuning: Record<string, number> = {
    'E': 40, 'A': 45, 'D': 50, 'G': 55, 'B': 59, 'e': 64
  };

  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F',
                     'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const stringGroups = {
    upper: ['e', 'B', 'G'],
    lower: ['D', 'A', 'E']
  };

  const lines = tabText.trim().split('\n');
  const tabByString: Record<string, string[]> = {};

  for (const line of lines) {
    const match = line.match(/^([eBGDAE])\|?(.*)$/);
    if (match) {
      const string = match[1];
      const content = match[2];
      tabByString[string] = content.split('|').map(s => s.trim());
    }
  }

  const numBlocks = Math.max(...Object.values(tabByString).map(arr => arr.length));
  const upperLine: string[] = [];
  const lowerLine: string[] = [];

  for (let b = 0; b < numBlocks; b++) {
    const blockMatrix: Record<string, string[]> = {};
    let hasNotes = false;

    [...stringGroups.upper, ...stringGroups.lower].forEach(str => {
      const block = tabByString[str]?.[b] ?? '';
      const clean = block.padEnd(block.length || 1, '-');
      blockMatrix[str] = clean.split('');
      if (/\d/.test(block)) hasNotes = true;
    });

    if (!hasNotes) continue;

    const maxLen = Math.max(...Object.values(blockMatrix).map(arr => arr.length));
    const upperChunk: string[] = [];
    const lowerChunk: string[] = [];

    for (let i = 0; i < maxLen; i++) {
      const notes = { upper: [], lower: [] } as Record<string, { string: string, note: string }[]>;
      const rawUpper: string[] = [];

      for (const group of ['upper', 'lower'] as const) {
        for (const string of stringGroups[group]) {
          const chars = blockMatrix[string];
          const c1 = chars[i] || '-';
          const c2 = chars[i + 1] || '-';

          let note: string | null = null;

          if (/x/i.test(c1)) {
            note = null;
          } else if (/\d/.test(c1) && /\d/.test(c2)) {
            const fret = parseInt(c1 + c2, 10);
            i++;
            const midi = tuning[string] + fret;
            note = noteNames[midi % 12];
          } else if (/\d/.test(c1)) {
            const fret = parseInt(c1, 10);
            const midi = tuning[string] + fret;
            note = noteNames[midi % 12];
          }

          if (note) {
            notes[group].push({ string, note });
            if (group === 'upper') rawUpper.push(note);
          }
        }
      }

      let upperStr = '', lowerStr = '';
      if (rawUpper.length >= 3) {
        upperStr = `(${rawUpper.join('-')})`;
        lowerStr = notes.lower.length > 0
          ? `(${notes.lower.map(n => n.note).join('-')})`
          : '';
      } else {
        upperStr = [...rawUpper, ...notes.lower.map(n => n.note)].join('-');
        lowerStr = '';
      }

      const width = Math.max(upperStr.length, lowerStr.length);
      const pad = (text: string) => {
        const total = width - text.length;
        const left = Math.floor(total / 2);
        const right = total - left;
        return ' '.repeat(left) + text + ' '.repeat(right);
      };

      upperChunk.push(pad(upperStr));
      lowerChunk.push(pad(lowerStr));
    }

    upperLine.push(upperChunk.join('-'));
    lowerLine.push(lowerChunk.join('-'));
  }

  return {
    original: tabText.trim(),
    upper: upperLine.join('-'),
    lower: lowerLine.join('-')
  };
}
