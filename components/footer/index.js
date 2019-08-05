import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import logo from '../../static/img/logo.png';
import Socials from '../../components/elements/socials'

// style={{border: '1px solid red'}}


const Footer = () => (
	<footer id='footer' className='card-bg dots-white bottom'>
		<Grid container alignItems="center" justify="center" align='center'>
			<Grid item sm={12} xs={12}>
				<Link href='/'><a title='home logo'><img src={logo} /></a></Link>
			</Grid>
			<Grid item sm={4} xs={6}>
				<ul>
					<li><Link href='/annonceurs'><a title='Annonceurs'>Annonceurs</a></Link></li>
					<li><Link href='/influenceurs'><a title='Influenceurs'>Influenceurs</a></Link></li>
					<li><Link href="/about">La vidéo d'influence</Link></li>
				</ul>
			</Grid>
			<Grid item sm={4} xs={6}>
				<ul>
					<li><Link href="/about"><a title='Notre méthode'>Notre méthode</a></Link></li>
					<li><Link href="/contact"><a title='contact'>Contactez-nous</a></Link></li>
				</ul>
			</Grid>
			<Grid item sm={4} xs={12}>
				<ul>
					<li><Link href="/about"><a title='Suivez noous'>Suivez nous</a></Link></li>
					<li>
						<Socials />
					</li>

				</ul>
			</Grid>
		</Grid>


	</footer>
);

export default Footer;
