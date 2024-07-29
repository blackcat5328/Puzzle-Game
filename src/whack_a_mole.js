// This would be stored in the 'src' folder of the GitHub repository
// puzzle-game.js
window.initPuzzleGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = ({ assetsUrl }) => {
    const [score, setScore] = useState(0);
    const [puzzlePieces, setPuzzlePieces] = useState([]);
    const [emptySlot, setEmptySlot] = useState(null);

    useEffect(() => {
      // Initialize the puzzle pieces
      const pieces = Array(9)
        .fill()
        .map((_, index) => index);
      pieces.push(pieces.splice(Math.floor(Math.random() * 8), 1)[0]);
      setPuzzlePieces(pieces);
      setEmptySlot(8);
    }, []);

    const shufflePuzzle = () => {
      const newPieces = [...puzzlePieces];
      for (let i = newPieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newPieces[i], newPieces[j]] = [newPieces[j], newPieces[i]];
      }
      setPuzzlePieces(newPieces);
      setEmptySlot(newPieces.indexOf(8));
    };

    const movePiece = (index) => {
      if (
        (index === emptySlot - 3 && emptySlot % 3 !== 0) ||
        (index === emptySlot + 3 && emptySlot % 3 !== 2) ||
        index === emptySlot - 1 ||
        index === emptySlot + 1
      ) {
        const newPieces = [...puzzlePieces];
        [newPieces[index], newPieces[emptySlot]] = [
          newPieces[emptySlot],
          newPieces[index],
        ];
        setPuzzlePieces(newPieces);
        setEmptySlot(index);
        setScore(score + 1);
      }
    };

    const isGameWon = () => {
      for (let i = 0; i < puzzlePieces.length - 1; i++) {
        if (puzzlePieces[i] !== i) {
          return false;
        }
      }
      return true;
    };

    return React.createElement(
      'div',
      { className: 'puzzle-game' },
      React.createElement('h2', null, 'Puzzle Game'),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement(
        'div',
        { className: 'puzzle-board' },
        puzzlePieces.map((piece, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: `puzzle-piece ${
                piece === 8 ? 'empty' : ''
              } ${piece === piece ? 'duplicate' : ''}`,
              onClick: () => movePiece(index),
            },
            piece !== 8 &&
              React.createElement('img', {
                src: `${assetsUrl}/random-photo.jpg`,
                alt: `Piece ${piece}`,
                style: {
                  objectPosition: `-${(piece % 3) * 33.33}% -${Math.floor(
                    piece / 3
                  ) * 33.33}%`,
                },
              })
          )
        )
      ),
      React.createElement(
        'button',
        { onClick: shufflePuzzle },
        'Shuffle Puzzle'
      ),
      isGameWon() &&
        React.createElement('div', { className: 'game-won' }, 'You won!')
    );
  };

  return () => React.createElement(PuzzleGame, { assetsUrl: assetsUrl });
};

console.log('Puzzle Game script loaded');
