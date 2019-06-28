import React from 'react';

import Typography from '@material-ui/core/Typography';
import withLayout from '../lib/withLayout';
import withAuth from '../lib/withAuth';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import OutlinedButtons from '../components/elements/OutlinedButtons';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';


import Card from '../components/elements/Card';


const Campagnes = () => (
	<div>
		<Grid container>
			<Grid item xs={4} sm={4} justify="center" align="center">
				<Typography variant="h5" gutterBottom style={{ color: '#232941' }}>
					Campagnes
				</Typography>
			</Grid>
		</Grid>
		<Grid container justify="flex-end">
			<Grid item xs={7} sm={7}>
				<Grid container>
					<Grid item xs={2} sm={2}>
						<OutlinedButtons>MODE 3</OutlinedButtons>
					</Grid>
					<Grid item xs={2} sm={2}>
						<OutlinedButtons>VOYAGE 3</OutlinedButtons>
					</Grid>
					<Grid item xs={2} sm={2}>
						<OutlinedButtons>MAMAN 3</OutlinedButtons>
					</Grid>
					<Grid item xs={2} sm={2}>
						<OutlinedButtons>AUTRES 3</OutlinedButtons>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
		<Grid container>
			<Grid item xs={3} sm={3}>
				<ExpansionPanel>
				  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="h5">Type de Campagne</Typography>
				  </ExpansionPanelSummary>
				  <ExpansionPanelDetails>
				  	<Grid item xs={12} sm={12}>
						<Checkbox />
						<Typography variant="h5">
							Video Youtube
						</Typography>
				  	</Grid>
				  	<Grid item xs={12} sm={12}>
						<Checkbox />
						<Typography variant="h5">
							Video Youtube
						</Typography>
				  	</Grid>
				  	<Grid item xs={12} sm={12}>
						<Checkbox />
						<Typography variant="h5">
							Video Youtube
						</Typography>
				  	</Grid>
				  	<Grid item xs={12} sm={12}>
						<Checkbox />
						<Typography variant="h5">
							Video Youtube
						</Typography>
				  	</Grid>
				  </ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel>
				  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="h5">
					  Type de revenu
					</Typography>
				  </ExpansionPanelSummary>
				  <ExpansionPanelDetails>
					<Typography>
					  Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
					  diam eros in elit. Pellentesque convallis laoreet laoreet.
					</Typography>
				  </ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel>
				  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="h5">
					  Statut de la Campagne
					</Typography>
				  </ExpansionPanelSummary>
				  <ExpansionPanelDetails>
					<Typography>
					  Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
					  diam eros in elit. Pellentesque convallis laoreet laoreet.
					</Typography>
				  </ExpansionPanelDetails>
				</ExpansionPanel>
			</Grid>
		</Grid>

	</div>
);

export default withLayout(Campagnes);
