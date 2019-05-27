import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import MenuDrop from './MenuDrop';
import { publicMenu, optionsMenuAdmin, optionsMenuCustomer } from './routes'
import { styleToolbar } from '../SharedStyles';
import logo from '../../static/img/logo.js'

import Menu from '@material-ui/core/Menu';

function Header({ user }) {
  return (
    <div>
      <Toolbar style={styleToolbar}>
        <Grid container direction="row" justify="space-around" alignItems="center">
          <Grid item sm={9} xs={8} style={{ textAlign: 'left' }}>
            {!user ? (
              <React.Fragment>
                <Link prefetch href="/">
                  <Avatar
                    src={logo}
                    alt="Builder Book logo"
                    style={{ margin: '0px auto 0px 20px', cursor: 'pointer', textAlign: 'left' }}
                  />
                </Link>
                <div>

                  {/* {publicMenu.map((menu, key) => (
                  <Link prefetch href={menu.href} key={key}>
                    <MenuItem>
                      <ListItemText primary={menu.text} />
                    </MenuItem>
                  </Link>
                ))} */}
                </div>

              </React.Fragment>

            ) : null}
          </Grid>
          {/* <Grid item sm={2} xs={2} style={{ textAlign: 'right' }}>
            {user && user.isAdmin && !user.isGithubConnected ? (
              <Hidden smDown>
                <a href="/auth/github">
                  <Button variant="contained" color="primary">
                    Connect Github
                  </Button>
                </a>
              </Hidden>
            ) : null}
          </Grid> */}
          <Grid item sm={1} xs={2} style={{ textAlign: 'right' }}>
            {user ? (
              <div style={{ whiteSpace: ' nowrap' }}>
                <MenuDrop
                  options={user.isAdmin ? optionsMenuAdmin : optionsMenuCustomer}
                  src={user.avatarUrl}
                  alt={user.displayName}
                />
              </div>
            ) : (
                <Link prefetch href="/public/login" as="/login">
                  <a style={{ margin: '0px 20px 0px auto' }}>Log in</a>
                </Link>
              )}
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

Header.defaultProps = {
  user: null,
};

export default Header;
