// This would be stored in the 'src' folder of the GitHub repository
// puzzle-game.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = ({ assetsUrl }) => {
    const [score, setScore] = useState(0);
    const [tiles, setTiles] = useState([]);
    const [blankTileIndex, setBlankTileIndex] = useState(null);

    useEffect(() => {
      // Load the image and divide it into 9 tiles
      const img = new Image();
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
            ctx2.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize, 0, 0, tileSize, tileSize);
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
      if (
        (index === blankTileIndex - 1 && index % 3 !== 2) ||
        (index === blankTileIndex + 1 && index % 3 !== 0) ||
        index === blankTileIndex - 3 ||
        index === blankTileIndex + 3
      ) {
        const newTiles = [...tiles];
        [newTiles[index], newTiles[blankTileIndex]] = [newTiles[blankTileIndex], newTiles[index]];
        setTiles(newTiles);
        setBlankTileIndex(index);
        setScore(score + 1);
      }
    };

    return React.createElement(
      'div',
      { className: "puzzle-game" },
      React.createElement('h2', null, "Puzzle Game"),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement(
        'div',
        { className: "game-board" },
        tiles.map((tile, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: `tile ${index === blankTileIndex ? 'blank' : ''}`,
              onClick: () => moveTile(index)
            },
            index === blankTileIndex ? null : React.createElement('img', { src: tile, alt: `Tile ${index}` })
          )
        )
      )
    );
  };

  return () => React.createElement(PuzzleGame, { assetsUrl: assetsUrl });
};

console.log('Puzzle Game script loaded');
