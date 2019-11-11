import React, { useState } from 'react';
import Miew from 'miew';

import Debug from './Debug';
import Download from './Download';
import Search from './Search';
import Terminal from './Terminal';
import Viewer from './Viewer';

import '../styles.scss';

type MiewContextValue = {
  viewer: Miew | null;
  setViewer: any | null;
}

const MIEW_CONTEXT_DEFAULT: MiewContextValue = {
  viewer: null,
  setViewer: null,
};

export const MiewContext = React.createContext(MIEW_CONTEXT_DEFAULT);

const App = () => {
  const [viewer, setViewer] = useState(null);

  return (
    <MiewContext.Provider value={{ viewer, setViewer }}>
      <main>
        <div className="column">
          <Viewer />
          <Terminal />
        </div>
        <div className="column">
          <Search />
          <Download />
          <Debug />
        </div>
      </main>
    </MiewContext.Provider>
  );
};

export default App;
