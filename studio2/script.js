
    let currentIndex = 0; // Track current candle index

    // Array of candle image sources and descriptions
    const candles = [
      { src: 'images/chocolate-croissant-Background-Removed.png', description: 'Lavender Bliss' },
      { src: 'images/ladybird-Background-Removed.png', description: 'Vanilla Dream' },
      { src: 'images/pink-lavender-espresso-Background-Removed.png', description: 'Rose Garden' },
      { src: 'images/vanilla-chai-Background-Removed.png', description: 'Chai' }
    ];

    function showCandle(index) {
        const zoomedIn = document.getElementById('zoomedIn');
        const zoomedImage = document.getElementById('zoomedImage');
        const overlay = document.getElementById('overlay');

        // Set the image and description for the zoomed-in view
        zoomedImage.src = candles[index].src;
        overlay.innerText = candles[index].description;

        // Show the zoomed-in section
        zoomedIn.style.display = 'block';

        // Set the current index based on the clicked candle
        currentIndex = index;
    }

    // Handle scrolling to change the image and text
    let lastScrollY = window.scrollY; // Track last scroll position

    document.addEventListener('scroll', function() {
      const zoomedIn = document.getElementById('zoomedIn');

      if (zoomedIn.style.display === 'block') {
          let currentScrollY = window.scrollY;

          // Only trigger on significant scroll down
          if (currentScrollY > lastScrollY + 50) { 
              currentIndex = (currentIndex + 1) % candles.length;

              const nextCandle = candles[currentIndex];

              // Update the image and description
              document.getElementById('zoomedImage').src = nextCandle.src;
              document.getElementById('overlay').innerText = nextCandle.description;

              // Update last scroll position
              lastScrollY = currentScrollY;
          }
      }
  });

