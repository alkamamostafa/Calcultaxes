import { LocaleObject } from 'yup';

export const mixed: LocaleObject['mixed'] = {
  default: 'Champ est invalide.',
  required: 'Ce champ est obligatoire',
  defined: 'Ce champ ne doit pas être laissé vide',
  notType: ({ type }) => {
    if (type === 'number') {
      return 'Vous devez saisir un nombre valide';
    } else {
      return 'Erreur de type';
    }
  },
};

export const number: LocaleObject['number'] = {
  min: 'Ce champ doit être supérieure ou égale à ${min}',
  max: 'Ce champ doit être inférieur ou égal à ${max}',
  positive: 'Ce champ doit être un nombre positif',
  integer: 'Ce champ doit être un entier',
};

export const array: LocaleObject['array'] = {
  min: 'Ce champ doit avoir au moins ${min} élément(s)',
  max: 'Ce champ ne doit pas contenir plus de ${max} élément(s)',
};

export default {
  mixed,
  number,
  array,
};
