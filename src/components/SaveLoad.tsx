import React, { useContext, useState } from 'react';
import { State } from 'miew';

import { MiewContext } from './App';
import SaveLoadFields from './SaveLoadFields';

const SaveLoad = () => {
  const { viewer } = useContext(MiewContext);
  const [loadText, setLoadText] = useState('');

  const load = async (state: State) => {
    // Load molecule
    await viewer.load(state.load);
    // Reset and load reps
    await viewer.resetReps();
    state.reps.forEach((rep, index) => viewer.rep(index, rep));
    // Load view
    await viewer.view(state.view);

    setLoadText('');
  };

  const getViewerState = () => viewer.getState({ view: true });

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(
        viewer.getState({ view: true }),
      ),
    );
  };

  const handleChange = (e) => {
    setLoadText(e.target.value);
  };

  return (
    <section>
      <h2>Save/Load</h2>
      <SaveLoadFields getData={getViewerState} loadData={load} />
    </section>
  );
};

export default SaveLoad;
