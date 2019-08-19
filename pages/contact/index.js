import React, { useState } from 'react';
import Card from '../../components/dataDisplay/others/card'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import withLayout from '../../lib/withLayout';
import { darkBlueColor, darkOrangeColor, lightGray, redColor } from '../../utils/variables/css'
import Search from '../../components/elements/search';
import Image01 from '../../static/img/c-est-quoi.jpeg'
import Image02 from '../../static/img/comment-ca-marche.jpeg'
import FormGenerator from '../../components/form/generator';
import { customRequest } from '../../lib/api/http'

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
	list: [],
	props: {
		style: {
			borderRadius: 5,
			backgroundColor: 'white'
		}
	}
}]

const Index = ({ faqs: { faqs } = {} } = {}) => {
	const [state, setState] = useState({
		toogleTeam: false,
		active: null,
		teams: [{
			fullName: 'Joseph NGUYEN',
			slug: '“La Ref”',
			job: 'CEO et Co-fondateur',
			description: 'Joseph n’est pas à son premier coup d’essai. Serial Entrepreneur, il a été associé chez StickyADS.tv revendue à Comcast en 2016. Avec Bolt Influence, il souhaite mettre au service des marques sa vision d’une communication cohérente et adaptée aux usages actuels des consommateurs',
			img: '../../static/img/pictures/joseph.jpeg'
		},
		{
			fullName: 'Morgane SIRGUEY',
			slug: '“La créa”',
			job: 'Chargée des influenceurs et Co-fondatrice ',
			description: 'Issue du monde culinaire et entrepreneuriale, Morgane apporte à Bolt Influence la créativité dont la communication a besoin. Également blogueuse, son bagage social media lui permet de vous accompagner lors du choix stratégique des influenceurs qui représenteront votre marque.',
			img: '../../static/img/pictures/morgane.jpeg'
		},
		{
			fullName: 'Thomas VAN’T WOUT',
			slug: '“l’arpenteur”',
			job: '',
			description: 'Thomas a fait toutes ses armes dans le monde digital pour de grands comptes comme des projets entrepreneurials. Lui-même influenceur, il permet à Bolt Influence de se positionner comme un interlocuteur privilégié pour toutes les marques désireuses de communiquer auprès des communautés sociales.',
			img: '../../static/img/pictures/thomas.jpeg'
		}]
	})

	const toggleTeam = (i) => {
		const active = state.active == i ? null : i;
		setState({ ...state, active });
	}
	const onChange = (name, value) => setState({ ...state, [name]: value })


	return (
		<div className='dots-blue right-bg' id='contact-page'>
			<div className='home-block-padding' style={styles.padding}>
				<h1 className='bordered-head fullwidth'>À propos</h1>
				<Grid container>
					<Grid container item style={styles.cardContainer}>
						<Grid item xs={12} sm={6}>
							<Card src={Image01} title="Bolt Influence, c’est quoi ?" color='blue' />
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
							<Card src={Image02} title="Comment ça marche ?" color='red' />
						</Grid>
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div style={styles.faq}>
				<div className='home-block-padding' style={styles.padding}>
					<h2 className='bordered-head fullwidth'>FAQ</h2>
					<p>Vous voulez en savoir plus ?</p>
					<p className='italic'>Notre FAQ répondra à tous vos questions !</p>
					<Grid container item style={styles.cardContainer}>
						<Grid item xs={12} sm={6}>
							<FormGenerator
								fields={fields}
								state={state}
								label='test'
								onChange={onChange}
							/>
						</Grid>

						<Grid item container xs={12} sm={6} justify="flex-end" id='search'>
							<Grid item xs={12} sm={6}>
								<Search />
							</Grid>
						</Grid>
					</Grid>
					<div style={styles.expandContainer}>
						<p className='bold'>Top 5</p>
						{faqs && faqs.map((elem, key) => (
							<ExpansionPanel key={key} style={{ marginBottom: '1rem' }}>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon style={styles.expandIco} />}
									aria-controls="panel1a-content"
									id="panel1a-header"
									style={key % 2 == 0 ? styles.blueHead : styles.orangeHead}
								>
									<p style={styles.headP}>{elem.title}</p>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<p>{elem.content}</p>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						))}
						<p className='text-right'><a className='red-color'>Montrer tout le FAQ</a></p>
					</div>
					<div>
						<a style={styles.contactUs}>Vous n’avez pas trouvé votre réponse ? Contactez-nous</a>
					</div>
				</div>
			</div>
			{/*  */}

			<div>
				<div className='home-block-padding' style={styles.padding}>
					<h2 className='bordered-head fullwidth'>Notre equipe</h2>
					<ul className={`home_team ${state.active != null ? 'toggle' : ''}`}>
						{state.teams.map((elem, key) => {
							const isActive = state.active == key;
							return (
								<li key={key} className={`${isActive ? 'active' : ''}`}>
									<div className='text-center' style={{ backgroundColor: isActive ? redColor : '' }} onClick={() => toggleTeam(key)}>
										<div><img src={elem.img} className='fullwidth' /></div>
										<h3>{elem.fullName}</h3>
										<h4>{elem.slug}</h4>
										<h5>{elem.job}</h5>
									</div>
									<div>
										<div>
											<p>{elem.description}</p>
											<p></p>
										</div>
									</div>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</div>
	)
}
Index.getInitialProps = async () => {
	try {
		const faqs = await customRequest({ path: '/public/faqs' });

		return { faqs }
	}
	catch (err) {
		return {}
	}
}


export default withLayout(Index);
