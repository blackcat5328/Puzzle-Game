window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = () => {
    const [puzzleGrid, setPuzzleGrid] = useState([]);
    const [activePiece, setActivePiece] = useState(null);
    const [solvedPieces, setSolvedPieces] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);

    // Function to initialize the puzzle grid
    const initializePuzzle = () => {
      const puzzleImage = new Image();
      puzzleImage.src = `${assetsUrl}/puzzle-image.jpg`; // Replace with your puzzle image URL
      puzzleImage.onload = () => {
        const width = puzzleImage.width / 3;
        const height = puzzleImage.height / 3;
        const grid = [];
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            grid.push({
              id: `piece-${row * 3 + col}`,
              left: col * width,
              top: row * height,
              width,
              height,
              position: { row, col },
            });
          }
        }
        // Add an extra piece to the grid, making one piece repeat
        grid.push(grid[Math.floor(Math.random() * 8)]);
        setPuzzleGrid(grid);
      };
    };

    // Function to shuffle the puzzle pieces
    const shufflePuzzle = () => {
      const shuffledGrid = [...puzzleGrid].sort(() => Math.random() - 0.5);
      setPuzzleGrid(shuffledGrid);
      setIsShuffled(true);
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
        puzzleGrid.map((piece) =>
          React.createElement(
            'div',
            {
              key: piece.id,
              className: `puzzle-piece ${activePiece === piece ? 'active' : ''} ${
                solvedPieces === puzzleGrid.length ? 'solved' : ''
              }`,
              style: {
                left: piece.left,
                top: piece.top,
                width: piece.width,
                height: piece.height,
                backgroundImage: `url(${assetsUrl}/puzzle-image.jpg)`,
                backgroundPosition: `-${piece.left}px -${piece.top}px`,
              },
              onClick: () => handlePieceClick(piece),
            },
            null
          )
        )
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
