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
import { styleToolbar, styleToolbarLink, greenBorder, redBorder } from '../SharedStyles';
import styles from '../SharedStyles';
import logo from '../../static/img/logo.png'
import userIconWhite from '../../static/img/userIconWhite.js';

import iconTwitter from '../../static/img/icon/TwitterWhite.png';
import iconFlagFr from '../../static/img/flagFr.png';

import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';

const Header = ({ user }) => (
	<header>
		<Toolbar>
			<Grid container alignItems="center" justify="center">
				<Grid container item sm={12} xs={12} alignItems="center" justify="center">
					<img src={iconFlagFr} style={styles.iconFlagFr} />
				</Grid>
				<Grid container item sm={12} xs={12} alignItems="center" justify="center">
					<Grid item align="center" sm={1} xs={12}>
						<img src={logo} />
					</Grid>
					<Grid item align="center" sm={10}>
						<Grid container alignItems="center">
							<Grid item sm={1} xs={12}></Grid>
							<Grid item sm={2} xs={12}>
								<Link href='/annonceurs'>
									<a title='Annonceurs'>Annonceurs</a>
								</Link>
							</Grid>
							<Grid item sm={2} xs={12}><Link href='/influenceurs'><a>Influenceurs</a></Link></Grid>
							<Grid item sm={2} xs={12}><Link href='/'><a>La vidéo d'influence</a></Link></Grid>
							<Grid item sm={2} xs={12}><Link href='/'><a>Notre méthode</a></Link></Grid>
							<Grid item sm={2} xs={12}><Link href='/'><a>Contactez-nous</a></Link></Grid>
							<Grid item sm={1} xs={12}></Grid>

						</Grid>
					</Grid>
					<Grid item style={{ padding: '10px', textAlign: 'right' }} sm={1} xs={12}>
						<Avatar style={styles.avatar} src={userIconWhite} />
					</Grid>
				</Grid>
				<Grid container item sm={12} xs={12} direction="row" alignItems="center" justify="center">
					<Grid item style={styleToolbarLink} sm={12} xs={12}>
						<img src={iconTwitter} style={styles.styleIconeSocial} />
						<img src={iconTwitter} style={styles.styleIconeSocial} />
						<img src={iconTwitter} style={styles.styleIconeSocial} />
						<img src={iconTwitter} style={styles.styleIconeSocial} />
					</Grid>
				</Grid>
			</Grid>
		</Toolbar>

	</header>
)

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
