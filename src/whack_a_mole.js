// puzzle-game.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = ({ assetsUrl }) => {
  const [score, setScore] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [emptyTileIndex, setEmptyTileIndex] = useState(8);
  const [currentPhotoSet, setCurrentPhotoSet] = useState(0); // Add this line
  const [showPhotoSetSelector, setShowPhotoSetSelector] = useState(false); // Add this line

  useEffect(() => {
    // Initialize the puzzle tiles using the currentPhotoSet
    const tiles = Array(9).fill().map((_, index) => ({
      image: `${assetsUrl}/random-photo-${index + 1 + (currentPhotoSet * 9)}.jpg`,
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
  }, [currentPhotoSet]); // Update this line to include currentPhotoSet

  const swapTiles = (index) => {
    // Existing swapTiles logic

    // Check if the puzzle is solved
    if (newTiles.every((tile, i) => tile.index === i)) {
      setScore(score + 1);
      setShowPhotoSetSelector(true); // Set showPhotoSetSelector to true when the puzzle is solved
    }
  };

  const selectPhotoSet = (photoSet) => {
    setCurrentPhotoSet(photoSet);
    setShowPhotoSetSelector(false);
  };

  return React.createElement(
    'div',
    { className: "puzzle-game" },
    React.createElement('h2', null, "Puzzle Game"),
    React.createElement('p', null, `Score: ${score}`),
    showPhotoSetSelector && React.createElement( // Render the photo set selector if showPhotoSetSelector is true
      'div',
      { className: "photo-set-selector" },
      React.createElement('h3', null, "Select a photo set:"),
      React.createElement(
        'button',
        { onClick: () => selectPhotoSet(0) },
        "Photo Set 1"
      ),
      React.createElement(
        'button',
        { onClick: () => selectPhotoSet(1) },
        "Photo Set 2"
      ),
      React.createElement(
        'button',
        { onClick: () => selectPhotoSet(2) },
        "Photo Set 3"
      )
    ),
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
