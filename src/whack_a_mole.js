window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = () => {
    const [puzzleGrid, setPuzzleGrid] = useState([]);
    const [activePiece, setActivePiece] = useState(null);
    const [solvedPieces, setSolvedPieces] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [score, setScore] = useState(0); // Add score state

    // Function to initialize the puzzle grid
    const initializePuzzle = () => {
      // ... (existing code)
    };

    // Function to shuffle the puzzle pieces
    const shufflePuzzle = () => {
      // ... (existing code)
    };

    // Function to handle piece click
    const handlePieceClick = (piece) => {
      if (activePiece === null) {
        setActivePiece(piece);
      } else if (
        activePiece.position.row === piece.position.row &&
        activePiece.position.col === piece.position.col
      ) {
        setActivePiece(null);
        setSolvedPieces((prevSolved) => prevSolved + 1);
        setScore((prevScore) => prevScore + 1); // Update the score
      } else {
        setActivePiece(null);
      }
    };

    useEffect(() => {
      initializePuzzle();
    }, []);

    return React.createElement(
      'div',
      { className: 'puzzle-container' },
      React.createElement(
        'div',
        { className: 'puzzle-grid' },
        // ... (existing code)
      ),
      React.createElement(
        'button',
        {
          className: 'shuffle-button',
          onClick: shufflePuzzle,
          disabled: solvedPieces === puzzleGrid.length,
        },
        'Shuffle Puzzle'
      ),
      React.createElement(
        'div',
        { className: 'score-display' },
        `Score: ${score}`
      ), // Add score display
      solvedPieces === puzzleGrid.length &&
        React.createElement(
          'div',
          { className: 'puzzle-solved' },
          'Congratulations! You have solved the puzzle.'
        )
    );
  };

  return PuzzleGame;
};
