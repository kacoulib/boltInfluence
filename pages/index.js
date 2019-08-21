import React, { useState } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import withLayout from '../lib/withLayout';
import Screen01 from '../static/img/screen01.png'
import Screen02 from '../static/img/screen02.png'
import Screen03 from '../static/img/screen03.png'
import ScreenHome from '../static/img/home.jpg'
import Carousel from '../components/dataDisplay/others/carousel';
import ContactUs from '../components/page/public/contactUs'
import Btn from '../components/elements/btn'
import { NextSeo } from 'next-seo';
import { orangeColor } from '../utils/variables/css'

const styles = {
	cardContainer: {
		padding: '5rem 0',
	},
	marginBottom: {
		marginBottom: '3rem'
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
		margin: '4rem 0 0'
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
		fontSize: '2rem',
		marginBottom: '2rem'
	},
	carouselImg: {
		width: '100%'
	},
	hover: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%'
	},
	carousel: {
		padding: '2rem 0 3.5rem'
	}
}


const Index = () => {
	const onSubmit = () => console.log('submit')

	return (
		<div id="home">
			<NextSeo
				title="Bolt Influence"
				description="Bolt Influence est la plateforme/agence de marketing d’influence référente qui permet de connecter les marques et les influenceurs sur Instagram, Tik Tok, Youtube, Twitch"
			/>
			<div style={styles.marginBottom}>
				<Grid container item className='relative' id='home-cover'>
					{/* <img src={ScreenHome} className='fullwidth' /> */}
					<Grid item container xs={12} sm={6} justify="center" alignItems="center" style={styles.hover}>
						<Grid item xs={12} sm={12} className='text-center' id='homeTextContainer'>
							<h1 className='white-color'>Tirez le meilleur de l’influence marketing grâce à la vidéo</h1>
							<Btn text="Démarrez" href='#contact-us' style={{ fontWeight: 'bold', backgroundColor: orangeColor, padding: '.5rem 1rem', fontSize: '1.1rem' }} />
						</Grid>
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div className='text-center'>
				<div style={styles.padding}>
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
				<Grid container item style={styles.cardContainer} className='light-gray-bg' >
					<Grid item container xs={12} sm={6} justify="center" alignItems="center" >
						<Grid item xs={12} sm={8} className='text-center'>
							<h2><span className='black-bordered-head'>Data</span> et Technologie</h2>
							<div>
								<p className='no-margin'>Search infleunceurs</p>
								<p className='no-margin'>Prévention de la fraude</p>
								<p className='no-margin'>Affinité infleunceurs/marque</p>
								<p className='no-margin'>Audience et analytics</p>
							</div>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6} className='text-center' style={styles.padding}>
						<img src={Screen02} />
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div style={styles.padding} className='card-bg circle-pink bottom text-center'>
				{/* <h1 className='red-color'>Le format In-vidéo</h1> */}
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
			{/* <div>
				<Grid container item style={styles.cardContainer}>
					<div className='light-gray-bg lines-black flip right card-bg fullwidth text-center' style={styles.carousel}>

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
			</div> */}
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
			<style jsx>{`
				h1 {
					font-size: 3rem;
					line-height: 4rem;
				}
				p {
					font-size: 1.4rem;
				}
				h2 {
					margin-top: 0;
				}
			`}</style>
		</div>
	)
}


export default withLayout(Index);
