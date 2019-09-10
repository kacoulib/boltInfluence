import React, { useState } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import withLayout from '../../lib/withLayout';
import Screen5 from '../../static/img/screen5.png'
import Screen6 from '../../static/img/screen6.png'
import Partners from '../../components/page/public/partners'
import ContactUs from '../../components/page/public/contactUs'
import { IphoneComp } from '../../components/dataDisplay/others/device';

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
		<div>
			<div className='card-bg lines-blue no-repeat right responsive-container'>
				<div>
					<Grid container item style={styles.cardContainer} justify="center" alignItems="center" className='responsive-no-padding'>
						<Grid item container xs={12} sm={8} justify="center" alignItems="center">
							<Grid container item xs={12} sm={12}>
								<Grid container item xs={12} sm={12}>
									<h1 className='red-color'>La méthode de Bolt Influence</h1>
									<p className='justify'>La création de contenu et le story telling est au centre de ce que nous produisons. Nos experts dans le domaine supportent les marques afin de créer des campagnes impactantes sur tous les réseaux sociaux.</p>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className='card-spacing'>
										<h2 className='responsive-align-left'><span className='bordered-head'>Stratégie de contenu :</span></h2>
										<p>La création de contenu et le storytelling est au centre de ce que nous produisons. Nos experts dans le domaine supportent les marques afin de créer des campagnes impactantes sur tous les réseaux sociaux.</p>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className='card-spacing'>
										<h2 className='responsive-align-left'><span className='bordered-head'>Identification des influenceurs :</span></h2>
										<p>Notre plateforme donne accès à des centaines de milliers d’influenceurs sur Instagram, Youtube, TikTok, Twitch, Twitter, Pinterest, Blog dans tous les domaines.</p>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className='card-spacing'>
										<h2 className='responsive-align-left'><span className='bordered-head'>Accompagnement des influenceurs et campaign management :</span></h2>
										<p>Une fois les influenceurs validés, nous mettons notre expertise au profit des annonceurs en agrégeant ces influenceurs au sein de différents packs thématiques : santé, beauté/lifestyle, sport, e-sport, décoration, voyages, entertainment, food, grande conso.</p>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className='card-spacing'>
										<h2 className='responsive-align-left'><span className='bordered-head'>Reporting et campaign management :</span></h2>
										<p>Toutes les campagnes lancées ont un objectif spécifique : nous mesurons tous les KPI's de manière transparente. Nous travaillons étroitement avec nos clients et pouvons leur fournir les résultats détaillés des retombées de leur campagne dès que celle-ci est terminée.</p>
									</div>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={4} className='text-center'>
							<IphoneComp deviceColor='white-trending' src="../../static/video/content_stractegy.mp4" />
						</Grid>
					</Grid>
				</div>
			</div>
			{/* 			
			<div className='card-bg lines-blue no-repeat right responsive-container'>
				<div>
					<h1 className='text-center red-color'>Notre méthode</h1>
					<Grid container item style={styles.cardContainer} className='responsive-no-padding'>
						<Grid item container xs={12} sm={7} justify="center" alignItems="center">
							<Grid item xs={12} sm={8}>
								<h2 className='justify responsive-align-left'><span className='bordered-head'>Stratégie de contenu :</span></h2>
								<p className='justify'>La création de contenu et le story telling est au centre de ce que nous produisons. Nos experts dans le domaine supportent les marques afin de créer des campagnes impactantes sur tous les réseaux sociaux.</p>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={5} className='text-center'>
							<img src={Screen5} className='responsive-fullwidth' />
						</Grid>
					</Grid>
				</div>
			</div>
			
			<div>
				<Grid container item style={styles.cardContainer} className='dots-blue-down no-repeat responsive-reverse-order responsive-container'>
					<Grid item xs={12} sm={6} className='text-center'>
						<img src={Screen6} className='responsive-fullwidth' />
					</Grid>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item container xs={12} sm={8}>
							<h2><span className='bordered-head'>Identification des influenceurs : </span></h2>
							<p className='justify'>Notre plateforme donne accès à des centaines de milliers d’influenceurs sur Instagram, Youtube, TikTok, Twitch.</p>
						</Grid>
					</Grid>
				</Grid>
			</div>
			
			<div className='home-block-padding' style={styles.padding} className='card-bg dot-pink reverse no-repeat responsive-container'>
				<Grid container item style={styles.cardContainer} className='responsive-no-padding'>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item xs={12} sm={8}>
							<h2><span className='bordered-head'>Accompagnement</span> des influenceurs et campaign management :</h2>
							<p className='justify'>Le formatUne fois les influenceurs validés, nous mettons notre expertise au profit des annonceurs en agrégeant ces influenceurs au sein de différents packs thématiques : santé, beauté/lifestyle, sport, e-sport, décoration, voyages, entertainment, grande consoIn-vidéo est flexible et s’intègre simplement sur tous les types de contenu vidéos et dans tous les formats.</p>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6} className='text-center'>
						<img src={Screen5} className='responsive-fullwidth' />
					</Grid>
				</Grid>
			</div>
			
			<div className='light-gray-bg'>
				<Grid container item style={styles.cardContainer} className='card-bg lines-blue reverse-all right no-repeat responsive-reverse-order responsive-container'>
					<Grid item xs={12} sm={6} className='text-center'>
						<img src={Screen6} className='responsive-fullwidth' />
					</Grid>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item container xs={12} sm={8}>
							<h2><span className='bordered-head'>Reporting et campaign management</span></h2>
							<p className='justify'>Toutes les campagnes lancées ont un objectif spécifiques : nous mesurons tous les KPI de manière transparente. Nous travaillons étroitement avec nos clients et pouvons leur fournir les résultats dès que la campagne est terminée.</p>
						</Grid>
					</Grid>
				</Grid>
			</div> */}

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
			<style>{`
				h1 {
					margin: 0;
					padding: 2rem;
					padding-left: 0;
				}
				h2 {
					font-size: 1.7rem;
				}
				.card-spacing {
					padding: 0 1rem;
				}
			`}</style>
		</div>
	)
}


export default withLayout(Index);
