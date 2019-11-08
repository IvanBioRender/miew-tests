import React, { useContext, useState } from 'react';
import Miew, { Representation } from 'miew';

import { MiewContext } from './App';

const Debug = () => {
  const [reps, setReps] = useState<Representation[]>([]);
  const { viewer } = useContext(MiewContext);

  const genRepKey = (rep: Representation) => (
    ['selector', 'mode', 'colorer', 'material'].reduce((acc, cur) => {
      if (rep[cur]) {
        return acc + rep[cur];
      }
      return acc;
    })
  );

  const refresh = () => {
    const curReps = [];
    for (let i = 0; i < (viewer as Miew).repCount(); i += 1) {
      curReps.push((viewer as Miew).rep(i));
    }
    setReps(curReps);
  };

  return (
    <section>
      <h2>Debug</h2>
      <button type="button" onClick={refresh}>Refresh</button>
      <ul>
        {reps.map((rep: Representation) => <li key={genRepKey(rep)}>{JSON.stringify(rep)}</li>)}
      </ul>
    </section>
  );
};

export default Debug;
