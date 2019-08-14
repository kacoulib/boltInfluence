import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import withLayout from '../../../lib/withLayout';
import { grayColor } from '../../../utils/variables/css'
import TextTruncate from 'react-text-truncate';
import moment from 'moment'
import { customRequest } from '../../../lib/api/http/index';
import { Link } from '../../../server/routes/next-routes'
moment.locale('fr')

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


const Index = ({ articles, categories }) => {
	const [state, setState] = useState({
		cover: {
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit. ',
			img: '../static/img/team.jpg',
			resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit. ',
			author: {
				firstName: 'Matthieu',
				lastName: 'Lopez',
				img: '../../../static/img/user.png'
			},
		},
		articles,
		categories,
		filterCategory: null
	})

	const toggleCategory = (id) => setState({ ...state, ...{ filterCategory: id != state.filterCategory ? id : null } });
	const filtedArticles = state.filterCategory ? state.articles.filter((e) => e.categories.find(j => j._id == state.filterCategory)) : state.articles

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
							<Grid item key={i} container xs={12} sm={3} style={styles.p} onClick={() => toggleCategory(e._id)}>
								<Grid item key={i} container xs={12} className={`filter ${e.color} ${state.filterCategory == e._id ? 'active' : ''}`} style={{ border: `1px solid ${e.color}`, }} justify="space-between" >
									<div style={{ color: e.color }}>{e.title}</div>
									<div style={{ backgroundColor: e.color }}>{e.nb || 3}</div>
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
						let color = state.categories.find(e => e._id == elem.categories._id);
						color = color ? color.color : '';

						return (
							<Grid key={index} item container xs={12} sm={4} justify="center" alignItems="center" style={styles.filter}>
								<article className='gray-border'>
									<header><img src={elem.picture} className='fullwidth' /></header>
									<div style={styles.p}>
										{elem.categories.map((e, i) =>
											<div key={i} className='text-center inline-block'>
												<span className={`article-ategory ${color}`} style={{ backgroundColor: e.color }}>{e.title}</span>
											</div>
										)}
										<h1>{elem.title}</h1>
										<TextTruncate
											line={5}
											element="p"
											truncateText="…"
											text={elem.content}
											textTruncateChild={<Link route='notre-methode/blog/single' params={{ slug: elem.title }}><a title={elem.title} className='red-color'><span>Lire</span></a></Link>}
										/>
									</div>
									<footer className='text-center' style={styles.footer}>
										{moment(elem.created_at).format('LLLL')}
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
Index.getInitialProps = async () => {
	const blogs = await customRequest({ path: '/public/blogs' });

	return blogs
}



export default withLayout(Index);
