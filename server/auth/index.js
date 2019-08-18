const { RoleList } = require('../../utils/variables/user')

module.exports = {
    redirecAfterAuth: (req, res) => {
        const user = req.user;

        if (req.isAuthenticated() && user) {
            if (RoleList.includes(user.role))
                res.redirect('/admin/posts')
            else
                req.logout();
        } else {
            res.redirect('/login');
        }
    }
};
