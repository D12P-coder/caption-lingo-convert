
interface Caption {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}

// Parse SRT file content
export const parseSRT = (content: string): Caption[] => {
  const captions: Caption[] = [];
  const blocks = content.trim().split(/\r?\n\r?\n/);

  blocks.forEach((block) => {
    const lines = block.split(/\r?\n/);
    if (lines.length >= 3) {
      const id = parseInt(lines[0].trim());
      const timeParts = lines[1].split(' --> ');
      
      if (timeParts.length === 2) {
        const startTime = timeParts[0].trim();
        const endTime = timeParts[1].trim();
        const text = lines.slice(2).join('\n');

        captions.push({
          id,
          startTime,
          endTime,
          text,
        });
      }
    }
  });

  return captions;
};

// Parse VTT file content
export const parseVTT = (content: string): Caption[] => {
  const captions: Caption[] = [];
  // Remove WEBVTT header if present
  const vttContent = content.replace(/^WEBVTT\r?\n/, '');
  const blocks = vttContent.trim().split(/\r?\n\r?\n/);
  
  let idCounter = 1;
  
  blocks.forEach((block) => {
    const lines = block.split(/\r?\n/);
    if (lines.length >= 2) {
      // Check if the first line is a timecode
      const timecodeLineIndex = lines.findIndex(line => line.includes(' --> '));
      
      if (timecodeLineIndex !== -1) {
        const timeParts = lines[timecodeLineIndex].split(' --> ');
        if (timeParts.length === 2) {
          const startTime = timeParts[0].trim();
          const endTime = timeParts[1].trim().split(' ')[0]; // Handle additional settings
          const text = lines.slice(timecodeLineIndex + 1).join('\n');

          captions.push({
            id: idCounter++,
            startTime,
            endTime,
            text,
          });
        }
      }
    }
  });

  return captions;
};

// Detect file type and parse accordingly
export const parseCaption = (content: string, fileName: string): Caption[] => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  if (extension === 'srt') {
    return parseSRT(content);
  } else if (extension === 'vtt') {
    return parseVTT(content);
  }
  
  return [];
};

// Format captions back to SRT
export const formatToSRT = (captions: Caption[]): string => {
  return captions.map((caption) => {
    return `${caption.id}\n${caption.startTime} --> ${caption.endTime}\n${caption.text}\n`;
  }).join('\n');
};

// Format captions back to VTT
export const formatToVTT = (captions: Caption[]): string => {
  const header = 'WEBVTT\n\n';
  const formattedCaptions = captions.map((caption) => {
    return `${caption.startTime} --> ${caption.endTime}\n${caption.text}`;
  }).join('\n\n');
  
  return header + formattedCaptions;
};
