import React, { useContext } from 'react';

import { MiewContext } from './App';

const Download = () => {
  const { viewer } = useContext(MiewContext);

  const handleClick = () => {
    const image = viewer.screenshot(1920, 1080);

    // Open export in a new tab
    if (typeof InstallTrigger !== 'undefined') {
      // Firefox
      window.open(image);
    } else {
      // Other browsers
      const openImg = new Image();
      openImg.src = image;
      const w = window.open('');
      w.document.write(openImg.outerHTML);
      w.document.close();
    }
  };

  return (
    <section>
      <h2>Download</h2>
      <button type="button" onClick={handleClick}>Save as PNG</button>
    </section>
  );
};

export default Download;
