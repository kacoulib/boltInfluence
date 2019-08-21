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
		padding: '1rem 0 3rem',
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
			title: 'Startups',
			description: 'Prix : 199€',
			href: '#',
			list: ["Accès à X influenceurs", "1 compte unique, langues illimitées, 1 marque", "Gestion de campagnes et rapports personnalisés sur les retombées (Youtube, Instagram, Twitter, Facebook)", "Création illimitée de campagne (choix de 25 influenceurs maximum)", "Choix des influenceurs selon le profil, les centre d’intérêts, l’âge, le tarif, …", "Support email et téléphonique", "Abonnement sans engagement (résiliation en un clic)", "Recherche d’influenceurs limitée à 100 par mois avec le détail"]
		}, {
			title: 'Marque',
			description: 'Prix : Nous consulter',
			href: '/annonceurs',
			list: ["Accès à l’ensemble des influenceurs de la plateforme avec leurs statistiques détaillées + possibilité d’export CSV + PDF", "Comptes illimités", "Gestion de campagnes et rapports personnalisés sur les retombées (Tik Tok, Youtube, Instagram, Twitch, Snapchat, Twitter, Facebook, Linkedin, Pinterest, blog) + possibilité d’export CSV + PDF	", "Outil de détection des faux influenceurs pour des campagnes authentiques.", "Création illimitée de campagne (nombre influenceurs illimités)", "Une validation avant la publication des influenceurs de leurs contenus photos et/ou vidéos", "Choix des influenceurs selon le profil, le centre d’intérêt, l’âge, le tarif, …", "Support email et téléphonique avec un contact privilégié", "Abonnement sans engagement (résiliation en un clic)", "Possibilité de créer des campagnes avec une rémunération pour les influenceurs ou de la dotation de produits", "Un conseiller unique et dédié par mail et téléphone tout au long de vos campagnes", "Accéder à la nouvelle technologie « In Video » pour un placement de produit innovant pour vos campagnes de marketing d’influence"]
		}, {
			title: 'Agence',
			description: 'Prix : Nous consulter',
			href: '/annonceurs/agence',
			list: ["Accès à l’ensemble des influenceurs de la plateforme avec leurs statistiques détaillées + possibilité d’export CSV + PDF", "Possibilité d’avoir plusieurs comptes de marques", "Comptes illimités", "Gestion de campagnes et rapports personnalisés sur les retombées par compte de marques (Tik Tok, Youtube, Instagram, Twitch, Snapchat, Twitter, Facebook, Linkedin, Pinterest, blog) + possibilité d’export CSV + PDF	", "Outil de détection des faux influenceurs pour des campagnes authentiques.", "Création illimitée de campagne (nombre influenceurs illimités)", "Une validation avant la publication des influenceurs de leurs contenus photos et/ou vidéos", "Choix des influenceurs selon le profil, le centre d’intérêt, l’âge, le tarif, …", "Support email et téléphonique avec un contact privilégié", "Abonnement sans engagement (résiliation en un clic)", "Possibilité de créer des campagnes avec une rémunération pour les influenceurs ou de la dotation de produits", "Un conseiller unique et dédié par mail et téléphone tout au long de vos campagnes", "Accéder à la nouvelle technologie « In Video » pour un placement de produit innovant pour vos campagnes de marketing d’influence."]
		}]
	})
	const handleActive = (index) => {
		setState({ ...state, activeTarif: index });
	}
	const onSubmit = () => console.log('submit')

	return (
		<div style={styles.cardContainer}>
			<div>
				<div className='home-block-padding' style={styles.padding}>
					<h1 className='text-center'>Nos tarifs de la plateforme Bolt Influence</h1>
					<ul className='tarif-list-container'>
						{state.tarifs && state.tarifs.map((elem, index) => (
							<li key={index} className={index == state.activeTarif ? 'active-tarif' : ''} onMouseOver={() => handleActive(index)}>
								<div>
									<h2 className='red-color text-center'>{elem.title}</h2>
									<p className='justify bold text-center'>{elem.description}</p>
									<div className='center-text auto'>
										<Link href={elem.href}><a title='Demander une démo' className='red-btn' style={styles.button}>Demander une démo</a></Link>
									</div>
									<ul>
										{elem.list && elem.list.map((e, i) => (<li><span className='tiny-icon valide-red'></span><p className='inline-block'>{e}</p></li>))}
									</ul>
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
