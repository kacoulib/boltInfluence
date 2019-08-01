import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import logo from '../../static/img/logo.png';
import Socials from '../../components/elements/socials'

// style={{border: '1px solid red'}}


const Footer = () => (
	<footer id='footer' className='dot-white'>
		<Grid container alignItems="center" justify="center" align='center'>
			<Grid item sm={12}>
				<img src={logo} />
			</Grid>
			<Grid item sm={4}>
				<ul>
					<li><Link href="/about"><a >Mon profil</a></Link></li>
					<li><Link href="/about"><a >À propos</a></Link></li>
					<li><Link href="/about">Les campagnes</Link></li>
				</ul>
			</Grid>
			<Grid item sm={4}>
				<ul>
					<li><Link href="/about"><a >À découvrir</a></Link></li>
					<li><Link href="/about"><a >Programmez vos posts</a></Link></li>
				</ul>
			</Grid>
			<Grid item sm={4}>
				<ul>
					<li><Link href="/about"><a >Suivez noous</a></Link></li>
					<li>
						<Socials />
					</li>

				</ul>
			</Grid>
		</Grid>


	</footer>
);

export default Footer;
