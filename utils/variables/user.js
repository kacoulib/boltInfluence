const Admin = 'admin';
const Influencer = 'influencer';
const Brand = 'brand';
const Agency = 'agency';
const RoleList = [Admin, Influencer, Brand, Agency];
const BusinessRoleList = [Brand, Agency];

const Active = 'active';
const Inactive = 'inactive';
const StatusList = [Active, Inactive];

const categories = [
  { name: 'Subcategorie 1', value: 'subcategorie_1' },
  { name: 'Subcategorie 2', value: 'subcategorie_2' },
  { name: 'Subcategorie 3', value: 'subcategorie_3' },
  { name: 'Subcategorie 4', value: 'subcategorie_4' },
  { name: 'Subcategorie 5', value: 'subcategorie_5' },
  { name: 'Subcategorie 6', value: 'subcategorie_6' },
];
const activities = [
  { name: 'Salarié (non cadre)', value: 'salarie' },
  { name: 'Cadre', value: 'cadre' },
  { name: 'Entrepreneur/autoentrepreneur', value: 'entreprenor' },
  { name: 'De profession libérale', value: 'liberal' },
  { name: 'Profession des arts et spectacles', value: 'art' },
  { name: 'Sans emploi', value: 'businessman' },
  { name: 'Retraité', value: 'retiree' },
  { name: 'Autre', value: 'other' },
];

const activityList = activities.map(e => e.value);
const categoryList = categories.map(e => e.value);

const isAdmin = (user) => user && user.role === Admin;
const isInfluencer = (user) => user && user.role === Influencer;
const isBrand = (user) => user && user.role === Brand;
const isAgency = (user) => user && user.role === Agency;
const isBusiness = (user) => user && BusinessRoleList.includes(user.role);

module.exports = {
  // Vars
  RoleList,
  BusinessRoleList,
  Admin,
  Influencer,
  Brand,
  Agency,
  categories,
  activities,
  activityList,
  categoryList,
  Active,
  Inactive,
  StatusList,

  // Methods
  isAdmin,
  isInfluencer,
  isBrand,
  isAgency,
  isBusiness,
};
