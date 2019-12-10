import React, { useContext } from 'react';
import useForm from 'react-hook-form';

import { MiewContext } from './App';
import {
  applyFlatShader,
  applyToonBackboneShader,
  applyToonBondsShader,
  applyToonSurfaceShader,
} from '../presetShaders';

const DEFAULT_DISPLAY_MODE = 'CA';
const DISPLAY_MODES = [
  {
    label: 'Bonds',
    modes: [
      {
        id: 'LC',
        name: 'Licorice',
        important: true,
      },
      {
        id: 'BS',
        name: 'Balls and Sticks',
        important: false,
      },
      {
        id: 'LN',
        name: 'Lines',
        important: false,
      },
      {
        id: 'VW',
        name: 'Van der Waals',
        important: true,
      },
    ],
  },
  {
    label: 'Backbone',
    modes: [
      {
        id: 'CA',
        name: 'Cartoon',
        important: true,
      },
      {
        id: 'TU',
        name: 'Tube',
        important: false,
      },
      {
        id: 'TR',
        name: 'Trace',
        important: false,
      },
    ],
  },
  {
    label: '3D Surface',
    modes: [
      {
        id: 'QS',
        name: 'Quick Surface',
        important: true,
      },
      {
        id: 'SA',
        name: 'SAS',
        important: true,
      },
      {
        id: 'SE',
        name: 'SES',
        important: true,
      },
      {
        id: 'CS',
        name: 'Contact Surface',
        important: false,
      },
    ],
  },
];

const DEFAULT_DISPLAY_COLOUR = 'SS';
const DISPLAY_COLOURS = [
  {
    id: 'UN',
    name: 'Uniform',
    important: true,
  },
  {
    id: 'CH',
    name: 'Chain',
    important: false,
  },
  {
    id: 'SQ',
    name: 'Sequence',
    important: true,
  },
  {
    id: 'TM',
    name: 'Temperature',
    important: true,
  },
  {
    id: 'MO',
    name: 'Molecule',
    important: false,
  },
  {
    id: 'HY',
    name: 'Hydrophobicity',
    important: true,
  },
  {
    id: 'SS',
    name: 'Secondary structure',
    important: true,
  },
  {
    id: 'RT',
    name: 'Residue type',
    important: true,
  },
  {
    id: 'EL',
    name: 'Element',
    important: false,
  },
];

const getModeCategory = (mode: string) => {
  if (['LC', 'BS', 'LN', 'VW'].includes(mode)) return 'Bonds';
  if (['CA', 'TU', 'TR'].includes(mode)) return 'Backbone';
  if (['QS', 'SA', 'SE', 'CS'].includes(mode)) return 'Surface';
};

const Representation = () => {
  const { viewer } = useContext(MiewContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    viewer.rep({ mode: data.mode });
    viewer.rep({ colorer: data.colour });

    const material = viewer.rep(0)?.material;
    const category = getModeCategory(data.mode);

    if (material === 'FL') {  // Flat
      applyFlatShader();
    } else {
      switch (category) {
        case 'Bonds':
          applyToonBondsShader();
          break;
        case 'Backbone':
          applyToonBackboneShader();
          break;
        case 'Surface':
          applyToonSurfaceShader();
          break;
      }
    }
  };

  return (
    <section>
      <h2>Representation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="mode">Display mode: </label>
        <select name="mode" defaultValue={DEFAULT_DISPLAY_MODE} ref={register({ required: true })}>
          {DISPLAY_MODES.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.modes.map((mode) => (
                <option key={mode.id} value={mode.id}>{mode.name}</option>
              ))}
            </optgroup>
          ))}
        </select>

        <br />
        <br />

        <label htmlFor="colour">Display colour: </label>
        <select name="colour" defaultValue={DEFAULT_DISPLAY_COLOUR} ref={register({ required: true })}>
          {DISPLAY_COLOURS.map((colour) => (
            <option key={colour.id} value={colour.id}>{colour.name}</option>
          ))}
        </select>

        <br />
        <br />
        <input type="submit" value="Apply" />
      </form>
    </section>
  );
};

export default Representation;
