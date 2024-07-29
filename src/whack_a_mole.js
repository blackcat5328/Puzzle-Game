// puzzle-game.js

// Function to divide the image into 9 parts
function divideImage(imageElement) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;
  ctx.drawImage(imageElement, 0, 0);

  const parts = [];
  const partWidth = canvas.width / 3;
  const partHeight = canvas.height / 3;

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const partCanvas = document.createElement('canvas');
      partCanvas.width = partWidth;
      partCanvas.height = partHeight;
      partCanvas.getContext('2d').drawImage(
        canvas,
        x * partWidth, y * partHeight,
        partWidth, partHeight,
        0, 0,
        partWidth, partHeight
      );
      parts.push(partCanvas);
    }
  }

  return parts;
}

// Function to shuffle the image parts
function shuffleParts(parts) {
  for (let i = parts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [parts[i], parts[j]] = [parts[j], parts[i]];
  }
  return parts;
}

// Function to combine the shuffled parts back into the original image
function combineParts(parts) {
  const canvas = document.createElement('canvas');
  canvas.width = parts[0].width * 3;
  canvas.height = parts[0].height * 3;
  const ctx = canvas.getContext('2d');

  let partIndex = 0;
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      ctx.drawImage(parts[partIndex], x * parts[0].width, y * parts[0].height);
      partIndex++;
    }
  }

  return canvas.toDataURL();
}

// Example usage
const imageElement = document.getElementById('puzzle-image');
const parts = divideImage(imageElement);
const shuffledParts = shuffleParts(parts);
const combinedImageData = combineParts(shuffledParts);

// Display the combined image
const combinedImageElement = new Image();
combinedImageElement.src = combinedImageData;
document.body.appendChild(combinedImageElement);
