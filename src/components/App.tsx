import React, { useState } from 'react';
import Miew from 'miew';

import Debug from './Debug';
import Download from './Download';
import Palette from './Palette';
import Representation from './Representation';
import SaveLoad from './SaveLoad';
import Search from './Search';
import Terminal from './Terminal';
import Viewer from './Viewer';

import '../styles.scss';

interface MiewContextValue {
  viewer: Miew | null;
  setViewer: any | null;
}

export const MiewContext = React.createContext<MiewContextValue>({
  viewer: null,
  setViewer: null,
});

const App = () => {
  const [viewer, setViewer] = useState<Miew>(null);

  return (
    <MiewContext.Provider value={{ viewer, setViewer }}>
      <main>
        <div className="column">
          <Viewer />
          <Terminal />
        </div>
        <div className="column" id="sidebar">
          <Search />
          <Representation />
          <Palette />
          <Download />
          <SaveLoad />
          <Debug />
        </div>
      </main>
    </MiewContext.Provider>
  );
};

export default App;
