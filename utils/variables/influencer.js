const Facebook = 'Facebook';
const Twitter = 'Twitter';
const Instagram = 'Instagram';
const Youtube = 'Youtube';

const list = [Facebook, Twitter, Instagram, Youtube];
const plateformList = list.map((elem) => ({
  label: elem,
  selected: false,
  icon: `../../static/img/icon/${elem}.png`,
}));

module.exports = {
  // Vars
  list,
  plateformList,
  Facebook,
  Twitter,
  Instagram,
  Youtube,

  // Methods
};
