import React, { useState, useEffect } from 'react';

const PuzzleGame = ({ assetsUrl }) => {
  const [puzzleGrid, setPuzzleGrid] = useState([]);
  const [activePiece, setActivePiece] = useState(null);
  const [solvedPieces, setSolvedPieces] = useState(0);

  // Function to initialize the puzzle grid
  const initializePuzzle = () => {
    const puzzleImage = new Image();
    puzzleImage.src = `${assetsUrl}/puzzle-image.jpg`;
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
      setPuzzleGrid(grid);
    };
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

  return (
    <div className="puzzle-container">
      {puzzleGrid.map((piece) => (
        <div
          key={piece.id}
          className={`puzzle-piece ${activePiece === piece ? 'active' : ''} ${
            solvedPieces === 9 ? 'solved' : ''
          }`}
          style={{
            left: piece.left,
            top: piece.top,
            width: piece.width,
            height: piece.height,
            backgroundImage: `url(${assetsUrl}/puzzle-image.jpg)`,
            backgroundPosition: `-${piece.left}px -${piece.top}px`,
          }}
          onClick={() => handlePieceClick(piece)}
        />
      ))}
      {solvedPieces === 9 && (
        <div className="puzzle-solved">Congratulations! You solved the puzzle.</div>
      )}
    </div>
  );
};

export default PuzzleGame;
