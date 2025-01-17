import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import logo from '../../static/img/logo.png';
import Socials from '../../components/elements/socials'

const Footer = () => (
	<footer id='footer' className='card-bg dots-white bottom'>
		<Grid container alignItems="center" justify="center" align='center'>
			<Grid container item alignItems="center">
				<Grid item sm={4} xs={6}>
					<ul>
						<li><Link href='/annonceurs'><a title='Annonceurs'>Annonceurs</a></Link></li>
						<li><Link href='/influenceurs'><a title='Influenceurs'>Influenceurs</a></Link></li>
						<li><Link href="/video-influenceurs"><a title="La vidéo d'influence">La vidéo d'influence</a></Link></li>
					</ul>
				</Grid>
				<Grid item sm={4} xs={6}>
					<ul>
						<li><Link href="/notre-approche/notre-methode"><a title='Notre méthode'>Notre méthode</a></Link></li>
						<li><Link href="/contact"><a title='contact'>Contactez-nous</a></Link></li>
					</ul>
				</Grid>
				<Grid item sm={4} xs={12}>
					<ul id='follow-us'>
						<li><Link href='/'><a title='home logo'><img src={logo} alt='Bolt influence logo' /></a></Link></li>
						<li>Suivez nous</li>
						<li><Socials /></li>
					</ul>
				</Grid>
			</Grid>
		</Grid>
	</footer>
);

export default Footer;
