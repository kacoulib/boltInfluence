const { RoleList } = require('../../utils/variables/user')

module.exports = {
    redirecAfterAuth: (req, res) => {
        const user = req.user;

        if (req.user) {
            if (RoleList.includes(user.role))
                res.redirect('/dashboard')
            else
                req.logout();
        } else {
            res.redirect('/login');
        }
    }
};
