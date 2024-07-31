// puzzle-game.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = ({ assetsUrl }) => {
    const [score, setScore] = useState(0);
    const [tiles, setTiles] = useState([]);
    const [emptyTileIndex, setEmptyTileIndex] = useState(8);
    const [time, setTime] = useState(0); // Add time state

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

      // Start the game timer
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }, [assetsUrl]);

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

    return (
      <div className="puzzle-game">
        <h2>Puzzle Game</h2>
        <p>Score: {score}</p>
        <p>Time: {time} seconds</p> {/* Display the game time */}
        <div className="game-board">
          {tiles.map((tile, index) =>
            <div
              key={index}
              className={`tile ${index === emptyTileIndex ? 'empty' : ''}`}
              onClick={() => swapTiles(index)}
            >
              {index !== emptyTileIndex && <img src={tile.image} alt={`Tile ${index}`} />}
            </div>
          )}
        </div>
      </div>
    );
  };

  return () => React.createElement(PuzzleGame, { assetsUrl: assetsUrl });
};

console.log('Puzzle Game script loaded');
