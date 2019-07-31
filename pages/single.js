import React, { useState } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import withLayout from '../lib/withLayout';
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
			img: '../static/img/team.jpg',
			resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit. ',
			author: {
				firstName: 'Matthieu',
				lastName: 'Lopez',
				img: '../static/img/user.png'
			},
		},
	})
	const toggleCategory = (id) => setState({ ...state, ...{ filterCategory: id != state.filterCategory ? id : null } });
	const filtedArticles = state.filterCategory ? state.articles.filter((e) => e.category.id == state.filterCategory) : state.articles

	return (
		<div id='blog'>
			<div>
				<h1 className='red-color' style={styles.verticalPadding}><span className='full-bordered-head'>Blog</span></h1>
				<Grid container item style={styles.cardContainer}>
					<Grid item container xs={12} sm={12} className='text-center'>
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
					<Grid item xs={12} sm={12}>
						<img src={state.cover.img} className='inline-block fullwidth' />
					</Grid>
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
