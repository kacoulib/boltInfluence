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
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	avatar: {
		margin: 10,
		height: 26,
		width: 26,
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
				<Grid container alignItems="center" style={{height: '140px', border: '1px solid red'}}>
					<Grid item align="center" sm={2} style={{border: '1px solid red'}}>
						<img src={logo} />
					</Grid>
					<Grid item align="center" sm={10} style={{border: '1px solid red'}}>
						<Grid container alignItems="center" justify="center">
							<Grid item sm={1} xs={2}>
								<Avatar className={classes.avatar} src={userIconWhite} />
							</Grid>
						</Grid>
						<Grid container alignItems="center">
							<Grid item style={styleToolbarLink} sm={2} xs={2}>
								Annonceurs
							</Grid>
							<Grid style={styleToolbarLink} item sm={2} xs={2}>
								Influenceurs
							</Grid>
							<Grid style={styleToolbarLink} item sm={2} xs={2}>
								La vidéo d'influence
							</Grid>
							<Grid style={styleToolbarLink} item sm={2} xs={2}>
								Notre méthode
							</Grid>
							<Grid style={styleToolbarLink} item sm={2} xs={2}>
								Contactez-nous
							</Grid>
							<Grid item sm={1} xs={2}>
								<Avatar className={classes.avatar} src={userIconWhite} />
							</Grid>
						</Grid>

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

// <Grid container align="center"  style={{height: '60px'}}>
// 	<Grid item align="center" style={styleToolbarLink} sm={1} xs={2}>
// 		Annonceurs
// 	</Grid>
// </Grid>



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
