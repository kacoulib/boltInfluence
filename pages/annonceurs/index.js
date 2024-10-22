import React, { useState } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import withLayout from '../../lib/withLayout';
import { darkBlueColor, darkOrangeColor, lightGray } from '../../utils/variables/css'
import Screen1 from '../../static/img/screen1.png'
import Screen2 from '../../static/img/screen2.png'
import Screen4 from '../../static/img/screen4.png'
import Screen3 from '../../static/img/screen3.png'
import Partners from '../../components/page/public/partners'
import { IphoneComp } from '../../components/dataDisplay/others/device';
import ContactUs from '../../components/page/public/contactUs'
import { Link } from '../../server/routes/next-routes';

const styles = {
	cardContainer: {
		padding: '2rem 0',
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
	contactUs: {
		backgroundColor: '#D8D8D8',
		color: 'white'
	}
}


const Index = () => {
	const onSubmit = () => console.log('submit')

	return (
		<div id='annonceurs' className='lines-blue right-bg'>
			<div className='home-block-padding card-bg lines-blue no-repeat responsive-bg-opacity right responsive-container' style={styles.padding}>
				<h1 className='text-center'>Pilotez vos campagnes de Marketing d’influence en toute <span className='full-bordered-head'>transparence.</span></h1>
				<Grid container item style={styles.cardContainer} className='responsive-no-margin responsive-no-padding-bottom'>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item xs={12} sm={8}>
							<p className='justify' style={styles.p}>Notre plateforme vous accompagne dans toutes les étapes de vos campagnes en Marketing d’influence: sélection des influenceurs, création et administration et export des statistiques.</p>
							<div className='center-text' id='demo'>
								<Link href='#'><a title='Demander une démo' className='red-btn'>Demander une démo</a></Link>
							</div>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6} className='text-center'>
						{/* <IphoneComp deviceColor='white' src='../../static/img/screen1.png' /> */}
						<img src={Screen1} />
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.cardContainer} className='card-bg dots-blue-down responsive-bg-small-opacity responsive-no-margin no-repeat responsive-reverse-order responsive-container'>
					<Grid item xs={12} sm={6} className='text-center'>
						<img src={Screen2} />
					</Grid>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center" className='responsive-container'>
						<Grid item container xs={12} sm={8} justify="center" alignItems="center">
							<h2 className='card-title'><span className='full-bordered-head' style={{ padding: 0 }}>Détectez</span> les influenceurs qui correspondent à votre marque</h2>
							<p className='justify'>Trouver et faites appel à des influenceurs suivant des critères que vous aurez défini.</p>
						</Grid>
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div className='home-block-padding responsive-container' style={styles.padding}>
				<h2 className='text-center responsive-align-left'><span className='full-bordered-head' style={{ padding: 0 }}>Identifiez</span> les nouveaux talents et évitez les faux influenceurs</h2>
				<Grid container item style={styles.cardContainer} className='responsive-no-margin'>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item xs={12} sm={8}>
							<p className='justify' style={styles.p}>Découvrez par thématique les influenceurs en forte croissance.</p>
							<p className='justify' style={styles.p}>Utiliser nos outils d’analyse statistique afin d’analyser l’authenticité des influenceurs.</p>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6} className='text-center'>
						<img src={Screen3} />
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.cardContainer} justify="center" alignItems="center" className='card-bg responsive-bg-opacity responsive-no-margin dot-pink no-repeat responsive-container responsive-reverse-order'>
					<Grid item xs={12} sm={6} className='text-center'>
						<img src={Screen4} />
					</Grid>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center" className='responsive-container'>
						<Grid item container xs={12} sm={8} >
							<h2 className='card-title'><span className='full-bordered-head' style={{ padding: 5 }}>Analysez</span> les résultats de vos campagnes et exporter les statistiques</h2>
							<p className='justify'>Notre plateforme vous permet d’accéder à l’ensemble des chiffres de vos campagnes (reach, nombre de vues, analyses démographiques…) afin de calculer leur ROI et exportez-les afin de les exploiter dans d’autres logiciels.</p>
						</Grid>
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div>
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
				#demo {
					margin-top: 3rem;
				}
				h1 {
					font-size: 3.5rem;
					padding: 3rem 0;
				}
				.card-title {
					margin-top: 0;
				}
				h2:not(.card-title) {
					margin: 4rem auto;
				}
				img {
					min-width: 60%;
				}
				@media all and (max-width : 400px) {
					h1 {
						font-size: 2rem;
						padding: 0;
					}
					div > h2 {
						margin: 1rem;
					}
					#demo {
						margin: 3rem auto;
					}
				}
			`}</style>
		</div>
	)
}


export default withLayout(Index);
