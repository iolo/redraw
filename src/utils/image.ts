export const loadImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
        return;
      }
      reject(new Error('Unable to load image file.'));
    };
    reader.onerror = () => reject(reader.error ?? new Error('Unable to load image file.'));
    reader.readAsDataURL(file);
  });

export const saveImage = (dataUrl: string, filename = 'drawing.png') => {
  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = filename;
  anchor.click();
};
