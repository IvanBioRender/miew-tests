import React, { useContext } from 'react';

import { MiewContext } from './App';

const Download = () => {
  const { viewer } = useContext(MiewContext);

  const handleClick = () => {
    const image = viewer.screenshot();
    window.open(image);
  };

  const handleClickTrans = () => {
    const WIDTH = 1920;
    const HEIGHT = 1080;

    // Miew screenshot
    const screenshot = viewer.screenshot(WIDTH, HEIGHT);

    // Make background transparent by removing current background colour
    const BACK_COL = {
      r: 32,
      g: 32,
      b: 32,
    };

    // Create canvas for image manipulation
    const canvas = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // Smoothen image
    ctx.imageSmoothingEnabled = true;
    if (typeof ctx.imageSmoothingQuality !== 'undefined') {
      ctx.imageSmoothingQuality = 'high';
    }

    // Create image to load screenshot into canvas
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Grab raw image data
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Loop through each pixel
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Check if it matches the background colour
        if (r === BACK_COL.r && g === BACK_COL.g && b === BACK_COL.b) {
          // Set alpha to transparent
          data[i + 3] = 0;
        }
      }

      // Convert it back into a data URL
      const iData = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < iData.data.length; i += 1) iData.data[i] = data[i];
      ctx.putImageData(iData, 0, 0);

      // Open export in a new tab
      if (typeof InstallTrigger !== 'undefined') {
        // Firefox
        window.open(canvas.toDataURL());
      } else {
        // Other browsers
        const openImg = new Image();
        openImg.src = canvas.toDataURL();
        const w = window.open('');
        w.document.write(openImg.outerHTML);
        w.document.close();
      }
    };
    // Load screenshot
    img.src = screenshot;
  };

  return (
    <section>
      <h2>Download</h2>
      <button type="button" onClick={handleClick}>Download</button>
      <br />
      <br />
      <button type="button" onClick={handleClickTrans}>Download (Transparent)</button>
    </section>
  );
};

export default Download;
