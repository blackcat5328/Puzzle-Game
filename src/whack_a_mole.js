window.initPhotoPuzzle = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PhotoPuzzle = ({ assetsUrl }) => {
    const [puzzlePieces, setPuzzlePieces] = useState([]);
    const [shuffledPuzzlePieces, setShuffledPuzzlePieces] = useState([]);
    const [repeatedPieceIndex, setRepeatedPieceIndex] = useState(-1);
    const [score, setScore] = useState(0);

    useEffect(() => {
      // Load the image
      const image = new Image();
      image.src = `${assetsUrl}/random-photo.jpg`;
      image.onload = () => {
        // Divide the image into 9 parts
        const pieces = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const canvas = document.createElement('canvas');
            canvas.width = image.width / 3;
            canvas.height = image.height / 3;
            const context = canvas.getContext('2d');
            context.drawImage(
              image,
              j * image.width / 3,
              i * image.height / 3,
              image.width / 3,
              image.height / 3,
              0,
              0,
              canvas.width,
              canvas.height
            );
            pieces.push(canvas.toDataURL());
          }
        }
        setPuzzlePieces(pieces);
        shufflePuzzle();
      };
    }, [assetsUrl]);

    const shufflePuzzle = () => {
      const shuffledPieces = [...puzzlePieces];
      shuffledPieces.sort(() => Math.random() - 0.5);

      // Choose a random piece to repeat
      const repeatedIndex = Math.floor(Math.random() * 9);
      shuffledPieces[repeatedIndex] = shuffledPieces[Math.floor(Math.random() * 8)];

      setShuffledPuzzlePieces(shuffledPieces);
      setRepeatedPieceIndex(repeatedIndex);
    };

    const handlePieceClick = (index) => {
      if (index === repeatedPieceIndex) {
        setScore(score + 1);
        shufflePuzzle();
      }
    };

    return React.createElement(
      'div',
      { className: 'photo-puzzle' },
      React.createElement('h2', null, 'Photo Puzzle'),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement(
        'div',
        { className: 'puzzle-container' },
        shuffledPuzzlePieces.map((piece, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: 'puzzle-piece',
              style: { backgroundImage: `url(${piece})` },
              onClick: () => handlePieceClick(index)
            }
          )
        )
      ),
      React.createElement(
        'button',
        { onClick: shufflePuzzle },
        'Shuffle'
      )
    );
  };

  return () => React.createElement(PhotoPuzzle, { assetsUrl: assetsUrl });
};

console.log('Photo Puzzle game script loaded');
