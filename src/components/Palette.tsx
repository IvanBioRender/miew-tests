import React, { useContext, useEffect } from 'react';
import useForm from 'react-hook-form';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { StructuralElement } from 'miew';
import nanoid from 'nanoid';

import BioPalette from '../BioPalette';

import ColourList, { Colour } from './ColourList';
import SaveLoadFields from './SaveLoadFields';
import { MiewContext } from './App';

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

const DEFAULT_UNIFORM_INDEX = 0;
const DEFAULT_UNIFORM_COLOURS: Colour[] = [
  0xCCF2FF,
  0xCAFFEA,
  0xD2FFC4,
  0xFFF9AA,
  0xFFDCB9,
  0xEDD9FF,
  0xFFFFFF,
  0xE0E0E0,
].map((col) => (
  { val: col, id: nanoid() }
));

const DEFAULT_GRADIENT_RAINBOW_COLOURS: Colour[] = BioPalette.gradients.rainbow.map((col) => (
  { val: col, id: nanoid() }
));

const DEFAULT_GRADIENT_TEMP_COLOURS: Colour[] = BioPalette.gradients.temp.map((col) => (
  { val: col, id: nanoid() }
));

const DEFAULT_GRADIENT_BLUE_RED_COLOURS: Colour[] = BioPalette.gradients['blue-red'].map((col) => (
  { val: col, id: nanoid() }
));

const Palette = () => {
  const { viewer } = useContext(MiewContext);

  const {
    getValues,
    handleSubmit,
    register,
    reset,
    triggerValidation,
    watch,
  } = useForm();

  useEffect(() => {
    window.BP = BioPalette;
    window.getValues = () => getValues({ nest: true });
  }, [getValues]);

  const onSubmit = (data: any) => {
    const inputToColour = (input: string) => parseInt((input[0] === '#' ? input.substring(1, 7) : input), 16);
    const colourFieldsToHex = (colours) => colours.map((col) => inputToColour(col));

    BioPalette.defaultElementColor = inputToColour(data.defaultElementColour);
    BioPalette.defaultResidueColor = inputToColour(data.defaultResidueColour);

    // Secondary Colours
    SECONDARY_COLOURS.forEach((colour) => {
      BioPalette.secondaryColors[
        StructuralElement.Type[
          colour.toUpperCase()]] = inputToColour(data[colour]);
    });

    BioPalette.colors = colourFieldsToHex(data.mainColour);
    BioPalette.chainColors = colourFieldsToHex(data.chainColour);
    BioPalette.gradients.rainbow = colourFieldsToHex(data.gradientRainbowColour);
    BioPalette.gradients.temp = colourFieldsToHex(data.gradientTemperatureColour);
    BioPalette.gradients['blue-red'] = colourFieldsToHex(data.gradientBlueRedColour);

    viewer.set('colorers.UN.color', inputToColour(data.uniformColour[data.uniformIndex - 1]));

    // Display changes
    BioPalette.id = nanoid();
    viewer.getPalettes().register(BioPalette);
    viewer.set('palette', BioPalette.id);
  };

  return (
    <section>
      <h2>Palette</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

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
            <div className="secondary-colour" key={val}>
              <label htmlFor={val}>{`${val}: `}</label>
              <input
                name={val}
                type="color"
                defaultValue={`#${SECONDARY_DEFAULTS[index].toString(16)}`}
                ref={register({ required: true })}
              />
              <br />
            </div>
          ))}
        </fieldset>
        <br />

        <ColourList
          name="main"
          title="Main"
          description="Affects: ?"
          defaults={DEFAULT_MAIN_COLOURS}
          register={register}
        />
        <br />

        <ColourList
          name="chain"
          title="Chain"
          description="Affects: Chain"
          defaults={DEFAULT_CHAIN_COLOURS}
          register={register}
        />
        <br />

        <ColourList
          name="uniform"
          title="Uniform"
          description="Affects: Uniform"
          defaults={DEFAULT_UNIFORM_COLOURS}
          register={register}
          triggerValidation={triggerValidation}
          extraChildren={
            <label>Active colour:
              <input
                type="number"
                name="uniformIndex"
                min="1"
                max={watch('uniformColour')?.length}
                defaultValue={DEFAULT_UNIFORM_INDEX + 1}
                ref={register({ required: true })}
              />
            </label>
          }
        />

        <h3>Gradients</h3>

        <ColourList
          name="gradientRainbow"
          title="Rainbow"
          description="Affects: Molecule, Sequence"
          defaults={DEFAULT_GRADIENT_RAINBOW_COLOURS}
          register={register}
        />
        <br />

        <ColourList
          name="gradientTemperature"
          title="Temperature"
          description="Affects: Temperature"
          defaults={DEFAULT_GRADIENT_TEMP_COLOURS}
          register={register}
        />
        <br />

        <ColourList
          name="gradientBlueRed"
          title="Blue-Red"
          description="Affects: Hydrophobicity"
          defaults={DEFAULT_GRADIENT_BLUE_RED_COLOURS}
          register={register}
        />
        <br />

        <input type="submit" value="Apply" />
      </form>
      <br />

      <SaveLoadFields getData={getValues} loadData={reset} />
    </section>
  );
};

export default Palette;
