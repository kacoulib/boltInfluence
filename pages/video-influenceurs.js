import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import Grid from '@material-ui/core/Grid';
import withLayout from '../lib/withLayout';
import Screen5 from '../static/img/screen5.png'
import Screen6 from '../static/img/screen6.png'
import Partners from '../components/page/public/partners'
import ContactUs from '../components/page/public/contactUs'
import { customRequest } from '../lib/api/http/'
import Video from '../components/elements/video'
import { TabletComp } from '../components/dataDisplay/others/device';


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
		paddingTop: '3rem'
	},
	contactUs: {
		backgroundColor: '#D8D8D8',
		color: 'white'
	},
}


const Index = () => {
	const onSubmit = () => console.log('submit')

	return (
		<div id='video-influenceurs'>
			<NextSeo
				title="Bolt Influence video influence"
				description="Le format in-video est un placement de produits innovant pour les campagnes de marketing d’influencue de la marque. mesure et impactant, il offre un espace inedit au sein même des contenus des influenceurs."
			/>
			<div className='card-bg lines-blue no-repeat responsive-bg-opacity right'>
				<div className='home-block-padding responsive-container' style={styles.padding}>
					<h1 className='text-center red-color'>La vidéo un média d’avenir</h1>
					<Grid container item style={styles.cardContainer} justify="center" alignItems="center" >
						<Grid item container xs={12} sm={6} justify="center" alignItems="center">
							<Grid item xs={12} sm={8}>
								<h2><span className='bordered-head'>Un média</span>  en pleine croissance</h2>
								<p className='justify'>87% des marketeurs reconnaissent faire appel à la vidéo sur les réseaux sociaux* (contre seulement 63% en 2017).</p>
								<p className='italic tiny-text'>*Etude : the state of Video Marketing 2019 - Wyzowl</p>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={6} justify="center" alignItems="center" className='text-center'>
							{/* <Video src="../static/video/engaging_media.mp4" /> */}
							<TabletComp src="../static/video/engaging_media.mp4" />
						</Grid>
					</Grid>
				</div>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.cardContainer} className='dots-blue-down no-repeat responsive-reverse-order responsive-no-padding'>
					<Grid item xs={12} sm={6} className='text-center responsive-container'>
						<img src={Screen6} />
					</Grid>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item container xs={12} sm={8} className='responsive-container'>
							<h2><span className='bordered-head'>Un média</span> engageant</h2>
							<p className='justify'>Les vidéos rencontrent 36% d’engagement de plus que les photos sur Instagram et reçoivent en moyenne 2,1x de commentaires en plus.</p>
							<p className='italic tiny-text'>*Etude : 17 instagram stats marketer needs to know in 2019 - Sprout Social.</p>
						</Grid>
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div className='home-block-padding' style={styles.padding} className='card-bg dot-pink reverse no-repeat responsive-container'>
				<h2 className='text-center red-color'>Le format In-vidéo</h2>
				<Grid container item style={styles.cardContainer} className='responsive-no-padding'>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item xs={12} sm={8}>
							<h2>Intégrez vos produits sur tous les <span className='bordered-head'>types</span>  de contenu vidéo</h2>
							<p className='justify'>Le format In-vidéo est flexible et s’intègre simplement sur tous les types de contenu vidéos et dans tous les formats.</p>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6} className='text-center'>
						<img src={Screen5} />
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div className='light-gray-bg'>
				<Grid container item style={styles.cardContainer} className='card-bg lines-blue responsive-bg-opacity reverse-all right no-repeat responsive-reverse-order responsive-no-padding'>
					<Grid item xs={12} sm={6} className='text-center responsive-container'>
						<img src={Screen6} />
					</Grid>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item container xs={12} sm={8} className='responsive-container'>
							<h2><span className='bordered-head'>Intégrez </span>un format non-intrusif</h2>
							<p className='justify'>Une étude menée auprès de 4500 personnes a montré que 80% d’entre eux trouvent que ce format offre une bonne visibilité et 70% trouvent que ce mode de publicité est moins intrusif que les pré-roll.</p>
						</Grid>
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div style={styles.contactUsContainer} className='responsive-no-padding'>
				<Grid container >
					<Grid item xs={12} sm={2} className='text-center'></Grid>
					<Grid item xs={12} sm={8} className='text-center'>
						<ContactUs onSubmit={onSubmit} />
					</Grid>
					<Grid item xs={12} sm={2} className='text-center'></Grid>
				</Grid>
			</div>
			{/*  */}
			<div>
				<Partners />
			</div>
			<style jsx>{`
				h1 {
					margin-top: 3rem;
				}
				h2 {
					font-size: 2.5rem;
				}
				@media all and (max-width : 400px) {
					h2 {
						font-size: 2rem;
					}
				}
			`}</style>
		</div>
	)
}



export default withLayout(Index);
