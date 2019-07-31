import React, { useState } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import withLayout from '../lib/withLayout';
import Team from '../static/img/team.jpg'
import Screen6 from '../static/img/screen6.png'
import Partners from '../components/page/public/partners'
import ContactUs from '../components/page/public/contactUs'

const styles = {
	cardContainer: {
		padding: '5rem 0',
		// marginBottom: '3rem'
	},
	padding: {
		padding: '1rem 2rem',
	},
	verticalPadding: {
		padding: '1rem 2rem 0',
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
	fullName: {
		paddingLeft: '1rem'
	}
}


const Index = () => {
	const [state, setState] = useState({
		cover: {
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit. ',
			img: '../static/img/screen6.png',
			resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit. ',
			author: {
				firstName: 'Matthieu',
				lastName: 'Lopez',
				img: '../static/img/user.png'
			},
		},
		articles: [{
			title: 'Titre',
			category: { title: 'Onglet1', id: 'Onglet1' },
			content: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula velit, molestie sitela amet pretium consectetur. sit amet pretium consectetur…',
			img: '../static/img/gray-rectangle.jpg',
			date: 'Mercredi 13 Juin, 2019'
		}, {
			title: 'Titre',
			category: { title: 'Onglet2', id: 'Onglet2' },
			content: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula velit, molestie sitela amet pretium consectetur. sit amet pretium consectetur…',
			img: '../static/img/gray-rectangle.jpg',
			date: 'Mercredi 13 Juin, 2019'
		}, {
			title: 'Titre',
			category: { title: 'Onglet1', id: 'Onglet1' },
			content: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula velit, molestie sitela amet pretium consectetur. sit amet pretium consectetur…',
			img: '../static/img/gray-rectangle.jpg',
			date: 'Mercredi 13 Juin, 2019'
		}, {
			title: 'Titre',
			category: { title: 'Onglet2', id: 'Onglet2' },
			content: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula velit, molestie sitela amet pretium consectetur. sit amet pretium consectetur…',
			img: '../static/img/gray-rectangle.jpg',
			date: 'Mercredi 13 Juin, 2019'
		},
		{
			title: 'Titre',
			category: { title: 'Onglet1', id: 'Onglet1' },
			content: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula velit, molestie sitela amet pretium consectetur. sit amet pretium consectetur…',
			img: '../static/img/gray-rectangle.jpg',
			date: 'Mercredi 13 Juin, 2019'
		}, {
			title: 'Titre',
			category: { title: 'Onglet2', id: 'Onglet2' },
			content: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula velit, molestie sitela amet pretium consectetur. sit amet pretium consectetur…',
			img: '../static/img/gray-rectangle.jpg',
			date: 'Mercredi 13 Juin, 2019'
		},],
		categories: [{ title: 'Onglet1', id: 'Onglet1', nb: 3 }],
		filterCategory: null
	})
	const toggleCategory = (id) => setState({ ...state, ...{ filterCategory: id != state.filterCategory ? id : null } });
	const filtedArticles = state.filterCategory ? state.articles.filter((e) => e.category.id == state.filterCategory) : state.articles

	return (
		<div>
			<div>
				<div className='home-block-padding'>
					<h1 className='red-color' style={styles.verticalPadding}><span className='full-bordered-head'>Blog</span></h1>
					<Grid container item style={styles.cardContainer}>
						<Grid item container xs={12} sm={6} className='card-bg top-dots-white no-repeat right red-bg white-color'>
							<Grid item xs={12} sm={10} style={styles.padding}>
								<h3>Mise en avant</h3>
								<p>{state.cover.title}</p>
								<p>{state.cover.resume}</p>
								<div>
									<img src={state.cover.author.img} className='inline-block' />
									<h3 className='inline-block vertical-top' style={styles.fullName}>{state.cover.author.firstName} {state.cover.author.lastName}</h3>
								</div>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={6} className='no-repeat' style={{ backgroundSize: 'cover', backgroundImage: `url(${state.cover.img})` }}>
						</Grid>
					</Grid>
				</div>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.cardContainer}>
					{filtedArticles && filtedArticles.map((elem, index) => (
						<Grid key={index} item container xs={12} sm={4} justify="center" alignItems="center">
							<article className='gray-border'>
								<header><img src={elem.img} /></header>
								<div>
									<div className='text-center'><span>{elem.category.title}</span></div>
									<h1>{elem.title}</h1>
									<p>{elem.content}</p>
								</div>
								<footer className='text-center'>
									{elem.date}
								</footer>
							</article>
						</Grid>
					))}
				</Grid>
			</div>
		</div>
	)
}


export default withLayout(Index);
