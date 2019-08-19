const { RoleList, isAdmin } = require('../../utils/variables/user')

module.exports = {
    redirecAfterAuth: (req, res) => {
        const user = req.user;

        if (req.isAuthenticated() && user) {
            if (isAdmin(user.role))
                res.redirect('/admin/posts')
            else
                res.redirect('/influenceurs');
            // req.logout();
        } else {
            res.redirect('/login');
        }
    }
};
