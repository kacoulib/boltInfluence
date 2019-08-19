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
import { Link } from '../../server/routes/next-routes';
import ContactUs from '../../components/page/public/contactUs'

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
			<div className='home-block-padding' style={styles.padding}>
				<h1 className='text-center'>Pilotez vos campagnes de Marketing d’influence en toute <span className='full-bordered-head'>transparence.</span></h1>
				<Grid container item style={styles.cardContainer}>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item xs={12} sm={8}>
							<p className='justify' style={styles.p}>Notre plateforme vous accompagne dans toutes les étapes de vos campagnes en Marketing d’influence : sélection des influenceurs, création et administration et export des statistiques.</p>
							<div className='center-text'>
								<Link href='#'><a title='Demander une démo' className='red-btn'>Demander une démo</a></Link>
							</div>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6}>
						<img src={Screen1} />
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.cardContainer} className='card-bg dots-blue-down responsive-bg-opacity no-repeat'>
					<Grid item xs={12} sm={6} className='text-center responsive-container'>
						<img src={Screen2} />
					</Grid>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center" className='responsive-container'>
						<Grid item container xs={12} sm={8} justify="center" alignItems="center">
							<h2><span className='full-bordered-head' style={{ padding: 0 }}>Détectez</span> les influenceurs qui correspondent à votre marque</h2>
							<p className='justify'>Trouver et faites appel à des influenceurs suivant des critères que vous aurez défini.</p>
						</Grid>
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div className='home-block-padding' style={styles.padding}>
				<h2 className='text-center'><span className='full-bordered-head' style={{ padding: 0 }}>Identifiez</span> les nouveaux talents et évitez les faux influenceurs</h2>
				<Grid container item style={styles.cardContainer}>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item xs={12} sm={8}>
							<p className='justify' style={styles.p}>Découvrez par thématique les influenceurs en forte croissance.</p>
							<p className='justify' style={styles.p}>Utiliser nos outils d’analyse statistique afin d’analyser l’authenticité des influenceurs.</p>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6}>
						<img src={Screen3} />
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.cardContainer} className='card-bg responsive-bg-opacity dot-pink no-repeat responsive-container'>
					<Grid item xs={12} sm={6} className='text-center'>
						<img src={Screen4} />
					</Grid>
					<Grid item container xs={12} sm={6} justify="center" alignItems="center">
						<Grid item container xs={12} sm={8} justify="center" alignItems="center">
							<h2><span className='full-bordered-head' style={{ padding: 0 }}>Analysez</span> les résultats de vos campagnes et exporter les statistiques</h2>
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
		</div>
	)
}


export default withLayout(Index);
