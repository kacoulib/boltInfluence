const Admin = 'admin';
const Influencer = 'influencer';
const Enterprise = 'enterprise';
const RoleList = [Admin, Influencer, Enterprise];

const isAdmin = (user) => user && user.role === Admin;
const isInfluencer = (user) => user && user.role === Influencer;
const isEnterprise = (user) => user && user.role === Enterprise;

module.exports = {

    // Vars
    RoleList,
    Admin,
    Influencer,
    Enterprise,

    // Methods
    isAdmin,
    isInfluencer,
    isEnterprise
}