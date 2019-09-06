import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import withLayout from '../../lib/withLayout';
import { darkBlueColor, darkOrangeColor, lightGray, redColor } from '../../utils/variables/css'
import Search from '../../components/elements/search';
import FormGenerator from '../../components/formElement/generator';
import { customRequest } from '../../lib/api/http'
import { Link } from '../../server/routes/next-routes';
import Video from '../../components/elements/video'

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
		marginBottom: '4rem'
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
	},
	cardPadding: {
		left: {
			paddingLeft: '2rem'
		},
		right: {
			paddingRight: '2rem'
		},
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
const settings = { unableUnderline: false, unableBoxShadow: true, variant: 'outlined' }

const Index = ({ faqs: { faqs } = {} } = {}) => {
	const [state, setState] = useState({
		toogleTeam: false,
		active: null,
		teams: [{
			fullName: 'Joseph NGUYEN',
			slug: '“La Ref”',
			job: 'CEO et Co-fondateur',
			description: 'Joseph n’est pas à son premier coup d’essai. Serial Entrepreneur, il a été associé chez StickyADS.tv revendue à Comcast en 2016. Avec Bolt Influence, il souhaite mettre au service des marques sa vision d’une communication cohérente et adaptée aux usages actuels des consommateurs',
			img: '../../static/img/pictures/joseph.jpg'
		},
		{
			fullName: 'Morgane SIRGUEY',
			slug: '“La Créa”',
			job: 'Chargée des influenceurs et Co-fondatrice ',
			description: 'Issue du monde culinaire et entrepreneuriale, Morgane apporte à Bolt Influence la créativité dont la communication a besoin. Également blogueuse, son bagage social media lui permet de vous accompagner lors du choix stratégique des influenceurs qui représenteront votre marque.',
			img: '../../static/img/pictures/morgane.jpg'
		},
		{
			fullName: 'Thomas VAN’T WOUT',
			slug: '“L’Arpenteur”',
			job: 'VP Sales et Marketing',
			description: 'Thomas a fait toutes ses armes dans le monde digital pour de grands comptes comme des projets entrepreneurials. Lui-même influenceur, il permet à Bolt Influence de se positionner comme un interlocuteur privilégié pour toutes les marques désireuses de communiquer auprès des communautés sociales.',
			img: '../../static/img/pictures/thomas.jpg'
		}]
	})

	const toggleTeam = (i) => {
		const active = state.active == i ? null : i;
		setState({ ...state, active });
	}
	const onChange = (name, value) => setState({ ...state, [name]: value })


	return (
		<div className='dots-blue right-bg' id='contact-page'>
			<div className='home-block-padding responsive-container' style={styles.padding}>
				<h1 className='bordered-head fullwidth'>À propos</h1>
				<Grid container>
					<Grid container item style={styles.cardContainer}>
						<Grid item xs={12} sm={6} className='card-padding-right'>
							<div className='text-center publicCard'>
								<Video autoplay={true} src="../../static/video/bolt_cest_quoi.mp4" />
								<img src='../../../static/img/checkers.jpg' />
							</div>
							{/* <VideoCard title="Bolt Influence, c’est quoi ?">
							</VideoCard> */}
						</Grid>
						<Grid item container xs={12} sm={6} justify="center" alignItems="center" className='card-padding-left'>
							<Grid item xs={12} sm={10}>
								<p style={styles.p}>Chez Bolt Influence, nous souhaitons vous proposer les outils et les services qui vous aideront à piloter vos campagnes de Marketing d’influenceur.</p>
							</Grid>
						</Grid>
					</Grid>
					<Grid container item style={styles.cardContainer} direction="row-reverse">
						<Grid item xs={12} sm={6} className='card-padding-left'>
							<div className='text-center publicCard right'>
								<Video autoplay={true} src="../../static/video/comment_ca_marche.mp4" />
								<img src='../../../static/img/checkers.jpg' />
							</div>
						</Grid>
						<Grid item container xs={12} sm={6} justify="center" alignItems="center" className='card-padding-right'>
							<Grid item container xs={12} sm={10} justify="center" alignItems="center">
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
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div style={styles.faq}>
				<div className='home-block-padding responsive-container' style={styles.padding}>
					<h2 className='bordered-head fullwidth'>FAQ</h2>
					<p>Vous voulez en savoir plus ?</p>
					<p className='italic'>Notre FAQ répondra à tous vos questions !</p>
					<Grid container item style={styles.cardContainer} alignItems="stretch">
						<Grid item xs={12} sm={6}>
							<FormGenerator
								fields={fields}
								state={state}
								label='test'
								onChange={onChange}
							// settings={settings}
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
						<Link href='/contact'><a title='Contactez-nous' style={styles.contactUs}>Vous n’avez pas trouvé votre réponse ? Contactez-nous</a></Link>
					</div>
				</div>
			</div>
			{/*  */}

			<div>
				<div className='home-block-padding responsive-container' style={styles.padding}>
					<h2 className='bordered-head fullwidth'>Notre equipe</h2>
					<Grid container alignItems="stretch" className={`home_team ${state.active != null ? 'toggle' : ''}`}>
						{state.teams.map((elem, key) => {
							const isActive = state.active == key;
							return (
								<Grid item key={key} className={`list-item ${isActive ? 'active' : ''}`}>
									<div className='text-center' style={{ backgroundColor: isActive ? redColor : '' }} onClick={() => toggleTeam(key)}>
										<div><img src={elem.img} className='fullwidth' /></div>
										<h3>{elem.fullName}</h3>
										<h4>{elem.slug}</h4>
										<h5>{elem.job}</h5>
									</div>
									<div>
										<div>
											<p>{elem.description}</p>
										</div>
									</div>
								</Grid>
							)
						})}
					</Grid>
				</div>
			</div>
			<style jsx>{`
				h1 {
					margin: 2rem auto;
					padding-bottom: 1rem;
				}
			`}</style>
		</div >
	)
}
Index.getInitialProps = async () => {
	let faqs;

	try {
		faqs = await customRequest({ path: '/public/faqs' });
	}
	catch (err) {
	}
	return { faqs }
}


export default withLayout(Index);
