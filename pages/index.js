import React, { useState } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import withLayout from '../lib/withLayout';
import Screen01 from '../static/img/screen01.png'
import Screen02 from '../static/img/screen02.png'
import Screen03 from '../static/img/screen03.png'
import Carousel from '../components/dataDisplay/others/carousel';
import ContactUs from '../components/page/public/contactUs'

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
	partnersTitle: {
		padding: '0 0 1rem'
	},
	contactUsContainer: {
		paddingTop: '0rem'
	},
	contactUs: {
		backgroundColor: '#D8D8D8',
		color: 'white'
	},
	h3: {
		fontSize: '1.5rem',
		marginBottom: '3rem'
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


const Index = () => {
	const onSubmit = () => console.log('submit')

	return (
		<div>
			<div className='text-center'>
				<div className='home-block-padding' style={styles.padding}>
					<h2 className='text-center'>Comment rendons-nous l’influence marketing scalable ?</h2>
					<Grid container item style={styles.cardContainer}>
						<Grid item xs={12} sm={6}>
							<img src={Screen01} />
						</Grid>
						<Grid item container xs={12} sm={6} justify="center" alignItems="center">
							<Grid item xs={12} sm={8}>
								<h2>Stratégie de <span className='black-bordered-head'>contenu</span></h2>
								<div>
									<p className='no-margin'>Lignes éditoriales</p>
									<p className='no-margin'>Stratégie de plateforme</p>
									<p className='no-margin'>Production</p>
									<p className='no-margin'>Edition</p>
								</div>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</div>
			{/*  */}
			<div className='text-center'>
				<Grid container item style={styles.cardContainer} className='light-gray-bg'>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item container xs={12} sm={8} className='text-center'>
							<h2><span className='black-bordered-head'>Data</span> et Technologie</h2>
							<div>
								<p className='no-margin'>Search infleunceurs</p>
								<p className='no-margin'>Prévention de la fraude</p>
								<p className='no-margin'>Affinité infleunceurs/marque</p>
								<p className='no-margin'>Audience et analytics</p>
							</div>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6} className='text-center'>
						<img src={Screen02} />
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div className='home-block-padding' style={styles.padding} className='card-bg dot-pink reverse no-repeat text-center'>
				<h1 className='red-color'>Le format In-vidéo</h1>
				<Grid container item style={styles.cardContainer}>
					<Grid item xs={12} sm={6}>
						<img src={Screen03} />
					</Grid>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item xs={12} sm={8}>
							<h2>Managment et <span className='black-bordered-head'>optimization</span></h2>
							<p className='no-margin'>Relation influenceurs</p>
							<p className='no-margin'>Account managment</p>
							<p className='no-margin'>Qualité de service</p>
							<p className='no-margin'>Logistique</p>
						</Grid>
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.cardContainer}>
					<div className='lines-black no-repeat right card-bg fullwidth text-center'>

						<h2 style={styles.testimonialTitle}><span className='full-bordered-head'>Client</span></h2>

						<Carousel>
							<div style={styles.testimonialContainer}>
								<div style={styles.testimonialContainer}>
									<img src={Screen01} style={styles.carouselImg} />
									<h3 style={styles.testimonial}>Loremp impsum Phrase deux</h3>
								</div>
							</div>
							<div style={styles.testimonialContainer}>
								<div style={styles.testimonialContainer}>
									<img src={Screen02} style={styles.carouselImg} />
									<h3 style={styles.testimonial}>Loremp impsum Phrase deux</h3>
								</div>
							</div>
							<div style={styles.testimonialContainer}>
								<div style={styles.testimonialContainer}>
									<img src={Screen01} style={styles.carouselImg} />
									<h3 style={styles.testimonial}>Loremp impsum Phrase deux</h3>
								</div>
							</div>
							<div style={styles.testimonialContainer}>
								<div style={styles.testimonialContainer}>
									<img src={Screen02} style={styles.carouselImg} />
									<h3 style={styles.testimonial}>Loremp impsum Phrase deux</h3>
								</div>
							</div>

						</Carousel>
					</div>
				</Grid>
			</div>
			{/*  */}
			<div style={styles.contactUsContainer} className='text-center'>
				<Grid container >
					<Grid item xs={12} sm={2}></Grid>
					<Grid item xs={12} sm={8}>
						<ContactUs onSubmit={onSubmit}>
							<h3 style={styles.h3}>Marketer intéressé ?  contactez-nous</h3>
						</ContactUs>
					</Grid>
					<Grid item xs={12} sm={2}></Grid>
				</Grid>
			</div>
		</div>
	)
}


export default withLayout(Index);
