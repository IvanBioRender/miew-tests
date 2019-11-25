import React, { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';

const SaveLoadFields = ({
  getData,
  loadData,
}: InferProps<typeof SaveLoadFields.propTypes>) => {
  const [loadText, setLoadText] = useState('');

  const copyToClipboard = async () => {
    console.log('copy 2 clipboard');
    console.log(getData());
    await navigator.clipboard.writeText(JSON.stringify(getData(), null, 4));
  };

  const handleLoadTextChange = (e) => {
    setLoadText(e.target.value);
  };

  const load = () => {
    console.log('load');
    loadData(JSON.parse(loadText));
  };

  return (
    <>
      <fieldset>
        <legend>Save</legend>
        <button type="button" onClick={copyToClipboard}>Copy to clipboard</button>
      </fieldset>

      <fieldset>
        <legend>Load</legend>
        <textarea placeholder="Paste into here" value={loadText} onChange={handleLoadTextChange} />
        <br />
        <br />
        <button type="button" onClick={load}>Load</button>
      </fieldset>
    </>
  );
};

SaveLoadFields.propTypes = {
  getData: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default SaveLoadFields;