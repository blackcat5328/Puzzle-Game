// puzzle-game.js
window.initGame = (React, assetUrl) => {
const { useState, useEffect } = React;

const PuzzleGame = ({ assetUrl }) => {
const [score, setScore] = useState(0);
const [tiles, setTiles] = useState([]);
const [emptyTileIndex, setEmptyTileIndex] = useState(8);

useEffect(() => {
  // Initialize the puzzle tiles
  const tiles = Array(9).fill().map((_, index) => ({
    image: `${assetsUrl}/random-photo-${index + 1}.jpg`,
    index
  }));

  // Randomly swap the tiles
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  // Find the empty tile index
  const emptyTileIndex = tiles.findIndex((tile) => tile.index === 8);
  setTiles(tiles);
  setEmptyTileIndex(emptyTileIndex);
}, []);

const swapTiles = (index) => {
  if (Math.abs(index - emptyTileIndex) === 3 || Math.abs(index - emptyTileIndex) === 1) {
    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyTileIndex]] = [newTiles[emptyTileIndex], newTiles[index]];
    setTiles(newTiles);
    setEmptyTileIndex(index);

    // Check if the puzzle is solved
    if (newTiles.every((tile, i) => tile.index === i)) {
      setScore(score + 1);

      // Randomly swap the tiles again
      for (let i = newTiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
      }

      const newEmptyTileIndex = newTiles.findIndex((tile) => tile.index === 8);
      setTiles(newTiles);
      setEmptyTileIndex(newEmptyTileIndex);
    }
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
          className: `tile ${index === emptyTileIndex ? 'empty' : ''}`,
          onClick: () => swapTiles(index)
        },
        index !== emptyTileIndex && React.createElement('img', { src: tile.image, alt: `Tile ${index}` })
      )
    )
  )
);

};

return () => React.createElement(PuzzleGame, { assetsUrl: assetsUrl });
};

console.log('Puzzle Game script loaded');
