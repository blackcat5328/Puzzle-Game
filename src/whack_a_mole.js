window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const WhackAMole = ({ assetsUrl }) => {
    const [score, setScore] = useState(0);
    const [activeMole, setActiveMole] = useState(null);
    const [imageParts, setImageParts] = useState([]);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveMole(Math.floor(Math.random() * 9));
      }, 1000);

      // Load the image and divide it into 9 parts
      const img = new Image();
      img.src = `${assetsUrl}/source-image.jpg`;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const partWidth = img.width / 3;
        const partHeight = img.height / 3;

        const parts = [];
        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 3; x++) {
            const imageData = ctx.getImageData(x * partWidth, y * partHeight, partWidth, partHeight);
            parts.push(imageData);
          }
        }

        setImageParts(parts);
      };

      return () => clearInterval(interval);
    }, []);

    const whackMole = (index) => {
      if (index === activeMole) {
        setScore(score + 1);
        setActiveMole(null);
      }
    };

    return React.createElement(
      'div',
      { className: "whack-a-mole" },
      React.createElement('h2', null, "Whack-a-Mole"),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement(
        'div',
        { className: "game-board" },
        Array(9).fill().map((_, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: `mole ${index === activeMole ? 'active' : ''}`,
              onClick: () => whackMole(index)
            },
            index === activeMole && imageParts[index] && React.createElement('img', {
              src: `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(imageParts[index].data)))}`,
              alt: "Part of the image"
            })
          )
        )
      )
    );
  };

  return () => React.createElement(WhackAMole, { assetsUrl: assetsUrl });
};

console.log('Whack-a-Mole game script loaded');
