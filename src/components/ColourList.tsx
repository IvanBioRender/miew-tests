import React, { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import nanoid from 'nanoid';

export interface Colour {
  id: string;
  val: number;
}

const ColourList = ({
  name,
  title,
  description,
  defaults,
  register,
  extraChildren,
  triggerValidation,
}: InferProps<typeof ColourList.propTypes>) => {
  const [colours, setColours] = useState<Colour[]>(defaults);

  const addColour = () => {
    setColours([...colours, { val: 0xFFFFFF, id: nanoid() }]);
    
    triggerValidation();
  };

  const removeColour = () => {
    // eslint-disable-next-line
    const i = Number(window.prompt('Colour index to remove:')) - 1;
    if (!i) return;

    setColours(colours.filter((_, index) => index !== i));

    triggerValidation();
  };

  return (
    <fieldset className="colour-list">
      <legend>{ title }</legend>
      <p>{ description }</p>
      <button type="button" onClick={addColour}>Add</button>
      <button type="button" onClick={removeColour}>Remove</button>
      <br />
      <br />
      <div className="colour-list-grid-wrapper">
        {colours.map((col, index) => (
          <label key={col.id}>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            {(index + 1).toString().padStart(2, '0')}:
            <input
              name={`${name}Colour[${index}]`}
              type="color"
              defaultValue={`#${col.val.toString(16).padStart(6, '0')}`}
              ref={register}
            />
          </label>
        ))}
      </div>

      {extraChildren}
    </fieldset>
  );
};

ColourList.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  defaults: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    val: PropTypes.number,
  })).isRequired,
  register: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  extraChildren: PropTypes.element.isRequired,
};

ColourList.defaultProps = {
  triggerValidation: () => null,
  extraChildren: <></>,
};

export default ColourList;
