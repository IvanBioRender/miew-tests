import React, { useContext, useState } from 'react';
import { State } from 'miew';

import { MiewContext } from './App';

const SaveLoad = () => {
  const { viewer } = useContext(MiewContext);
  const [loadText, setLoadText] = useState('');

  const load = async () => {
    const state: State = JSON.parse(loadText);
    // Load molecule
    await viewer.load(state.load);
    // Reset and load reps
    await viewer.resetReps();
    state.reps.forEach((rep, index) => viewer.rep(index, rep));
    // Load view
    await viewer.view(state.view);

    setLoadText('');
  };

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
      <fieldset>
        <legend>Load</legend>
        <textarea placeholder="Paste into here" value={loadText} onChange={handleChange} />
        <br />
        <br />
        <button type="button" onClick={load}>Load</button>
      </fieldset>
      <br />

      <fieldset>
        <legend>Save</legend>
        <button type="button" onClick={copyToClipboard}>Copy to clipboard</button>
      </fieldset>
    </section>
  );
};

export default SaveLoad;
