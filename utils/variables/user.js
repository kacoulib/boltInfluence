const Admin = 'admin';
const Influencer = 'influencer';
const Brand = 'brand';
const Agency = 'agency';
const RoleList = [Admin, Influencer, Brand, Agency];
const BusinessRoleList = [Brand, Agency];

const Active = 'active';
const Inactive = 'inactive';
const StatusList = [Active, Inactive];

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
