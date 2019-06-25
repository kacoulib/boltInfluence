import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import styles from '../SharedStyles';


import logo from '../../static/img/logoGrey.png';



// style={{border: '1px solid red'}}


function Footer({ user }) {

	return (
		<div>
			<Grid container style={styles.footer} alignItems="center" justify="center">
				<Grid item sm={12}  align="center">
					<img src={logo} />
				</Grid>
				<Grid item sm={3}  align="center">
					<div><Link style={styles.footerLink}>Mon profil</Link></div>
					<div><Link>À propos</Link></div>
					<div><Link>Les campagnes</Link></div>
				</Grid>
				<Grid item sm={3}  align="center">
					<div><Link>À découvrir</Link></div>
					<div><Link>Programmez vos posts</Link></div>
				</Grid>
				<Grid item sm={3}  align="center">
					<div><Link>Hey</Link></div>
					<div><Link>Pouet</Link></div>
				</Grid>
			</Grid>


		</div>
	);
}

export default Footer;
