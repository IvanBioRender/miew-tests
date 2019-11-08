import React, { useContext, useEffect, useRef } from 'react';
import Miew from 'miew';

import { MiewContext } from './App';

const Viewer = () => {
  const viewContainer = useRef(null);
  const { setViewer } = useContext(MiewContext);

  useEffect(() => {
    if (!setViewer) return;

    const viewer = new Miew({
      container: viewContainer.current,
      load: '1crn',
    });

    if (viewer.init()) {
      viewer.run();
      viewer.motm();
    }

    (setViewer as any)(viewer);
  }, [setViewer]);

  return <div id="miew-container" ref={viewContainer} />;
};

export default Viewer;
