import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Link } from '../../server/routes/next-routes'
import { styleToolbarLink } from '../SharedStyles';
import styles from '../SharedStyles';
import logo from '../../static/img/logo.png'
import userIconWhite from '../../static/img/userIconWhite.js';

import iconFlagFr from '../../static/img/flagFr.png';
import mailIcon from '../../static/img/icon/mail.png';
import Socials from '../elements/socials'

const menuList = [
	{
		title: 'Annonceurs', text: "Annonceurs", href: '/annonceurs', child: [
			{ title: 'Agence/Marque', text: "Agence/Marque", href: '/annonceurs', },
			// { title: 'Agence', text: "Agence", href: '/annonceurs/agence', },
			{ title: 'Tarifs', text: "Tarifs", href: '/annonceurs/tarifs', },
		]
	},
	{ title: 'Influenceurs', text: "Influenceurs", href: '/influenceurs' },
	{ title: "La vidéo d'influence", text: "La vidéo d'influence", href: '/video-influenceurs' },
	{
		title: 'Notre approche', text: "Notre approche", href: '/notre-approche',
		child: [
			{ title: 'Méthode', text: "Méthode", href: '/notre-approche/methode' },
			{ title: 'Blog', text: "Blog", href: '/notre-approche/blog', },
		]
	},
	{
		title: 'Contactez-nous', text: "Contactez-nous", href: '/contact',
		// child: [
		// 	{ title: 'A propos', text: "A propos", href: '/contact/apropos', },
		// 	// { title: 'Carriere', text: "Carriere", href: 'contact/carriere', },
		// 	// { title: 'FAQ', text: "FAQ", href: 'contact/faq', },
		// ]
	},
]
const displayMenuList = (list, i) => (
	list.map((elem) => (
		<li key={++i} className={`${elem.child ? 'sub-menu-wrapper' : ''}`}>
			{elem.child ?
				<div className='to-hide menu-link' title={elem.title}><span className='relative'>{elem.text}<span className='triangle down'></span></span></div>
				:
				<Link href={elem.href}><a title={elem.title}><span className='relative'>{elem.text}</span></a></Link>
			}
			{elem.child && <>
				<label htmlFor={`drop-${i}`} className="toggle-head menu-link"><span className='relative'>{elem.text}<span className='triangle down'></span></span></label>
				<input type="checkbox" id={`drop-${i}`} />
				<ul className="nav-dropdown">
					{displayMenuList(elem.child, i)}
				</ul>
			</>
			}
		</li>
	))
)

const Header = () => (
	<header id='header'>
		<Grid container alignItems="center" justify="center">
			<Grid container item sm={12} xs={12} direction="row" alignItems="center" justify="center" className='social-container-parent'>
				<Grid item sm={6} xs={6}>
					<div className='social-container pointer'><a href="mailto:contact@bolt-influence.com" title='Send mail'><img src={mailIcon} style={styles.iconFlagFr} alt='Send mail' /></a></div>
				</Grid>
				<Grid item style={styleToolbarLink} sm={6} xs={6}>
					<div className='social-container'><Socials   /*child={styles.socialList} */ /></div>
					<div className='social-container pointer'><img src={iconFlagFr} style={styles.iconFlagFr} className='responsive-hide' alt='choose language' /></div>
				</Grid>
			</Grid>
			<Grid container item sm={12} xs={12} alignItems="center" justify="center" id='menu-container'>
				<Grid item align="center" sm={1} xs={3} id='menu-left'>
					<Link href='/'><a title='home BoltInfluence'><img src={logo} id='logo' alt='Bolt influence logo' /></a></Link>
				</Grid>
				<Grid item align="center" sm={10} xs={6}>
					<Grid container alignItems="center">
						<nav>
							<label htmlFor="drop" className="toggle-head">☰</label>
							<input type="checkbox" id="drop" />
							<ul className="menu">
								{displayMenuList(menuList, 0)}
							</ul>
						</nav>
					</Grid>
				</Grid>
				<Grid item sm={1} xs={3} id='menu-right'>
					<div className="sonar-wrapper">
						<Link href='/login'><a title='login' className='sonar-emitter'>
							connexion
    								<div className="sonar-wave"></div>
							{/* <Avatar style={styles.avatar} src={userIconWhite} /> */}
						</a></Link>
					</div>
				</Grid>
			</Grid>
		</Grid>
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
