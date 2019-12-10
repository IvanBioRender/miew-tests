import React, { useContext, useEffect, useRef } from 'react';
import useForm from 'react-hook-form';
import nanoid from 'nanoid';


import { MiewContext } from './App';
import SaveLoadFields from './SaveLoadFields';
import { updateSetter, updateSubmit } from '../presetShaders';

const DEFAULT_MATERIAL = 'FL';
const MATERIALS = [
  {
    id: 'FL',
    name: 'Flat',
  },
  {
    id: 'TN',
    name: 'Toon',
  },
  {
    id: 'SF',
    name: 'Soft Plastic',
  },
  {
    id: 'GL',
    name: 'Glass',
  }
];

const DEFAULT_OUTLINE_ENABLED = true;
const DEFAULT_OUTLINE_THICKNESS = 1;
const DEFAULT_OUTLINE_THRESHOLD = 0.1;

const DEFAULT_SSAO_ENABLED = true;
const DEFAULT_SSAO_FACTOR = 0.7;
const DEFAULT_SSAO_KERNEL_RADIUS = 0.7;

const DEFAULT_TOON_BORDER = {
  LOW: 0.0,
  MED: 0.7,
  HIGH: 1.0,
};
const DEFAULT_TOON_RANGE = {
  MED: 0.5,
  HIGH: 0.95,
};

const DEFAULT_FOG_ENABLED = true;
const DEFAULT_FOG_COLOUR = 0x202020;

const Shader = () => {
  const { viewer } = useContext(MiewContext);
  const submitRef = useRef(null);

  const {
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    updateSetter(setValue);
  }, [setValue]);

  useEffect(() => {
    updateSubmit(() => {
      submitRef.current.click();
    });
  }, [submitRef]);

  const onSubmit = (data: any) => {
    const inputToColour = (input: string) => parseInt((input[0] === '#' ? input.substring(1, 7) : input), 16);

    viewer.rep(0, { ...viewer.rep(0), material: data.material });

    viewer.set('outline.on', data.outlineEnabled);
    viewer.set('outline.thickness', data.outlineThickness);
    viewer.set('outline.threshold', data.outlineThreshold);

    // Turn AO off and on again to ensure factor changes
    viewer.set('ao', false);
    viewer.set('debug.ssaoFactor', data.ssaoFactor);
    viewer.set('debug.ssaoKernelRadius', data.ssaoKernelRadius === 0 ? 0.01 : data.ssaoKernelRadius);
    viewer.set('ao', true);
    // Set actual AO enabled
    viewer.set('ao', data.ssaoEnabled);

    let newMat = Object.assign({}, viewer.getMaterials().get('tn'));
    newMat.uberOptions.toonBorder = {
      x: data.toonBorderLow,
      y: data.toonBorderMed,
      z: data.toonBorderHigh,
    };
    newMat.uberOptions.toonRange = {
      x: data.toonRangeMed,
      y: data.toonRangeHigh,
    };
    newMat.id = nanoid();
    viewer.getMaterials().register(newMat);

    if (data.material === 'TN') {
      viewer.rep(0, { ...viewer.rep(0), material: newMat.id });
    }

    viewer.set('fog', data.fogEnabled);
    viewer.set('fogColor', inputToColour(data.fogColour));
  };

  return (
    <section>
      <h2>Shader</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="material">Material: </label>
        <select name="material" defaultValue={DEFAULT_MATERIAL} ref={register({ required: true })}>
          {MATERIALS.map((material) => (
            <option key={material.id} value={material.id}>{material.name}</option>
          ))}
        </select>
        <br />
        <br />

        <fieldset>
          <legend>Outline</legend>

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
        </fieldset>
        <br />

        <fieldset>
          <legend>Ambient Occlusion</legend>

          <label htmlFor="ssaoEnabled">Enabled: </label>
          <input
            name="ssaoEnabled"
            type="checkbox"
            ref={register({})}
            defaultChecked={DEFAULT_SSAO_ENABLED}
          />
          <br />
          <br />

          <label htmlFor="ssaoFactor">Factor: </label>
          <span style={{ marginBottom: 0 }}>{Number(watch('ssaoFactor')).toFixed(2)}</span>
          <br />
          <input
            name="ssaoFactor"
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue={DEFAULT_SSAO_FACTOR}
            ref={register({ required: true })}
          />
          <br />

          <label htmlFor="ssaoKernelRadius">Kernel Radius: </label>
          <span style={{ marginBottom: 0 }}>{Number(watch('ssaoKernelRadius')).toFixed(2)}</span>
          <br />
          <input
            name="ssaoKernelRadius"
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue={DEFAULT_SSAO_KERNEL_RADIUS}
            ref={register({ required: true })}
          />
          <br />
        </fieldset>
        <br />

        <fieldset>
          <legend>Toon</legend>

          <label htmlFor="toonBorderLow">Toon Border Low: </label>
          <span style={{ marginBottom: 0 }}>{Number(watch('toonBorderLow')).toFixed(2)}</span>
          <br />
          <input
            name="toonBorderLow"
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue={DEFAULT_TOON_BORDER.LOW}
            ref={register({ required: true })}
          />
          <br />

          <label htmlFor="toonBorderMed">Toon Border Medium: </label>
          <span style={{ marginBottom: 0 }}>{Number(watch('toonBorderMed')).toFixed(2)}</span>
          <br />
          <input
            name="toonBorderMed"
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue={DEFAULT_TOON_BORDER.MED}
            ref={register({ required: true })}
          />
          <br />

          <label htmlFor="toonBorderHigh">Toon Border High: </label>
          <span style={{ marginBottom: 0 }}>{Number(watch('toonBorderHigh')).toFixed(2)}</span>
          <br />
          <input
            name="toonBorderHigh"
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue={DEFAULT_TOON_BORDER.HIGH}
            ref={register({ required: true })}
          />
          <br />

          <label htmlFor="toonRangeMed">Toon Range Medium: </label>
          <span style={{ marginBottom: 0 }}>{Number(watch('toonRangeMed')).toFixed(2)}</span>
          <br />
          <input
            name="toonRangeMed"
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue={DEFAULT_TOON_RANGE.MED}
            ref={register({ required: true })}
          />
          <br />

          <label htmlFor="toonRangeHigh">Toon Range High: </label>
          <span style={{ marginBottom: 0 }}>{Number(watch('toonRangeHigh')).toFixed(2)}</span>
          <br />
          <input
            name="toonRangeHigh"
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue={DEFAULT_TOON_RANGE.HIGH}
            ref={register({ required: true })}
          />
          <br />
        </fieldset>
        <br />

        <fieldset>
          <legend>Fog</legend>

          <label htmlFor="fogEnabled">Enabled: </label>
          <input
            name="fogEnabled"
            type="checkbox"
            ref={register({})}
            defaultChecked={DEFAULT_FOG_ENABLED}
          />
          <br />
          <br />

          <label htmlFor="fogColour">Colour: </label>
          <input
            name="fogColour"
            type="color"
            defaultValue={`#${DEFAULT_FOG_COLOUR.toString(16)}`}
            ref={register({ required: true })}
          />
        </fieldset>
        <br />

        <input type="submit" value="Apply" ref={submitRef} />
      </form>
      <br />

      <SaveLoadFields getData={getValues} loadData={reset} />
    </section>
  );
};

export default Shader;
