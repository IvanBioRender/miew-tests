import React, { useContext, useEffect, useState } from 'react';
import useForm from 'react-hook-form';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { StructuralElement } from 'miew';
import nanoid from 'nanoid';

import BioPalette from '../BioPalette';

import { MiewContext } from './App';

interface Colour {
  id: string;
  val: number;
}

const DEFAULT_OUTLINE_ENABLED = true;
const DEFAULT_OUTLINE_THICKNESS = 1;
const DEFAULT_OUTLINE_THRESHOLD = 0.1;

const DEFAULT_ELEMENT_COLOUR: number = BioPalette.defaultElementColor;
const DEFAULT_RESIDUE_COLOUR: number = BioPalette.defaultResidueColor;

const SECONDARY_COLOURS = ['helix_alpha', 'helix_310', 'helix_pi', 'strand', 'bridge', 'turn'];
const SECONDARY_DEFAULTS = SECONDARY_COLOURS.map((val) => (
  BioPalette.secondaryColors[StructuralElement.Type[val.toUpperCase()]]
));

const DEFAULT_MAIN_COLOURS: Colour[] = BioPalette.colors.map((col) => (
  { val: col, id: nanoid() }
));

const DEFAULT_CHAIN_COLOURS: Colour[] = BioPalette.chainColors.map((col) => (
  { val: col, id: nanoid() }
));

const Palette = () => {
  const { viewer } = useContext(MiewContext);
  const [chainColours, setChainColours] = useState(DEFAULT_CHAIN_COLOURS);
  const [mainColours, setMainColours] = useState(DEFAULT_MAIN_COLOURS);

  useEffect(() => { window.BP = BioPalette; }, []);

  const {
    register, handleSubmit, getValues, watch,
  } = useForm();

  const onSubmit = (data: any) => {
    viewer.set('outline.on', data.outlineEnabled);
    viewer.set('outline.thickness', data.outlineThickness);
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

    // Main colours
    const mainColourKeys = Object.keys(getValues()).filter((key) => key.match(/^mainColour/));
    BioPalette.colors = mainColourKeys.map((key) => (
      parseInt(getValues()[key].substring(1, 7), 16)
    ));

    // Chain colours
    const chainColourKeys = Object.keys(getValues()).filter((key) => key.match(/^chainColour/));
    BioPalette.chainColors = chainColourKeys.map((key) => (
      parseInt(getValues()[key].substring(1, 7), 16)
    ));

    // Display changes
    BioPalette.id = nanoid();
    viewer.getPalettes().register(BioPalette);
    viewer.set('palette', BioPalette.id);
  };

  const addMainColour = () => {
    setMainColours([...mainColours, { val: 0xFFFFFF, id: nanoid() }]);
  };

  const removeMainColour = () => {
    // eslint-disable-next-line
    const i = Number(window.prompt('Colour index to remove:')) - 1;
    if (!i) return;

    setMainColours(mainColours.filter((_, index) => index !== i));
  };

  const addChainColour = () => {
    setChainColours([...chainColours, { val: 0xFFFFFF, id: nanoid() }]);
  };

  const removeChainColour = () => {
    // eslint-disable-next-line
    const i = Number(window.prompt('Chain colour index to remove:')) - 1;
    if (!i) return;

    setChainColours(chainColours.filter((_, index) => index !== i));
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

        <label htmlFor="outlineThickness">Thickness: </label>
        <span style={{ marginBottom: 0 }}>{Number(watch('outlineThickness')).toFixed(2)}</span>
        <br />
        <input
          name="outlineThickness"
          type="range"
          min="0"
          max="3"
          step="0.05"
          defaultValue={DEFAULT_OUTLINE_THICKNESS}
          ref={register({ required: true })}
        />
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
        <br />

        <fieldset>
          <legend>Secondary</legend>
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
        </fieldset>
        <br />

        <fieldset id="colour-list">
          <legend>Main</legend>
          <button type="button" onClick={addMainColour}>Add</button>
          <button type="button" onClick={removeMainColour}>Remove</button>
          <br />
          <br />
          <div id="colour-list-grid-wrapper">
            {mainColours.map((col, index) => (
              <label key={col.id}>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                {(index + 1).toString().padStart(2, '0')}:
                <input
                  name={`mainColour[${index}]`}
                  type="color"
                  defaultValue={`#${col.val.toString(16).padStart(6, '0')}`}
                  ref={register}
                />
              </label>
            ))}
          </div>
        </fieldset>
        <br />

        <fieldset id="colour-list">
          <legend>Chain</legend>
          <button type="button" onClick={addChainColour}>Add</button>
          <button type="button" onClick={removeChainColour}>Remove</button>
          <br />
          <br />
          <div id="colour-list-grid-wrapper">
            {chainColours.map((col, index) => (
              <label key={col.id}>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                {(index + 1).toString().padStart(2, '0')}:
                <input
                  name={`chainColour[${index}]`}
                  type="color"
                  defaultValue={`#${col.val.toString(16).padStart(6, '0')}`}
                  ref={register}
                />
              </label>
            ))}
          </div>
        </fieldset>
        <br />

        <input type="submit" value="Apply" />
      </form>
      <br />
      <button type="button" onClick={copyToClipboard}>Copy to clipboard</button>
    </section>
  );
};

export default Palette;
