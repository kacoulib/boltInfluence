import React from 'react';
import Head from 'next/head';

import Grid from '@material-ui/core/Grid';
import styles from './SharedStyles';


import withLayout from '../lib/withLayout';
import Typography from '@material-ui/core/Typography';

const Index = () => (
	<div style={{ padding: '10px 45px' }}>
	<Head>
		<title>Settings</title>
		<meta
			name="description"
			content="Welcome."
		/>
	</Head>
	<p>Welcome </p>
	<Grid container>
		<Grid item sm={12}>
			<video controls style={{width: '100%'}}>
				<source src="maVideo.mp4" type="video/mp4" />
				<p>Votre navigateur ne prend pas en charge les vidéos HTML5.
				Voici <a href="myVideo.mp4">un lien pour télécharger la vidéo</a>.</p>
				<div style={styles.videoOverlay}>
				<p>Content above your video</p>
				</div>
			</video>
		</Grid>
		<Grid container>
			<Grid item align="center" style={{padding: '40px'}} xs={12} sm={12}>
				<Typography variant="h4" gutterBottom style={{color: '#232941'}}>
					Comment rendons-nous l'influence marketing scalable
				</Typography>
			</Grid>
			<Grid item align="center" style={{padding: '40px'}} xs={6} sm={6}>
				<img src="https://via.placeholder.com/400x250" />
			</Grid>
			<Grid item align="center" alignItems="center" style={{padding: '40px'}} xs={6} sm={6}>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Stratégie de contenu
				</Typography>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Lignes éditoriales
				</Typography>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Stratégie de plateforme
				</Typography>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Production
				</Typography>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Edition
				</Typography>
			</Grid>
		</Grid>
		<Grid container style={{backgroundColor: "#DDD"}}>
			<Grid item align="center" style={{padding: '40px'}} xs={12} sm={12}>
				<Typography variant="h4" gutterBottom style={{color: '#232941'}}>
					Data et Technologie
				</Typography>
			</Grid>
			<Grid item align="center" alignItems="center" style={{padding: '40px'}} xs={6} sm={6}>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Search influenceurs
				</Typography>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Prévention de la fraude
				</Typography>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Affinité influenceurs/marque
				</Typography>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Audience et analytics
				</Typography>
			</Grid>
			<Grid item align="center" style={{padding: '40px'}} xs={6} sm={6}>
				<img src="https://via.placeholder.com/400x250" />
			</Grid>
		</Grid>
		<Grid container>
			<Grid item align="center" style={{padding: '40px'}} xs={6} sm={6}>
				<img src="https://via.placeholder.com/400x250" />
			</Grid>
			<Grid item align="center" alignItems="center" style={{padding: '40px'}} xs={6} sm={6}>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Managment et optimization
				</Typography>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Relation influenceurs
				</Typography>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Account managment
				</Typography>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Qualité de service
				</Typography>
				<Typography variant="h5" gutterBottom style={{color: '#232941'}}>
					Logistique
				</Typography>
			</Grid>
		</Grid>
	</Grid>

  </div>
)


export default withLayout(Index);
