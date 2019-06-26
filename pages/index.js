import React from 'react';
import Head from 'next/head';

import Grid from '@material-ui/core/Grid';
import Video from '../components/element/video'

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
				<Video style={{ width: '100%' }} src="maVideo.mp4" />
			</Grid>
		</Grid>

	</div>
)


export default withLayout(Index);
