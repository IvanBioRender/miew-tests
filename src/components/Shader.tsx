import React, { useContext } from 'react';
import useForm from 'react-hook-form';

import { MiewContext } from './App';

const DEFAULT_OUTLINE_ENABLED = true;
const DEFAULT_OUTLINE_THICKNESS = 1;
const DEFAULT_OUTLINE_THRESHOLD = 0.1;

const DEFAULT_SSAO_ENABLED = true;
const DEFAULT_SSAO_FACTOR = 0.7;
const DEFAULT_SSAO_KERNEL_RADIUS = 0.7;

const Shader = () => {
  const { viewer } = useContext(MiewContext);

  const {
    handleSubmit,
    register,
    watch,
  } = useForm();

  const onSubmit = (data: any) => {
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
  };

  return (
    <section>
      <h2>Shader</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <input type="submit" value="Apply" />
      </form>
    </section>
  );
};

export default Shader;
