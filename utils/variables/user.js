const Admin = 'admin';
const Influencer = 'influencer';
const Enterprise = 'enterprise';

const isAdmin = (user) => user && user.role === Admin;
const isInfluencer = (user) => user && user.role === Influencer;
const isEnterprise = (user) => user && user.role === Enterprise;

module.exports = {
    // Vars
    Admin,
    Influencer,
    Enterprise,

    // Methods
    isAdmin,
    isInfluencer,
    isEnterprise
}