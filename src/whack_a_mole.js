window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = () => {
    const [puzzleGrid, setPuzzleGrid] = useState([]);
    const [activePiece, setActivePiece] = useState(null);
    const [solvedPieces, setSolvedPieces] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [score, setScore] = useState(0);
    const [randomPhoto, setRandomPhoto] = useState(null);

    // Function to initialize the puzzle grid
    const initializePuzzle = () => {
      // ... (existing code)
      fetchRandomPhoto();
    };

    // Function to fetch a random photo from Unsplash
    const fetchRandomPhoto = async () => {
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
        setScore((prevScore) => prevScore + 1);
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
      randomPhoto &&
        React.createElement(
          'div',
          { className: 'random-photo' },
          React.createElement('img', { src: randomPhoto, alt: 'Random Photo' })
        ),
      React.createElement(
        'div',
        { className: 'puzzle-grid' },
        puzzleGrid.map((row, rowIndex) =>
          React.createElement(
            'div',
            { className: 'puzzle-row', key: `row-${rowIndex}` },
            row.map((piece, colIndex) =>
              React.createElement(
                'div',
                {
                  className: `puzzle-piece ${
                    activePiece?.position.row === piece.position.row &&
                    activePiece?.position.col === piece.position.col
                      ? 'active'
                      : ''
                  }`,
                  key: `piece-${rowIndex}-${colIndex}`,
                  onClick: () => handlePieceClick(piece),
                },
                piece.value
              )
            )
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
      React.createElement(
        'div',
        { className: 'score-display' },
        `Score: ${score}`
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
