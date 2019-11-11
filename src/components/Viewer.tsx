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
      load: '3crn',
      settings: {
        ao: true,
        fog: true,
        axes: false,
        fxaa: true,
        resolution: 'high',
      },
      reps: [
        {
          selector: 'not hetatm',
          mode: 'CA',
          colorer: 'SS',
          material: 'FL',
        },
        {
          selector: 'hetatm and not water',
          mode: 'BS',
          colorer: 'EL',
          material: 'SF',
        },
      ],
    });

    if (viewer.init()) {
      viewer.enableHotKeys(false);
      viewer.run();
    }

    viewer.set('outline.on', true);
    viewer.set('outline.threshold', 0.1);

    setViewer(viewer);

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      window.Miew = viewer;
    }
  }, [setViewer]);

  return <div id="miew-container" ref={viewContainer} />;
};

export default Viewer;
