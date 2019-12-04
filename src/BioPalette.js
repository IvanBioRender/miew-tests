import { Palette, StructuralElement } from 'miew';

const BioPalette = new Palette('BIO', 'BR');

BioPalette.colors = [
  10515455,
  6854911,
  2936319,
  1760175,
  3926339,
  16764928,
  16753478,
  16407641,
  15955383,
  11288557,
  6642130,
  4547305,
  38807,
  4950076,
  13142606,
  11298394,
];

// HAS SETTING
BioPalette.defaultElementColor = 16777215;

// DO NOT EDIT MANUALLY! Autogenerated from atom_types.csv by atom_types.py.
BioPalette.elementColors = {
  /* eslint-disable no-magic-numbers */
  H: 0xFFFFFF,
  C: 0x40BFBF,
  N: 0x0000FF,
  O: 0xFF0000,
  P: 0x808033,
  S: 0xFFFF00,
  /* eslint-enable no-magic-numbers */
};

// HAS SETTING
BioPalette.defaultResidueColor = 16504443;

// DO NOT EDIT MANUALLY! Autogenerated from residue_types.csv by residue_types.py.
BioPalette.residueColors = {
  /* eslint-disable no-magic-numbers */
  ALA: 0x0000FF,
  ARG: 0xFFFFFF,
  ASN: 0x808033,
  ASP: 0xFF0000,
  CYS: 0xFFFF00,
  GLN: 0xFF8000,
  GLU: 0xFF9999,
  GLY: 0xFFFFFF,
  HIS: 0x40C0C0,
  ILE: 0x00FF00,
  LEU: 0xFF9999,
  LYS: 0x40C0C0,
  MET: 0xFFFF00,
  PHE: 0xA600A6,
  PRO: 0x804C00,
  SER: 0xFFFF00,
  THR: 0xE666B3,
  TRP: 0x999999,
  TYR: 0x00FF00,
  VAL: 0x808033,
  A: 0x0000FF,
  C: 0xFF8000,
  G: 0xFFFF00,
  T: 0xA600A6,
  U: 0x00FF00,
  DA: 0x0000FF,
  DC: 0xFF8000,
  DG: 0xFFFF00,
  DT: 0xA600A6,
  DU: 0x00FF00,
  '+A': 0x0000FF,
  '+C': 0xFF8000,
  '+G': 0xFFFF00,
  '+T': 0xA600A6,
  '+U': 0x00FF00,
  WAT: 0x40C0C0,
  H2O: 0x40C0C0,
  HOH: 0x40C0C0,
  /* eslint-enable no-magic-numbers */
};

// HAS SETTING
BioPalette.chainColors = [
  10515455,
  6854911,
  2936319,
  1825229,
  3926339,
  16764928,
  16753478,
  16735835,
  16612031,
  11288557,
  6642130,
  4547305,
  38807,
  4950076,
  13142606,
  11298394,
  10790069,
];

const StructuralElementType = StructuralElement.Type;

// HAS SETTING
BioPalette.secondaryColors = {
  [StructuralElementType.HELIX_ALPHA]: 6854911,
  [StructuralElementType.HELIX_310]: 4904959,
  [StructuralElementType.HELIX_PI]: 1560165,
  [StructuralElementType.STRAND]: 13269503,
  [StructuralElementType.BRIDGE]: 13798235,
  [StructuralElementType.TURN]: 13592459,
};

BioPalette.gradients.rainbow = [
  8613631,
  2936319,
  3926339,
  16764928,
  16407641,
];
BioPalette.gradients.temp = [
  1404147,
  5355007,
  15262189,
  16743877,
  16200960,
];
BioPalette.gradients['blue-red'] = [
  1404147,
  16777215,
  16200960,
];

export default BioPalette;
