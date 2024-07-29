window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = ({ assetsUrl }) => {
    const [score, setScore] = useState(0);
    const [tiles, setTiles] = useState([]);
    const [blankTileIndex, setBlankTileIndex] = useState(null);

    useEffect(() => {
      // Load the image and divide it into 9 tiles
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Add this line
      img.src = `${assetsUrl}/random-photo.jpg`;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const tileSize = img.width / 3;
        const tiles = [];
        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 3; x++) {
            const canvas2 = document.createElement('canvas');
            canvas2.width = tileSize;
            canvas2.height = tileSize;
            const ctx2 = canvas2.getContext('2d');
            ctx2.drawImage(canvas, x * tileSize, y * tileSize, tileSize, tileSize, 0, 0, tileSize, tileSize);
            tiles.push(canvas2.toDataURL('image/jpeg'));
          }
        }

        // Shuffle the tiles and find the blank tile index
        const shuffledTiles = tiles.slice();
        shuffledTiles.sort(() => Math.random() - 0.5);
        const blankTileIndex = shuffledTiles.indexOf(tiles[tiles.length - 1]);
        setTiles(shuffledTiles);
        setBlankTileIndex(blankTileIndex);
      };
    }, [assetsUrl]);

    const moveTile = (index) => {
      // ... (unchanged)
    };

    return React.createElement(
      'div',
      { className: "puzzle-game" },
      // ... (unchanged)
    );
  };

  return () => React.createElement(PuzzleGame, { assetsUrl: assetsUrl });
};

console.log('Puzzle Game script loaded');
