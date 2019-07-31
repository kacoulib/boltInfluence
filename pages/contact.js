import React, { useState } from 'react';
import Head from 'next/head';
import Card from '../components/dataDisplay/others/card'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import withLayout from '../lib/withLayout';
import { darkBlueColor, darkOrangeColor, lightGray } from '../utils/variables/css'
import Search from '../components/elements/search';
import Rectangle from '../static/img/rectangle.png'
import FormGenerator from '../components/form/generator';

const styles = {
	expandContainer: {
		backgroundColor: 'white',
		borderRadius: 5,
		padding: '1rem'
	},
	blueHead: {
		backgroundColor: darkBlueColor,
		margin: 0,
		color: 'white'
	},
	orangeHead: {
		backgroundColor: darkOrangeColor,
		margin: 0,
		color: 'white'
	},
	headP: {
		margin: 0
	},
	expandIco: {
		color: 'white'
	},
	padding: {
		padding: '1rem 2rem',
	},
	p: {
		padding: '0 1rem'
	},
	cardContainer: {
		marginBottom: '3rem'
	},
	faq: {
		backgroundColor: '#DEDEE8'
	},
	contactUs: {
		display: 'inline-block',
		margin: '2rem 0',
		padding: '.5rem 1rem',
		border: '1px solid gray',
		backgroundColor: lightGray,
	}
}

const fields = [{
	label: "Sélectionner",
	name: "name",
	type: 'select',
	required: true,
	width: 4,
	disableUnderline: true,
	formControlStyle: {
		borderRadius: '5px',
		backgroundColor: 'white',
		boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
		padding: 0
	},
	props: {
		list: [{ name: 'Mr', value: 'Mr' }, { name: 'Mme', value: 'Mme' }],
	}
}]

const Index = () => {
	const [state, setState] = useState({
		teams: [{
			fullName: 'Joseph NGUYEN',
			slug: '“La Ref”',
			job: 'CEO et Co-fondateur',
			description: 'Joseph n’est pas à son premier coup d’essai. Serial Entrepreneur, il a été associé chez StickyADS.tv revendue à Comcast en 2016. Avec Bolt Influence, il souhaite mettre au service des marques sa vision d’une communication cohérente et adaptée aux usages actuels des consommateurs'
		},
		{
			fullName: 'Morgane SIRGUEY',
			slug: '“La créa”',
			job: 'Chargée des influenceurs et Co-fondatrice ',
			description: 'Joseph n’est pas à son premier coup d’essai. Serial Entrepreneur, il a été associé chez StickyADS.tv revendue à Comcast en 2016. Avec Bolt Influence, il souhaite mettre au service des marques sa vision d’une communication cohérente et adaptée aux usages actuels des consommateurs'
		},
		{
			fullName: 'Thomas VAN’T WOUT',
			slug: '“l’arpenteur”',
			job: '',
			description: 'Joseph n’est pas à son premier coup d’essai. Serial Entrepreneur, il a été associé chez StickyADS.tv revendue à Comcast en 2016. Avec Bolt Influence, il souhaite mettre au service des marques sa vision d’une communication cohérente et adaptée aux usages actuels des consommateurs'
		}]
	})


	return (
		<div className='dots-blue right-bg'>
			<div className='home-block-padding' style={styles.padding}>
				<h1 className='bordered-head fullwidth'>À propos de nous</h1>
				<Grid container>
					<Grid container item style={styles.cardContainer}>
						<Grid item xs={12} sm={6}>
							<Card title="Bolt Influence, c’est quoi ?" color='blue' />
						</Grid>
						<Grid item container xs={12} sm={6} justify="center" alignItems="center">
							<Grid item xs={12} sm={8}>
								<p style={styles.p}>Chez Bolt Influence, nous souhaitons vous proposer les outils et les services qui vous aideront à piloter vos campagnes de Marketing d’influenceur.</p>
							</Grid>
						</Grid>
					</Grid>
					<Grid container item style={styles.cardContainer}>
						<Grid item container xs={12} sm={6} justify="center" alignItems="center">
							<Grid item container xs={12} sm={8} justify="center" alignItems="center">
								<Grid item xs={2} sm={2} >
									<span className='circle-dot'>1</span>
								</Grid>
								<Grid item xs={10} sm={10}>
									<p>Identifier et contacter les influenceurs pertinents par rapport à votre marquer et éviter les “faux” influenceurs</p>
								</Grid>
								<Grid item xs={2} sm={2} >
									<span className='circle-dot'>2</span>
								</Grid>
								<Grid item xs={10} sm={10}>
									<p>Créer des campagnes, les piloter et extraire des statistiques.</p>
								</Grid>
								<Grid item xs={2} sm={2} >
									<span className='circle-dot'>3</span>
								</Grid>
								<Grid item xs={10} sm={10}>
									<p>Accompagner les influenceurs en leur offrant un contact privilégié afin de vous accompagner dans votre croissance.</p>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Card title="Comment ça marche ?" color='red' />
						</Grid>
					</Grid>
				</Grid>
			</div>
			{/*  */}

			<div>
				<div className='home-block-padding' style={styles.padding}>
					<h2 className='bordered-head fullwidth'>Notre equipe</h2>
					<ul className={'home_team toggle'}>
						{state.teams.map((elem, key) => (
							<li key={key} className={`active ${key % 2 != 0 ? 'flex-reverse' : ''}`}>
								<div className='text-center'>
									<div><img src={Rectangle} /></div>
									<h3>{elem.fullName}</h3>
									<h4>{elem.slug}</h4>
									<h5>{elem.job}</h5>
								</div>
								<div>
									<div>
										<p>{elem.description}</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}


export default withLayout(Index);
