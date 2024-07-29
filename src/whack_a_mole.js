window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = () => {
    const [timer, setTimer] = useState(0);
    const [interval, setInterval] = useState(null);
    const [pieces, setPieces] = useState([]);
    const [activePiece, setActivePiece] = useState(null);
    const [correctPieces, setCorrectPieces] = useState(0);

    // Function to shuffle the puzzle pieces
    const shufflePieces = () => {
      return Array.from({ length: 16 }, (_, index) => ({
        id: index,
        backgroundImage: `url(${assetsUrl}/puzzle-piece-${index + 1}.jpg)`,
        row: Math.floor(index / 4),
        col: index % 4,
      })).sort(() => Math.random() - 0.5);
    };

    // Function to create the puzzle game
    const createPuzzleGame = () => {
      // Shuffle the puzzle pieces
      const shuffledPieces = shufflePieces();
      setPieces(shuffledPieces);

      // Start the timer
      const newInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setInterval(newInterval);
    };

    // Function to handle puzzle piece click
    const handlePieceClick = (piece) => {
      if (activePiece === null) {
        setActivePiece(piece);
      } else if (activePiece.row === piece.row && activePiece.col === piece.col) {
        setActivePiece(null);
        setCorrectPieces((prevCorrect) => prevCorrect + 1);

        if (correctPieces === 15) {
          clearInterval(interval);
          alert(`Congratulations! You solved the puzzle in ${timer} seconds.`);
        }
      } else {
        setActivePiece(null);
      }
    };

    useEffect(() => {
      createPuzzleGame();
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="puzzle-container">
        {pieces.map((piece) => (
          <div
            key={piece.id}
            className={`puzzle-piece ${activePiece === piece ? 'active' : ''} ${
              correctPieces === 16 ? 'correct' : ''
            }`}
            style={{
              backgroundImage: piece.backgroundImage,
              gridRow: piece.row + 1,
              gridColumn: piece.col + 1,
            }}
            onClick={() => handlePieceClick(piece)}
          />
        ))}
        <div id="timer">{timer}</div>
      </div>
    );
  };

  return PuzzleGame;
};
