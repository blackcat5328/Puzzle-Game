window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = () => {
    const [puzzleGrid, setPuzzleGrid] = useState([]);
    const [activePiece, setActivePiece] = useState(null);
    const [solvedPieces, setSolvedPieces] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [score, setScore] = useState(0);
    const [randomPhoto, setRandomPhoto] = useState(null); // Add state for random photo

    // Function to initialize the puzzle grid
    const initializePuzzle = () => {
      // ... (existing code)
      fetchRandomPhoto(); // Fetch a random photo
    };

    // Function to fetch a random photo from Unsplash
    const fetchRandomPhoto = async () => {
      try {
        const response = await fetch('https://api.unsplash.com/photos/random?client_id=YOUR_UNSPLASH_API_KEY');
        const data = await response.json();
        setRandomPhoto(data.urls.regular); // Update the state with the random photo URL
      } catch (error) {
        console.error('Error fetching random photo:', error);
      }
    };

    // Function to shuffle the puzzle pieces
    const shufflePuzzle = () => {
      // ... (existing code)
    };

    // Function to handle piece click
    const handlePieceClick = (piece) => {
      // ... (existing code)
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
        ), // Render the random photo
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
