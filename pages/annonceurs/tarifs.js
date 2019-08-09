import React, { useState } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import withLayout from '../../lib/withLayout';
import Screen7 from '../../static/img/screen7.png'
import Screen8 from '../../static/img/screen8.png'
import Screen9 from '../../static/img/screen9.png'
import { Link } from '../../server/routes/next-routes';
import { darkBlueColor, darkOrangeColor, lightGray } from '../../utils/variables/css'

const styles = {
	cardContainer: {
		padding: '5rem 0',
		// marginBottom: '3rem'
	},
	demoContainer: {
		paddingBottom: '5rem',
		// marginBottom: '3rem'
	},
	padding: {
		padding: '1rem 2rem',
	},
	p: {
		padding: '0 1rem'
	},
	verticalPadding: {
		padding: '1rem 0',
	},
	bottomPadding: {
		paddingBottom: '3rem',
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
	},
	more: {
		fontSize: '3rem'
	},
	tableHead: {
		fontSize: '1.3rem'
	}
}


const Index = () => {
	const [state, setState] = useState({
		activeTarif: 1,
		tarifs: [{
			title: 'Basic',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit.',
			list: ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet']
		}, {
			title: 'Pro',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit.',
			list: ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet']
		}, {
			title: 'Entreprise',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit.',
			list: ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet']
		}],
		advantages: [{
			title: 'La plateforme',
			list: [
				{ title: 'Lorem opsum dolor sit', basic: 'Pas de frais', pro: 'Pas de frais', entreprise: 'Pas de frais' },
				{ title: 'Lorem opsum dolor sit', basic: '3', pro: '5', entreprise: '10' },
				{ title: 'Lorem opsum dolor sit', basic: <span className='tiny-icon valide-black'></span>, pro: <span className='tiny-icon valide-black'></span>, entreprise: 'Pas de frais' },
				{ title: 'Lorem opsum dolor sit', basic: '', pro: <span className='tiny-icon valide-black'></span>, entreprise: <span className='tiny-icon valide-black'></span> },
				{ title: 'Lorem opsum dolor sit', basic: <span className='tiny-icon valide-black'></span>, pro: <span className='tiny-icon valide-black'></span>, entreprise: 'Pas de frais' },
			]
		}, {
			title: 'Influenceurs',
			list: [
				{ title: 'Lorem opsum dolor sit', basic: 'Pas de frais', pro: 'Pas de frais', entreprise: 'Pas de frais' },
				{ title: 'Lorem opsum dolor sit', basic: '3', pro: '5', entreprise: '10' },
				{ title: 'Lorem opsum dolor sit', basic: <span className='tiny-icon valide-black'></span>, pro: <span className='tiny-icon valide-black'></span>, entreprise: 'Pas de frais' },
				{ title: 'Lorem opsum dolor sit', basic: '', pro: <span className='tiny-icon valide-black'></span>, entreprise: <span className='tiny-icon valide-black'></span> },
				{ title: 'Lorem opsum dolor sit', basic: <span className='tiny-icon valide-black'></span>, pro: <span className='tiny-icon valide-black'></span>, entreprise: 'Pas de frais' },
			]
		}, {
			title: 'Entreprise',
			list: [
				{ title: 'Lorem opsum dolor sit', basic: 'Pas de frais', pro: 'Pas de frais', entreprise: 'Pas de frais' },
				{ title: 'Lorem opsum dolor sit', basic: '3', pro: '5', entreprise: '10' },
				{ title: 'Lorem opsum dolor sit', basic: <span className='tiny-icon valide-black'></span>, pro: <span className='tiny-icon valide-black'></span>, entreprise: 'Pas de frais' },
				{ title: 'Lorem opsum dolor sit', basic: '', pro: <span className='tiny-icon valide-black'></span>, entreprise: <span className='tiny-icon valide-black'></span> },
				{ title: 'Lorem opsum dolor sit', basic: <span className='tiny-icon valide-black'></span>, pro: <span className='tiny-icon valide-black'></span>, entreprise: 'Pas de frais' },
			]
		}],
	})
	const handleActive = (index) => {
		setState({ ...state, activeTarif: index });
	}
	const onSubmit = () => console.log('submit')

	return (
		<div>
			<div>
				<div className='home-block-padding' style={styles.padding}>
					<h1 className='text-center'>Nos tarifs de la plateforme Bolt Influence</h1>
					<ul className='tarif-list-container'>
						{state.tarifs && state.tarifs.map((elem, index) => (
							<li key={index} className={index == state.activeTarif ? 'active-tarif' : ''} onMouseOver={() => handleActive(index)}>
								<h2 className='red-color text-center'>{elem.title}</h2>
								<p className='justify'>{elem.description}</p>
								<div className='center-text auto'>
									<Link href='#'><a title='Demander une démo' className='red-btn' style={styles.button}>Demander une démo</a></Link>
								</div>
								<ul>
									{elem.list && elem.list.map((e, i) => (<li><span className='tiny-icon valide-red'></span><p className='inline-block'>{e}</p></li>))}
								</ul>
							</li>
						))}
					</ul>
				</div>
			</div>
			{/*  */}
			<div style={styles.cardContainer}>
				<h3 className='text-center' style={styles.more}>Et bien plus encore…</h3>
				<Grid container style={styles.padding}>
					<Grid container item>
						<Grid container item xs={4} sm={8}></Grid>
						<Grid container item xs={8} sm={4} style={styles.tableHead} className='text-center bold'>
							<Grid item xs={4} sm={4}>Basic</Grid>
							<Grid item xs={4} sm={4}>Pro</Grid>
							<Grid item xs={4} sm={4}>Entreprise</Grid>
						</Grid>
					</Grid>
					{state.advantages && state.advantages.map((elem, index) => (
						<Grid container itemkey={index} style={index != state.advantages.length - 1 ? styles.bottomPadding : {}}>
							<h2 className='red-color'>{elem.title}</h2>
							{elem.list && elem.list.map((e, i) => (
								<Grid container item key={i} className={i % 2 == 0 ? 'light-gray-bg' : ''} style={styles.verticalPadding}>
									<Grid item xs={4} sm={8}>{e.title}</Grid>
									<Grid item container xs={8} sm={4} className='text-center'>
										<Grid item xs={4} sm={4}>{e.basic}</Grid>
										<Grid item xs={4} sm={4}>{e.pro}</Grid>
										<Grid item xs={4} sm={4}>{e.entreprise}</Grid>
									</Grid>
								</Grid>
							))}
						</Grid>
					))}

				</Grid>
			</div>
			{/*  */}
			<div className='center-text' style={styles.demoContainer}>
				<h2 className='red-color'>Demander une démo aujourd’hui ! </h2>
				<div className='center-text auto'>
					<Link href='#'><a title='Demander une démo' className='red-btn' style={styles.button}>Demander une démo</a></Link>
				</div>
			</div>

		</div>
	)
}


export default withLayout(Index);
