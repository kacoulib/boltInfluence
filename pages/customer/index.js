import React from 'react';

import Typography from '@material-ui/core/Typography';
import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import OutlinedButtons from '../../components/elements/OutlinedButtons';
import TextField from '@material-ui/core/TextField';




import Card from '../../components/elements/Card';


const CustomerIndex = () => (
	<div>
		<Grid container justify="center">
			<Grid item xs={6} sm={6}>
				<Grid container justify="center">
					<Grid item xs={10} sm={10} align="center">
						<Typography variant="h6" gutterBottom style={{ color: '#232941' }}>
							Bonjour Sam,
						</Typography>
						<Typography variant="h6" gutterBottom style={{ color: '#232941' }}>
							Nous sommes ravis de vous accueillir !
						</Typography>
					</Grid>
					<Grid item xs={6} sm={6} align="center">
						<Typography variant="h6" gutterBottom style={{ color: 'red' }}>
							Sam49
						</Typography>
							<img style={{borderRadius: '500px'}}src="https://via.placeholder.com/160x160"/>
						<Typography variant="h6" gutterBottom style={{ color: 'red' }}>
							profil 90% complete
						</Typography>
					</Grid>
					<Grid item xs={6} sm={6} style={{backgroundColor: '#DFDFFF'}}>
						<Typography align="center" variant="h6" gutterBottom style={{ color: '#232941' }}>
							Information profil
						</Typography>
						<Typography variant="h6" gutterBottom style={{ color: '#232941' }}>
							Contact
						</Typography>
						<Typography variant="h6" gutterBottom style={{ color: '#232941' }}>
							Connexion
						</Typography>
						<Typography variant="h6" gutterBottom style={{ color: '#232941' }}>
							Paiement
						</Typography>
						<Typography variant="h6" gutterBottom style={{ color: '#232941' }}>
							Tableau de bord
						</Typography>
						<Typography variant="h6" gutterBottom style={{ color: '#232941' }}>
							Media kit
						</Typography>
						<Typography variant="h6" gutterBottom style={{ color: '#232941' }}>
							Campagnes
						</Typography>
						<Typography variant="h6" gutterBottom style={{ color: '#232941' }}>
							Notes / Appréciations
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} style={{backgroundColor: '#232941'}}>
						<Typography align="center" variant="h6" gutterBottom style={{ color: '#FFF' }}>
							> Ouvrir mon profil
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6} sm={6}>
				<Grid container justify="center">
					<Grid item>
						<img src="https://via.placeholder.com/450x450"/>
					</Grid>
					<Grid item xs={12} sm={12} align="center">
						<Typography variant="h6" gutterBottom style={{ color: '#232941' }}>
							Decouvrez Wow !
						</Typography>
						<Grid item xs={6} sm={6} align="center">
							<Typography variant="h6" gutterBottom style={{ color: '#FFF', backgroundColor: "red" }}>
								> S'inscrire
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={4} sm={4} justify="center" align="center">
						<Grid item>
							<img src="https://via.placeholder.com/150x150"/>
							<Typography variant="h6" gutterBottom style={{ color: '#232941' }}>
								Decouvrez!
							</Typography>
							<Typography variant="h6" gutterBottom style={{ color: '#FFF', backgroundColor: 'red' }}>
								> Participer
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
		<Grid container style={{backgroundColor: '#232941'}}>
			<Grid item>
				<Typography variant="h5" gutterBottom style={{ color: '#FFF' }}>
					Top 4 "campagnes du moment"
				</Typography>
			</Grid>
			<Grid container style={{backgroundColor: '#232941'}}>
				<Grid item xs={3} sm={3}>
					<Card />
				</Grid>
				<Grid item xs={3} sm={3}>
					<Card />
				</Grid>
				<Grid item xs={3} sm={3}>
					<Card />
				</Grid>
				<Grid item xs={3} sm={3}>
					<Card />
				</Grid>
			</Grid>
		</Grid>
		<Grid container style={{backgroundColor: '#EEE'}}>
			<Grid item>
				<Typography variant="h5" gutterBottom style={{ color: '#232941' }}>
					Top 3 influencers
				</Typography>
			</Grid>
			<Grid container justify="center">
				<Grid item xs={3} sm={3}>
					<Card />
				</Grid>
				<Grid item xs={3} sm={3}>
					<Card />
				</Grid>
				<Grid item xs={3} sm={3}>
					<Card />
				</Grid>
			</Grid>
		</Grid>
	</div>
);

export default withLayout(CustomerIndex);
