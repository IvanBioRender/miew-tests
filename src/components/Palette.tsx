import React, { useContext } from 'react';
import useForm from 'react-hook-form';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { StructuralElement } from 'miew';
import nanoid from 'nanoid';

import BioPalette from '../BioPalette';

import { MiewContext } from './App';

const DEFAULT_OUTLINE_ENABLED = true;
const DEFAULT_OUTLINE_THRESHOLD = 0.1;

const DEFAULT_ELEMENT_COLOUR: number = BioPalette.defaultElementColor;
const DEFAULT_RESIDUE_COLOUR: number = BioPalette.defaultResidueColor;

const SECONDARY_COLOURS = ['helix_alpha', 'helix_310', 'helix_pi', 'strand', 'bridge', 'turn'];
const SECONDARY_DEFAULTS = SECONDARY_COLOURS.map((val) => (
  BioPalette.secondaryColors[StructuralElement.Type[val.toUpperCase()]]
));

const Palette = () => {
  const { viewer } = useContext(MiewContext);

  const {
    register, handleSubmit, getValues, watch,
  } = useForm();

  const onSubmit = (data: any) => {
    viewer.set('outline.on', data.outlineEnabled);
    viewer.set('outline.threshold', data.outlineThreshold);

    const inputToColour = (input: string) => parseInt((input[0] === '#' ? input.substring(1, 7) : input), 16);

    // Default element colour
    BioPalette.defaultElementColor = inputToColour(data.defaultElementColour);

    // Default residue colour
    BioPalette.defaultResidueColor = inputToColour(data.defaultResidueColour);

    // Secondary Colours
    SECONDARY_COLOURS.forEach((colour) => {
      BioPalette.secondaryColors[
        StructuralElement.Type[
          colour.toUpperCase()]] = inputToColour(data[colour]);
    });

    // Display changes
    BioPalette.id = nanoid();
    viewer.getPalettes().register(BioPalette);
    viewer.set('palette', BioPalette.id);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(JSON.stringify(getValues(), null, 4));
  };

  return (
    <section>
      <h2>Palette</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <h3>Outline</h3>

        <label htmlFor="outlineEnabled">Enabled: </label>
        <input
          name="outlineEnabled"
          type="checkbox"
          ref={register({})}
          defaultChecked={DEFAULT_OUTLINE_ENABLED}
        />

        <br />
        <br />

        <label htmlFor="outlineThreshold">Threshold: </label>
        <span style={{ marginBottom: 0 }}>{Number(watch('outlineThreshold')).toFixed(3)}</span>
        <br />
        <input
          name="outlineThreshold"
          type="range"
          min="0"
          max="1"
          step="0.005"
          defaultValue={DEFAULT_OUTLINE_THRESHOLD}
          ref={register({ required: true })}
        />
        <br />

        <h3>Colours</h3>

        <label htmlFor="defaultElementColour">Default Element Colour: </label>
        <input
          name="defaultElementColour"
          type="color"
          defaultValue={`#${DEFAULT_ELEMENT_COLOUR.toString(16)}`}
          ref={register({ required: true })}
        />
        <br />
        <br />

        <label htmlFor="defaultResidueColour">Default Residue Colour: </label>
        <input
          name="defaultResidueColour"
          type="color"
          defaultValue={`#${DEFAULT_RESIDUE_COLOUR.toString(16)}`}
          ref={register({ required: true })}
        />
        <br />

        <h4>Secondary</h4>
        {SECONDARY_COLOURS.map((val, index) => (
          <React.Fragment key={val}>
            <label htmlFor={val}>{`${val}: `}</label>
            <input
              name={val}
              type="color"
              defaultValue={`#${SECONDARY_DEFAULTS[index].toString(16)}`}
              ref={register({ required: true })}
            />
            <br />
          </React.Fragment>
        ))}
        <br />
        <input type="submit" value="Apply" />
      </form>
      <br />
      <button type="button" onClick={copyToClipboard}>Copy to clipboard</button>
    </section>
  );
};

export default Palette;
