import React from 'react';

import Typography from '@material-ui/core/Typography';
import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import OutlinedButtons from '../../components/elements/OutlinedButtons';
import TextField from '@material-ui/core/TextField';




import Card from '../../components/elements/Card';


const NewsDetails = () => (
	<div style={{ padding: '10px 45px' }}>
		<Grid container>
			<Typography variant="h4" gutterBottom style={{ color: '#232941' }}>
				Les nouveautés à voter
			</Typography>
		</Grid>
		<Grid container>
			<Grid item align="center" xs={12} sm={12}>
				<Typography variant="h4" gutterBottom style={{ color: 'red' }}>
					Decouvrez, partagez et votez pour les dernieres nouveautes
				</Typography>
			</Grid>
		</Grid>
		<Grid container justify="center">
			<Grid item align="center" xs={2} sm={2}>
				<OutlinedButtons>
					MODE 3
				</OutlinedButtons>
			</Grid>
			<Grid item align="center" xs={2} sm={2}>
				<OutlinedButtons>
					VOYAGE 3
				</OutlinedButtons>
			</Grid>
			<Grid item align="center" xs={2} sm={2}>
				<OutlinedButtons>
					VOYAGE 3
				</OutlinedButtons>
			</Grid>
			<Grid item align="center" xs={2} sm={2}>
				<OutlinedButtons>
					VOYAGE 3
				</OutlinedButtons>
			</Grid>
		</Grid>
		<Grid container spacing={3} align="center" justify="center" alignItems="center">
			<Grid item>
				<Card image="https://via.placeholder.com/350x220"/>
			</Grid>
			<Grid item>
				<Card image="https://via.placeholder.com/350x220"/>
			</Grid>
			<Grid item>
				<Card image="https://via.placeholder.com/350x220"/>
			</Grid>
		</Grid>
		<Grid container align="center">
			<Grid item xs={12} sm={12} justify="center">
				<img src="https://via.placeholder.com/920x450"/>
			</Grid>
		</Grid>
		<Grid container align="center" alignItems="center" justify="center">
			<Grid item xs={6} sm={6} justify="center">
				<Typography variant="h5" gutterBottom style={{ color: 'blue' }}>
					Decouvrez, partagez et votez pour les dernieres nouveautes
				</Typography>
				<p style={{textAlign: "justify"}}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum euismod pulvinar. Praesent vel eleifend lorem. Integer vel erat a arcu porta accumsan. Duis eu diam velit. Morbi quam dui, feugiat sit amet vehicula id, pulvinar in orci. Morbi efficitur elementum mauris et tempus. Praesent consectetur ipsum eu turpis lobortis, non eleifend tortor fringilla. Morbi augue mauris, consequat sit amet lobortis ac, semper a ante. Vivamus condimentum nunc quis ligula fringilla, vel porta nisi elementum. Nulla ac elementum nisl. Integer scelerisque non felis non iaculis. Cras quis orci lacinia, scelerisque massa in, laoreet nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean laoreet lacinia laoreet.
				</p>
			</Grid>
			<Grid item xs={3} sm={3} justify="center">
				<img src="https://via.placeholder.com/100x100"/>
				<img src="https://via.placeholder.com/100x100"/>
				<img src="https://via.placeholder.com/100x100"/>
			</Grid>
		</Grid>
		<Grid container style={{background: "#EEE"}}>
			<Grid item xs={2} sm={2}>
				<Typography variant="h6" gutterBottom style={{ color: 'red' }}>
					<img src="https://via.placeholder.com/20x20"/>
					20
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant="h6" gutterBottom style={{ color: 'red' }}>
					Commentaires
				</Typography>
			</Grid>
		</Grid>
		<Grid container>
			<Grid item xs={1} sm={1}>
				<img src="https://via.placeholder.com/30x30"/>
			</Grid>
			<Grid item xs={2} sm={2}>
				<Typography variant="h6" gutterBottom style={{ color: 'red' }}>
					Lina Smith
				</Typography>
				il y a 2 heures
			</Grid>
			<Grid item xs={8} sm={8}>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum euismod pulvinar. Praesent vel eleifend lorem. Integer vel erat a arcu porta accumsan. Duis eu diam velit. Morbi quam dui, feugiat sit amet vehicula id, pulvinar in orci. Morbi efficitur elementum mauris et tempus.
				</p>
			</Grid>
		</Grid>
		<Grid container>
			<Grid item xs={1} sm={1}>
				<img src="https://via.placeholder.com/30x30"/>
			</Grid>
			<Grid item xs={2} sm={2}>
				<Typography variant="h6" gutterBottom style={{ color: 'red' }}>
					Peter Smith
				</Typography>
				il y a 2 heures
			</Grid>
			<Grid item xs={8} sm={8}>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum euismod pulvinar. Praesent vel eleifend lorem. Integer vel erat a arcu porta accumsan. Duis eu diam velit. Morbi quam dui, feugiat sit amet vehicula id, pulvinar in orci. Morbi efficitur elementum mauris et tempus.
				</p>
			</Grid>
		</Grid>

		<Grid container>
			<Grid item xs={1} sm={1}>
				<img src="https://via.placeholder.com/30x30"/>
			</Grid>
			<Grid item xs={2} sm={2}>
				<Typography variant="h6" gutterBottom style={{ color: 'red' }}>
					Peter Smith
				</Typography>
				il y a 2 heures
			</Grid>
			<Grid item xs={8} sm={8}>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum euismod pulvinar. Praesent vel eleifend lorem. Integer vel erat a arcu porta accumsan. Duis eu diam velit. Morbi quam dui, feugiat sit amet vehicula id, pulvinar in orci. Morbi efficitur elementum mauris et tempus.
				</p>
			</Grid>
		</Grid>
		<Grid container>
			<Grid item xs={12} sm={12} justify="center" align="center">
				<TextField
					style={{width: "800px"}}
				  id="standard-multiline-static"
				  label="Multiline"
				  multiline
				  rowsMax="10"
				  margin="normal"
				/>
			</Grid>
		</Grid>

	</div>
);

export default withLayout(NewsDetails);
