import React from 'react';

import Typography from '@material-ui/core/Typography';
import withLayout from '../../lib/withLayout';
import Grid from '@material-ui/core/Grid';

import TabContainer from '../../components/elements/Tabs';

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim malesuada nunc, sed vehicula diam dapibus quis. Suspendisse a suscipit dolor, sit amet sagittis erat. Nunc accumsan mauris at tortor auctor sagittis. Aenean maximus lectus tristique, lobortis nunc quis, mollis est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec viverra sollicitudin diam, quis luctus ligula blandit sit amet.";


const Campagne = () => (

	<div>
		<Grid container>
			<Typography variant="h4" gutterBottom style={{ color: '#232941' }}>
				Campagnes
			</Typography>
		</Grid>
		<Grid container>
			<Grid item xs={12} sm={12} justify="center" align="center">
				<img src="https://via.placeholder.com/1000x500" />
			</Grid>
		</Grid>
		<TabContainer
			item1="La campagne"
			item2="La marque"
			item1Child={text}
		/>
		<Grid container justify="center" align="center">
			<Grid item xs={2} sm={2}>
				<img src="https://via.placeholder.com/150x150" />
			</Grid>
			<Grid item xs={2} sm={2}>
				<img src="https://via.placeholder.com/150x150" />
			</Grid>
			<Grid item xs={2} sm={2}>
				<img src="https://via.placeholder.com/150x150" />
			</Grid>
		</Grid>
		<Grid container style={{ backgroundColor: '#232941' }}>
			<Grid item>
				<Typography variant="h5" gutterBottom style={{ color: '#FFF' }}>
					Les Contenus
				</Typography>
			</Grid>
			<Grid container align="center" justify="center">
				<Grid item xs={3} sm={3} style={{ color: '#232941', backgroundColor: '#FFF' }}>
					<img src="https://via.placeholder.com/150x150" />
					<Typography variant="h5" gutterBottom style={{ color: '#232941', backgroundColor: '#FFF' }}>
						2 Videos
					</Typography>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim malesuada nunc, sed vehicula diam dapibus quis. Suspendisse a suscipit dolor, sit amet sagittis erat. Nunc accumsan mauris at tortor auctor sagittis. Aenean maximus lectus tristique, lobortis nunc quis, mollis est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec viverra sollicitudin diam, quis luctus ligula blandit sit amet. Etiam ut enim tincidunt, accumsan velit ut, volutpat felis. Nulla ac diam risus.
					</p>
					<img src="https://via.placeholder.com/150x150" />
				</Grid>
				<Grid item xs={3} sm={3} style={{ color: '#232941', backgroundColor: '#FFF' }}>
					<img src="https://via.placeholder.com/150x150" />
					<Typography variant="h5" gutterBottom style={{ color: '#232941', backgroundColor: '#FFF' }}>
						2 Videos
					</Typography>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim malesuada nunc, sed vehicula diam dapibus quis. Suspendisse a suscipit dolor, sit amet sagittis erat. Nunc accumsan mauris at tortor auctor sagittis. Aenean maximus lectus tristique, lobortis nunc quis, mollis est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec viverra sollicitudin diam, quis luctus ligula blandit sit amet. Etiam ut enim tincidunt, accumsan velit ut, volutpat felis. Nulla ac diam risus.
					</p>
					<img src="https://via.placeholder.com/150x150" />
				</Grid>
				<Grid item xs={3} sm={3} style={{ color: '#232941', backgroundColor: '#FFF' }}>
					<img src="https://via.placeholder.com/150x150" />
					<Typography variant="h5" gutterBottom style={{ color: '#232941', backgroundColor: '#FFF' }}>
						2 Videos
					</Typography>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim malesuada nunc, sed vehicula diam dapibus quis. Suspendisse a suscipit dolor, sit amet sagittis erat. Nunc accumsan mauris at tortor auctor sagittis. Aenean maximus lectus tristique, lobortis nunc quis, mollis est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec viverra sollicitudin diam, quis luctus ligula blandit sit amet. Etiam ut enim tincidunt, accumsan velit ut, volutpat felis. Nulla ac diam risus.
					</p>
					<img src="https://via.placeholder.com/150x150" />
				</Grid>
			</Grid>
			<Grid container>
				<Grid item xs={12} sm={12} style={{ color: '#232941', backgroundColor: '#FFF' }}>
					<Typography variant="h5" gutterBottom>
						Les Inspirations
					</Typography>
				</Grid>
				<Grid item justify="center" align="center" xs={12} sm={12} style={{ color: '#232941', backgroundColor: '#FFF' }}>
					<img src="https://via.placeholder.com/800x400" />
				</Grid>
			</Grid>
			<Grid container style={{ color: '#232941', backgroundColor: '#DDD' }}>
				<Grid item xs={12} sm={12} style={{ color: '#232941' }}>
					<Typography variant="h5" gutterBottom>
						Les Conditions
					</Typography>
				</Grid>
				<Grid container>
					<Grid item xs={2} sm={2} style={{ color: '#232941' }}>
						<img src="https://via.placeholder.com/180x180" />
					</Grid>
					<Grid item justify="center" align="center" xs={10} sm={10}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim malesuada nunc, sed vehicula diam dapibus quis. Suspendisse a suscipit dolor, sit amet sagittis erat. Nunc accumsan mauris at tortor auctor sagittis. Aenean maximus lectus tristique, lobortis nunc quis, mollis est. Interdum et malesuada fames ac ante ipsum primis in faucibus.
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={2} sm={2} style={{ color: '#232941' }}>
						<img src="https://via.placeholder.com/180x180" />
					</Grid>
					<Grid item justify="center" align="center" xs={10} sm={10}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim malesuada nunc, sed vehicula diam dapibus quis. Suspendisse a suscipit dolor, sit amet sagittis erat. Nunc accumsan mauris at tortor auctor sagittis. Aenean maximus lectus tristique, lobortis nunc quis, mollis est. Interdum et malesuada fames ac ante ipsum primis in faucibus.
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={2} sm={2} style={{ color: '#232941' }}>
						<img src="https://via.placeholder.com/180x180" />
					</Grid>
					<Grid item justify="center" align="center" xs={10} sm={10}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim malesuada nunc, sed vehicula diam dapibus quis. Suspendisse a suscipit dolor, sit amet sagittis erat. Nunc accumsan mauris at tortor auctor sagittis. Aenean maximus lectus tristique, lobortis nunc quis, mollis est. Interdum et malesuada fames ac ante ipsum primis in faucibus.
					</Grid>
				</Grid>
			</Grid>
			<Grid container align="center">
				<Grid item xs={6} sm={6}>
					<img src="https://via.placeholder.com/400x500" />
				</Grid>
				<Grid item xs={6} sm={6}>
					<Typography variant="h5" gutterBottom style={{ color: '#FFF' }}>
						Le reward
					</Typography>
					<p style={{ color: '#FFF' }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim malesuada nunc, sed vehicula diam dapibus quis. Suspendisse a suscipit dolor, sit amet sagittis erat. Nunc accumsan mauris at tortor auctor sagittis. Aenean maximus lectus tristique, lobortis nunc quis, mollis est. Interdum et malesuada fames ac ante ipsum primis in faucibus.
					</p>
				</Grid>
				<Grid item xs={12} sm={12} style={{ backgroundColor: '#000' }}>
					<p style={{ color: '#FFF' }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim malesuada nunc, sed vehicula diam dapibus quis. Suspendisse a suscipit dolor, sit amet sagittis erat. Nunc accumsan mauris at tortor auctor sagittis. Aenean maximus lectus tristique, lobortis nunc quis, mollis est. Interdum et malesuada fames ac ante ipsum primis in faucibus.
					</p>
				</Grid>
			</Grid>
		</Grid>
	</div>
);

export default withLayout(Campagne);
