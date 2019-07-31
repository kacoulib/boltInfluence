import React, { useState } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import withLayout from '../lib/withLayout';
import Team from '../static/img/team.jpg'
import Screen6 from '../static/img/screen6.png'
import Partners from '../components/page/public/partners'
import ContactUs from '../components/page/public/contactUs'
import { grayColor } from '../utils/variables/css'
const styles = {
	cardContainer: {
		padding: '3rem 0',
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
	},
	filterContainer: {
		padding: '1rem 1rem'
	},
	filter: {
		padding: '2rem'
	},
	footer: {
		padding: '.3rem',
		borderTop: `1px solid ${grayColor}`,
		color: '#656464'
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
			category: { name: 'Onglet1', id: 'Onglet1' },
			content: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula velit, molestie sitela amet pretium consectetur. sit amet pretium consectetur…',
			img: '../static/img/gray-rectangle.jpg',
			date: 'Mercredi 13 Juin, 2019'
		}, {
			title: 'Titre',
			category: { name: 'Onglet2', id: 'Onglet2' },
			content: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula velit, molestie sitela amet pretium consectetur. sit amet pretium consectetur…',
			img: '../static/img/gray-rectangle.jpg',
			date: 'Mercredi 13 Juin, 2019'
		}, {
			title: 'Titre',
			category: { name: 'Onglet1', id: 'Onglet1' },
			content: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula velit, molestie sitela amet pretium consectetur. sit amet pretium consectetur…',
			img: '../static/img/gray-rectangle.jpg',
			date: 'Mercredi 13 Juin, 2019'
		}, {
			title: 'Titre',
			category: { name: 'Onglet2', id: 'Onglet2' },
			content: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula velit, molestie sitela amet pretium consectetur. sit amet pretium consectetur…',
			img: '../static/img/gray-rectangle.jpg',
			date: 'Mercredi 13 Juin, 2019'
		},
		{
			title: 'Titre',
			category: { name: 'Onglet1', id: 'Onglet1' },
			content: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula velit, molestie sitela amet pretium consectetur. sit amet pretium consectetur…',
			img: '../static/img/gray-rectangle.jpg',
			date: 'Mercredi 13 Juin, 2019'
		}, {
			title: 'Titre',
			category: { name: 'Onglet3', id: 'Onglet3' },
			content: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula velit, molestie sitela amet pretium consectetur. sit amet pretium consectetur…',
			img: '../static/img/gray-rectangle.jpg',
			date: 'Mercredi 13 Juin, 2019'
		},],
		categories: [
			{ name: 'Onglet 1', id: 'Onglet1', nb: 3, color: 'red' },
			{ name: 'Onglet 2', id: 'Onglet2', nb: 2, color: 'blue' },
			{ name: 'Onglet 3', id: 'Onglet3', nb: 1, color: 'done' },
			{ name: 'Onglet 4', id: 'Onglet4', nb: 0, color: 'new' },
		],
		filterCategory: null
	})
	const toggleCategory = (id) => setState({ ...state, ...{ filterCategory: id != state.filterCategory ? id : null } });
	const filtedArticles = state.filterCategory ? state.articles.filter((e) => e.category.id == state.filterCategory) : state.articles

	return (
		<div id='blog'>
			<div>
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
			{/*  */}
			<div>
				<Grid container alignContent='center' alignItems='center'>
					<Grid container item xs={12} sm={3}></Grid>
					<Grid container item xs={12} sm={6}>
						{state.categories && state.categories.map((e, i) => (
							<Grid item key={i} container xs={12} sm={3} style={styles.p} onClick={() => toggleCategory(e.id)}>
								<Grid item key={i} container xs={12} className={`filter ${e.color} ${state.filterCategory == e.id ? 'active' : ''}`} justify="space-between" >
									<div>{e.name}</div>
									<div>{e.nb}</div>
								</Grid>
							</Grid>
						))}
					</Grid>
					<Grid container item xs={12} sm={3}></Grid>
				</Grid>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.filterContainer}>
					{filtedArticles && filtedArticles.map((elem, index) => {
						let color = state.categories.find(e => e.id == elem.category.id);
						color = color ? color.color : '';

						return (
							<Grid key={index} item container xs={12} sm={4} justify="center" alignItems="center" style={styles.filter}>
								<article className='gray-border'>
									<header><img src={elem.img} className='fullwidth' /></header>
									<div style={styles.p}>
										<div className='text-center'><span className={`article-ategory ${color}`}>{elem.category.name}</span></div>
										<h1>{elem.title}</h1>
										<p>{elem.content}</p>
									</div>
									<footer className='text-center' style={styles.footer}>
										{elem.date}
									</footer>
								</article>
							</Grid>
						)
					})}
				</Grid>
			</div>
		</div>
	)
}


export default withLayout(Index);
