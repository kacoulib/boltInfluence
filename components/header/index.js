import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

// import Button from '@material-ui/core/Button';
import { styleToolbar, styleToolbarLink, greenBorder, redBorder } from '../SharedStyles';
import styles from '../SharedStyles';
import logo from '../../static/img/logo.png'
import userIconWhite from '../../static/img/userIconWhite.js';

import iconFlagFr from '../../static/img/flagFr.png';
import Socials from '../elements/socials'

const menuList = [
	{
		title: 'Annonceurs', text: "Annonceurs", href: '#Annonceurs', child: [
			{ title: 'Marque', text: "Marque", href: '#marques', },
			{ title: 'Agence', text: "Agence", href: '#agence', },
		]
	},
	{ title: 'Influenceurs', text: "Influenceurs", href: '#Influenceurs' },
	{ title: "La vidéo d'influence", text: "La vidéo d'influence", href: '#influencers' },
	{
		title: 'Notre méthode', text: "Notre méthode", href: '#method', child: [
			{ title: 'Blog', text: "Blog", href: '#blog', },
		]
	},
	{
		title: 'Contactez-nous', text: "Contactez-nous", href: '#contact', child: [
			{ title: 'A propos', text: "A propos", href: '#apropos', },
			{ title: 'Notre méthode', text: "Notre méthode", href: '#method', },
			{ title: 'Carriere', text: "Carriere", href: '#carriere', },
			{ title: 'FAQ', text: "FAQ", href: '#faq', },
		]
	},
]

const displayMenuList = (list, i) => (
	list.map((elem, index) => (
		<li key={++i}>
			<Link href={elem.href}><a title={elem.title}>{elem.text}</a></Link>
			{elem.child && <>
				<label for={`drop-${i}`} class="toggle">{elem.text} +</label>
				<input type="checkbox" id={`drop-${i}`} />
				<ul class="nav-dropdown">
					{displayMenuList(elem.child)}
				</ul>
			</>
			}
		</li>
	))
)

const Header = ({ user }) => (
	<header id='header'>
		<Toolbar>
			<Grid container alignItems="center" justify="center">
				<Grid container item sm={12} xs={12} alignItems="center" justify="center">
					<img src={iconFlagFr} style={styles.iconFlagFr} />
				</Grid>
				<Grid container item sm={12} xs={12} alignItems="center" justify="center">
					<Grid item align="center" sm={1} xs={12}>
						<Link href='/'><a title='home logo'><img src={logo} /></a></Link>
					</Grid>
					<Grid item align="center" sm={10}>
						<Grid container alignItems="center">
							<nav>
								<label for="drop" class="toggle">☰</label>
								<input type="checkbox" id="drop" />
								<ul class="menu">
									{displayMenuList(menuList, 0)}
								</ul>
							</nav>

						</Grid>
					</Grid>
					<Grid item style={{ padding: '10px', textAlign: 'right' }} sm={1} xs={12}>
						<Avatar style={styles.avatar} src={userIconWhite} />
					</Grid>
				</Grid>
				<Grid container item sm={12} xs={12} direction="row" alignItems="center" justify="center">
					<Grid item style={styleToolbarLink} sm={12} xs={12}>
						<Socials fill='white' /* parent={styles.socialListContainer} child={styles.socialList} */ />
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
