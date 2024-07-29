// This would be stored in the 'src' folder of the GitHub repository
// puzzle-game.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = ({ assetsUrl }) => {
    const [score, setScore] = useState(0);
    const [activePiece, setActivePiece] = useState(null);
    const [puzzlePieces, setPuzzlePieces] = useState([]);
    const [shuffledPieces, setShuffledPieces] = useState([]);
    const [solvedPieces, setSolvedPieces] = useState(0);

    useEffect(() => {
      // Fetch and prepare the puzzle pieces
      const puzzlePieces = generatePuzzlePieces();
      setPuzzlePieces(puzzlePieces);
      shufflePuzzle(puzzlePieces);
    }, []);

    const generatePuzzlePieces = () => {
      // Fetch a random photo from Unsplash or use a predefined one
      const randomPhoto = `${assetsUrl}/random-photo.jpg`;

      // Divide the photo into 9 puzzle pieces
      const puzzlePieces = [];
      for (let i = 0; i < 9; i++) {
        puzzlePieces.push({
          index: i,
          image: randomPhoto,
          position: {
            row: Math.floor(i / 3),
            col: i % 3,
          },
        });
      }

      // Duplicate one of the puzzle pieces
      const duplicateIndex = Math.floor(Math.random() * 9);
      puzzlePieces.push({
        index: 9,
        image: randomPhoto,
        position: {
          row: Math.floor(duplicateIndex / 3),
          col: duplicateIndex % 3,
        },
      });

      return puzzlePieces;
    };

    const shufflePuzzle = (pieces) => {
      const shuffledPieces = [...pieces].sort(() => Math.random() - 0.5);
      setShuffledPieces(shuffledPieces);
    };

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

    return React.createElement(
      'div',
      { className: 'puzzle-game' },
      React.createElement('h2', null, 'Puzzle Game'),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement(
        'div',
        { className: 'game-board' },
        shuffledPieces.map((piece, index) =>
          React.createElement(
            'div',
            {
              key: `piece-${index}`,
              className: `puzzle-piece ${
                activePiece?.index === piece.index ? 'active' : ''
              }`,
              onClick: () => handlePieceClick(piece),
            },
            React.createElement('img', { src: piece.image, alt: `Puzzle Piece ${piece.index}` })
          )
        )
      ),
      React.createElement(
        'button',
        {
          className: 'shuffle-button',
          onClick: () => shufflePuzzle(puzzlePieces),
          disabled: solvedPieces === shuffledPieces.length,
        },
        'Shuffle Puzzle'
      ),
      solvedPieces === shuffledPieces.length &&
        React.createElement(
          'div',
          { className: 'puzzle-solved' },
          'Congratulations! You have solved the puzzle.'
        )
    );
  };

  return () => React.createElement(PuzzleGame, { assetsUrl: assetsUrl });
};

console.log('Puzzle Game script loaded');
