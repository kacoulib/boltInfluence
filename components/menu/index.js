import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import MenuDrop from './MenuDrop';
import { publicMenu, optionsMenuAdmin, optionsMenuCustomer } from './routes'
import { styleToolbar, styleToolbarLink, greenBorder, redBorder} from '../SharedStyles';
import styles from '../SharedStyles';
import logo from '../../static/img/logoBlue.js'
import userIconWhite from '../../static/img/userIconWhite.js';

import iconTwitter from '../../static/img/icon/TwitterWhite.png';

import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	avatar: {
		margin: 10,
		height: 25,
		width: 25,
	},
		bigAvatar: {
		margin: 10,
		width: 60,
		height: 60,
	},
});

function Header({ user }) {
	const classes = useStyles();
	return (
		<div>
		<Toolbar style={styleToolbar}>
			<Grid style={styles.redBorder} container direction="row" justify="space-around" alignItems="center">
				<Grid xs={1} sm={1} item style={styles.greenBorder}>
					<Grid xs={1} sm={1} item style={styles.greenBorder}>
						<Link prefetch href="/">
							<img src={logo} />
						</Link>
					</Grid>
				</Grid>

			<Grid item sm={2} xs={2}>
            {!user ? (
              <React.Fragment>

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


// <Grid style={styles.redBorder} container direction="row" justify="space-around" alignItems="center">
// 	<Grid style={styles.redBorder} container direction="row" justify="space-around" alignItems="center">
// 		Drapeau FR
// 	</Grid>
// 	<Grid style={styles.redBorder} container direction="row" justify="space-around" alignItems="center">
// 		<Grid style={styleToolbarLink} item sm={1} xs={2}>
// 			Annonceurs
// 		</Grid>
// 		<Grid style={styleToolbarLink} item sm={1} xs={2}>
// 			Influenceurs
// 		</Grid>
// 		<Grid style={styleToolbarLink} item sm={1} xs={2}>
// 			La vidéo d'influence
// 		</Grid>
// 		<Grid style={styleToolbarLink} item sm={1} xs={2}>
// 			Notre méthode
// 		</Grid>
// 		<Grid style={styleToolbarLink} item sm={1} xs={2}>
// 			Contactez-nous
// 		</Grid>
// 		<Grid item sm={1} xs={2}>
// 			<Avatar className={styles.bigAvatar} src={userIconWhite} />
// 		</Grid>
// 	</Grid>
// 	<Grid style={styles.redBorder} xs={12} container direction="row" justify="space-around" alignItems="center">
// 		<Grid style={styleToolbarLink} item sm={1} xs={2}>
// 			<img style={styles.styleIconeSocial} src={iconTwitter} />
// 		</Grid>
// 	</Grid>
// </Grid>


// <Grid style={styleToolbarLink} item sm={1} xs={2}>
// 	Annonceurs
// </Grid>
// <Grid style={styleToolbarLink} item sm={1} xs={2}>
// 	Influenceurs
// </Grid>
// <Grid style={styleToolbarLink} item sm={1} xs={2}>
// 	La vidéo d'influence
// </Grid>
// <Grid style={styleToolbarLink} item sm={1} xs={2}>
// 	Notre méthode
// </Grid>
// <Grid style={styleToolbarLink} item sm={1} xs={2}>
// 	Contactez-nous
// </Grid>


// <Grid item sm={1} xs={2} style={{ textAlign: 'right' }}>
// 	{user ? (
// 	<div style={{ whiteSpace: ' nowrap' }}>
// 	<MenuDrop
// 	options={user.isAdmin ? optionsMenuAdmin : optionsMenuCustomer}
// 	src={user.avatarUrl}
// 	alt={user.displayName}
// 	/>
// 	</div>
// 	) : (
// 	<Link prefetch href="/login">
// 		<Avatar src={userIconWhite} />
// 	</Link>
// 	)}
// </Grid>
