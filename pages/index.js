import React from 'react';
import Head from 'next/head';

import Grid from '@material-ui/core/Grid';
import styles from './SharedStyles';


import withLayout from '../lib/withLayout';

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
	</Grid>

  </div>
)


export default withLayout(Index);
