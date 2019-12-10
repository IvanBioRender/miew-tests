let setValue = null;
let submit = null;

export const updateSetter = (_setValue: (name: string, value: any) => void | Promise<Boolean>) => {
  setValue = _setValue;
  console.log('updatesetter');
};

export const updateSubmit = (_submit: () => void) => {
  submit = _submit;
};

const applyPreset = (preset) => {
  for (const [key, val] of Object.entries(preset)) {
    setValue(key, val);
  }
  submit();
};

export const applyFlatShader = () => {
  applyPreset({
    "material": "FL",
    "outlineEnabled": true,
    "outlineThickness": "0.7",
    "outlineThreshold": "0.525",
    "ssaoEnabled": true,
    "ssaoFactor": "1",
    "ssaoKernelRadius": "1",
    "toonBorderLow": "0.35",
    "toonBorderMed": "0.7",
    "toonBorderHigh": "1",
    "toonRangeMed": "0.2",
    "toonRangeHigh": "0.75"
  });
};

export const applyToonBackboneShader = () => {
  applyPreset({
    "material": "TN",
    "outlineEnabled": true,
    "outlineThickness": "0.7",
    "outlineThreshold": "0.525",
    "ssaoEnabled": true,
    "ssaoFactor": "0.8",
    "ssaoKernelRadius": "0.9",
    "toonBorderLow": "0.35",
    "toonBorderMed": "0.7",
    "toonBorderHigh": "1",
    "toonRangeMed": "0.2",
    "toonRangeHigh": "0.75"
  });
};

export const applyToonBondsShader = () => {
  applyPreset({
    "material": "TN",
    "outlineEnabled": true,
    "outlineThickness": "0.7",
    "outlineThreshold": "0.525",
    "ssaoEnabled": true,
    "ssaoFactor": "0.75",
    "ssaoKernelRadius": "0.75",
    "toonBorderLow": "0.35",
    "toonBorderMed": "0.7",
    "toonBorderHigh": "1",
    "toonRangeMed": "0.2",
    "toonRangeHigh": "0.75"
  });
};

export const applyToonSurfaceShader = () => {
  applyPreset({
    "material": "TN",
    "outlineEnabled": true,
    "outlineThickness": "0.7",
    "outlineThreshold": "0.525",
    "ssaoEnabled": false,
    "ssaoFactor": "0.75",
    "ssaoKernelRadius": "0.75",
    "toonBorderLow": "0.35",
    "toonBorderMed": "0.7",
    "toonBorderHigh": "1",
    "toonRangeMed": "0.2",
    "toonRangeHigh": "0.75"
  });
};
