import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import withLayout from '../lib/withLayout';
import Screen10 from '../static/img/screen10.jpg'
import Screen11 from '../static/img/screen11.png'
import { Link } from '../server/routes/next-routes';
import Carousel from '../components/dataDisplay/others/carousel';
import { NextSeo } from 'next-seo';
import Preregister from '../components/features/pre-register'
import { IphoneComp } from '../components/dataDisplay/others/device';

const styles = {
	cardContainer: {
		padding: '5rem 0',
		// marginBottom: '3rem'
	},
	padding: {
		padding: '1rem 2rem',
	},
	p: {
		padding: '1rem 0rem'
	},
	button: {
		padding: '.8rem 3rem'
	},
	testimonialContainer: {
		position: 'relative'
	},
	testimonial: {
		position: 'absolute',
		backgroundColor: 'rgba(99, 99, 99, 0.33)',
		color: 'white',
		width: '100%',
		padding: '1rem',
		margin: 0,
		bottom: 0
	},
	testimonialTitle: {
		fontSize: '2rem'
	},
	carouselImg: {
		width: '100%'
	}
}

const Connect = () => (
	<div className='center-text auto connect'>
		<Link href='/login'><a title='Inscrivez-vous' className='red-btn' style={styles.button}>Inscrivez-vous</a></Link>
		<div>ou <Link href='/login'><a title='connectez-vous' className='bold'>connectez-vous</a></Link></div>
	</div>
)
const Index = () => {
	return (
		<div id='influenceurs'>
			<NextSeo
				title="Bolt Influence Influenceurs"
				description="Une plateforme de marketing d'influence authentique offrant de nouveaux partenariats rémunérés avec des marques. Vous êtes un influenceur, venez dévoiler tout votre talent au sein de la plateforme Bolt Influence."
			/>
			<div className='card-bg dots-pink no-repeat responsive-bg-opacity reverse left'>
				<div className='home-block-padding responsive-container' style={styles.padding}>
					<h1 className='text-center'><span className='half-width-bordered-head'>Trouvez et postulez</span> à de nombreuses campagnes</h1>
					<Grid container item style={styles.cardContainer} justify="center" alignItems="center" alignContent="center" className='responsive-no-padding'>
						<Grid item container xs={12} sm={6} justify="center" alignItems="center" alignContent="center">
							<Grid item xs={12} sm={8}>
								<p className='justify' style={styles.p}>Découvrez l’ensemble de notre offre de campagnes rémunérées et commencez à postuler dès aujourd’hui.</p>
								<Connect />
							</Grid>
						</Grid>
						<Grid item xs={12} sm={6} className='text-center'>
							<IphoneComp deviceColor='white' src="../static/video/discover_our_offers.mp4" />
						</Grid>
					</Grid>
				</div>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.cardContainer} className='dots-blue-down no-repeat responsive-reverse-order responsive-container light-gray-bg'>
					<Grid item xs={12} sm={6} className='text-center'>
						<IphoneComp deviceColor='white' src="../static/video/well_paid.mp4" />
					</Grid>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item container xs={12} sm={8} justify="center" alignItems="center">
							<h2 className='responsive-no-margin-bottom'>Soyez payé à <span className='half-width-bordered-head'>votre juste</span> valeur</h2>
							<p className='justify'>Les rémunérations des campagnes sont calculées au regard de vos statistiques et sont réévaluées en fonction de la croissance de votre audience.</p>
						</Grid>
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div className='home-block-padding' style={styles.padding} className='card-bg dot-pink reverse no-repeat responsive-container'>
				<Grid container item style={styles.cardContainer} className='responsive-no-padding'>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item xs={12} sm={8}>
							<h2>Devenez un <span className='half-width-bordered-head'>professionnel</span> du Marketing d’influence</h2>
							<p className='justify'>Chez Bolt Influence, vous avez un contact à votre écoute et qui vous accompagne dans la professionnalisation de votre activité.</p>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6} className='text-center'>
						<IphoneComp deviceColor='white' src="../static/video/become_pro_influencer.mp4" />
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div>
				<Grid container item alignContent='center' alignItems='center'>
					<Connect />

					{/* <div className='center-text auto connect'>
						<Link href='#'><a className='red-btn' style={styles.button}>Inscrivez-vous</a></Link>
						<div>ou <Link href='#'><a title='connectez-vous' className='bold'>connectez-vous</a></Link></div>
					</div> */}
				</Grid>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.cardContainer}>
					<div className='lines-black no-repeat right card-bg responsive-bg-opacity fullwidth'>

						<h2 style={styles.testimonialTitle}>Témoignages</h2>

						<Carousel>
							<div style={styles.testimonialContainer}>
								<div style={styles.testimonialContainer}>
									<img src={Screen10} style={styles.carouselImg} />
									<h3 style={styles.testimonial}>Loremp impsum Phrase deux</h3>
								</div>
							</div>
							<div style={styles.testimonialContainer}>
								<div style={styles.testimonialContainer}>
									<img src={Screen11} style={styles.carouselImg} />
									<h3 style={styles.testimonial}>Loremp impsum Phrase deux</h3>
								</div>
							</div>
							<div style={styles.testimonialContainer}>
								<div style={styles.testimonialContainer}>
									<img src={Screen10} style={styles.carouselImg} />
									<h3 style={styles.testimonial}>Loremp impsum Phrase deux</h3>
								</div>
							</div>
							<div style={styles.testimonialContainer}>
								<div style={styles.testimonialContainer}>
									<img src={Screen11} style={styles.carouselImg} />
									<h3 style={styles.testimonial}>Loremp impsum Phrase deux</h3>
								</div>
							</div>

						</Carousel>
					</div>
				</Grid>
			</div>
			<Preregister />
			<style jsx>{`
				@media all and (max-width : 400px) {
					.text-center {
						font-size: 2rem;
						padding: 0;
					}
					h3 {
						font-size: 1rem;
					}
				}
			`}</style>
		</div>
	)
}


export default withLayout(Index);
