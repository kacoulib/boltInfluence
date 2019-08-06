import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import withLayout from '../../../lib/withLayout';
import Search from '../../../components/elements/search'
import { Link } from '@material-ui/core';
import Socials from '../../../components/elements/socials';
import { useRouter } from 'next/router'
import moment from 'moment'
moment.locale('fr')

const styles = {
	cardContainer: {
		padding: '0 0 2rem 0',
		// marginBottom: '3rem'
	},
	padding: {
		padding: '1rem 2rem',
	},
	contentContainer: {
		padding: '0 2rem 2rem',
	},
	verticalPadding: {
		fontSize: '1.8rem',
		padding: '1rem 2rem 0',
	},
	title: {
		fontSize: '1.5rem',
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
	date: {
		padding: '.3rem',
		color: '#656464'
	},
	socialListContainer: {
		padding: '0 0 1rem 0'
	},
	socialList: {
		width: 25,
		height: 25,
		margin: '0 1rem'
	}
}

const displayList = (data, prefix = '') => (<ul>{data && data.map((elem, index) => <li key={index}><Link href={`/category=${elem.id}`}><a title={elem.title}>{`${prefix}${elem.title}`}</a></Link></li>)}</ul>)

const Index = () => {
	const router = useRouter()
	const { article } = router.query

	console.log(article)

	return (
		<div id='blog'>
			<div>
				<h2 style={styles.verticalPadding}><Link href='/blog'><a title='blog'>{'<'}</a></Link><span>Blog</span></h2>
				<Grid container item style={styles.cardContainer}>
					<Grid item container xs={12} sm={12} className='text-center'>
						<Grid item xs={12} sm={2}></Grid>
						<Grid item xs={12} sm={8} style={styles.padding}>
							<h1 className='red-color' style={styles.title}>{article.title}</h1>
							<p className='text-center italic' style={styles.date}>
								{moment(article.create_at).format('LLLL')}
							</p>
							<div>
								<img src={article.author && article.author.picture || '../../../static/img/user.png'} className='inline-block icon' />
								<h3 className='inline-block vertical-top no-margin' style={styles.fullName}>{article.author}</h3>
							</div>
						</Grid>
						<Grid item xs={12} sm={2}></Grid>
					</Grid>
					<Grid item xs={12} sm={12}>
						<img src={article.picture} className='inline-block fullwidth' />
					</Grid>
				</Grid>
			</div>
			{/*  */}
			<div>
				<Grid container item style={styles.contentContainer} className='single-content-container' direction="row-reverse">
					<Grid item container xs={12} sm={4}>
						<aside>
							<Grid item container xs={12} sm={12}>

								<Grid item xs={12} sm={12}>
									<Socials parent={styles.socialListContainer} child={styles.socialList} />
								</Grid>

								<Grid item container xs={12} sm={12}>
									<Search />
								</Grid>
								<Grid item xs={6} sm={12} className='single-categoryList'>
									<h2>Catégories</h2>
									{displayList(article.categories)}
								</Grid>
								<Grid item xs={6} sm={12} className='single-categoryList'>
									<h2>Hashtags</h2>
									{displayList(article.tags, '#')}
								</Grid>
							</Grid>
						</aside>
					</Grid>
					<Grid item xs={12} sm={8} className='single-content justify'>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sapien dui, luctus ac neque tincidunt, facilisis mollis massa. Aenean vestibulum scelerisque viverra. Donec finibus leo ut auctor porta. Aliquam urna erat, tristique vel tempor ac, tempus id augue. Ut laoreet congue mattis. Nulla risus lacus, tincidunt sit amet augue ut, auctor malesuada arcu. Quisque quis pharetra est, non sollicitudin est. Praesent rhoncus, purus nec fermentum pulvinar, erat mauris ornare sapien, ac elementum enim orci vel magna. Sed sed interdum neque. Fusce at ligula et ligula euismod facilisis lacinia non diam. In ac dolor consequat, euismod sapien et, vestibulum justo. Proin in facilisis lacus.</p>
						<p>Integer ac lectus hendrerit, fermentum purus sit amet, suscipit mi. Ut blandit tempor nibh id vestibulum. Cras lorem tellus, elementum eu justo id, cursus aliquet metus. Aenean magna tellus, rhoncus at lacinia id, vehicula eget mi. Quisque maximus, orci ut convallis euismod, velit odio eleifend massa, ac viverra velit velit in ligula. Donec imperdiet, ipsum ut varius lobortis, velit metus hendrerit ligula, sed convallis lectus dui ac ligula. Proin turpis ex, sagittis ut nunc quis, viverra semper metus. Phasellus neque enim, congue non viverra congue, sagittis eget ipsum.</p>

						<p>Duis maximus sem sed tellus viverra, vitae lacinia felis fringilla.</p>
						<p>Nulla velit mi, porta non lorem ut, cursus lacinia turpis. Nunc felis ex, pretium a elit ut, imperdiet ullamcorper diam. Duis libero dui, posuere ac risus sed, interdum efficitur ex. Nam enim orci, fermentum in enim quis, tristique interdum velit. Curabitur auctor leo lobortis magna ultrices, vitae scelerisque lacus ultricies. Cras placerat imperdiet tempor.</p>

						<p>Aliquam turpis metus, placerat vel sagittis aliquam, venenatis vel arcu. Pellentesque convallis arcu a pulvinar ullamcorper. Nunc nec lorem sit amet mauris auctor vehicula eget nec tortor. Phasellus blandit aliquam ligula, sollicitudin viverra erat accumsan sit amet. Aliquam a erat nec dolor tempor vestibulum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam sed placerat eros. Praesent euismod porttitor sem, vel faucibus libero mattis in. Duis faucibus facilisis purus ac feugiat. Morbi imperdiet vulputate nibh, eu venenatis enim tristique eu. Curabitur sit amet dignissim urna, ut egestas ligula. Praesent congue imperdiet augue at vestibulum. Phasellus lacinia magna sed nunc consequat ultricies. Vivamus suscipit ante id turpis porttitor porttitor.				</p>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}


export default withLayout(Index);
