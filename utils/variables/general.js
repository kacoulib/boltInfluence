const languageToCode = {
  Mandarin: 'ZH',
  Hindi: 'HI',
  Espagnol: 'ES',
  Français: 'FR',
  Arabe: 'AR',
  Bengali: 'BN',
  Russe: 'RU',
  Portugais: 'PT',
  Indonésien: 'ID',
  Ourdou: 'UR',
  Allemand: 'DE',
  Japonais: 'JA',
  Swahili: 'SW',
  Marathi: 'MR',
  Télougou: 'TE',
  'Pendjabi occidental': 'PA',
  // 'Wu': 'WUU',
  Tamoul: 'TA',
  Turc: 'TR',
  Coréen: 'KO',
  Vietnamien: 'VI',
  // 'Cantonais': 'YUE',
  Javanais: 'JV',
  Italien: 'IT',
  // 'Arabe égyptien': 'ARZ',
  Haoussa: 'HA',
  Thaï: 'TH',
  Gujarati: 'GU',
  Persan: 'FA',
  // 'Bhodjpouri': 'BHO',
  // 'Minnan': 'NAN',
};
const codeToLanguage = Object.entries(languageToCode).reduce(
  (acc, [language, code]) => ({ ...acc, [code]: language }),
  {},
);
const languageList = Object.keys(languageToCode);
const languageCodeList = Object.keys(codeToLanguage);

const civilityList = [{ name: 'Mr', value: 'Mr' }, { name: 'Mme', value: 'Mme' }];
const choiceList = [{ name: 'Yes', value: 'yes' }, { name: 'No', value: 'no' }];

module.exports = {
  // Vars
  languageList,
  languageCodeList,
  languageToCode,
  codeToLanguage,
  civilityList,
  choiceList,
};
