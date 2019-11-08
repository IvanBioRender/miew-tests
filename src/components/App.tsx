import React, { useState } from 'react';
import Miew from 'miew';

import Viewer from './Viewer';
import Search from './Search';

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
        </div>
        <div className="column">
          <Search />
        </div>
      </main>
    </MiewContext.Provider>
  );
};

export default App;
