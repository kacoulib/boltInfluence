import React, { useState } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import withLayout from '../lib/withLayout';
import Screen7 from '../static/img/screen7.png'
import Screen8 from '../static/img/screen8.png'
import Screen9 from '../static/img/screen9.png'
import Screen10 from '../static/img/screen10.jpg'
import Screen11 from '../static/img/screen11.png'
import { Link } from '@material-ui/core';
import Carousel from '../components/dataDisplay/others/carousel';
import { darkBlueColor, darkOrangeColor, lightGray } from '../utils/variables/css'

const styles = {
	cardContainer: {
		padding: '5rem 0',
		// marginBottom: '3rem'
	},
	padding: {
		padding: '1rem 2rem',
	},
	p: {
		padding: '0 1rem'
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
	},
	sliderContainer: {
		padding: '0 3rem'
	}
}


const Index = () => {
	const onSubmit = () => console.log('submit')

	return (
		<div>
			<div className='card-bg dots-pink no-repeat reverse left'>
				<div className='home-block-padding' style={styles.padding}>
					<h1 className='text-center'><span className='bordered-head'>Trouvez et postulez</span> à de nombreuses campagnes</h1>
					<Grid container item style={styles.cardContainer}>
						<Grid item container xs={12} sm={6} justify="center" alignItems="center">
							<Grid item xs={12} sm={8}>
								<p className='justify' style={styles.p}>Découvrez l’ensemble de notre offre de campagnes rémunérées et commencez à postuler dès aujourd’hui.</p>
								<div className='center-text'>
									<Link ><a className='red-btn' style={styles.button}>Inscrivez-vous</a></Link>
									<div>ou <Link ><a>connectez-vous</a></Link></div>
								</div>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={6}>
							<img src={Screen7} />
						</Grid>
					</Grid>
				</div>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.cardContainer} className='dots-blue-down no-repeat'>
					<Grid item xs={12} sm={6} className='text-center'>
						<img src={Screen8} />
					</Grid>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item container xs={12} sm={8} justify="center" alignItems="center">
							<h2>Soyez payé à <span className='bordered-head'>votre juste</span> valeur</h2>
							<p className='justify'>Les rémunérations des campagnes sont calculées au regard de vos statistiques et sont réévalués en fonction de la croissance de votre audience.</p>
						</Grid>
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div className='home-block-padding' style={styles.padding} className='card-bg dot-pink reverse no-repeat'>
				<Grid container item style={styles.cardContainer}>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item xs={12} sm={8}>
							<p className='justify' style={styles.p}>Devenez <span className='bordered-head'>un professionnel</span> du Marketing d’influence</p>
							<p className='justify'>Chez Bolt Influence, vous avez un contact à votre écoute et qui vous accompagne dans la professionnalisation de votre activité.</p>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6}>
						<img src={Screen9} />
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div>
				<Grid container item alignContent='center' alignItems='center'>
					<div className='center-text auto'>
						<Link ><a className='red-btn' style={styles.button}>Inscrivez-vous</a></Link>
						<div>ou <Link ><a>connectez-vous</a></Link></div>
					</div>
				</Grid>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.cardContainer}>
					<div className='lines-black no-repeat right card-bg fullwidth' style={styles.sliderContainer}>

						<h2 style={styles.testimonialTitle}>Testimonials</h2>

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
		</div>
	)
}


export default withLayout(Index);
