import React from 'react';
import Head from 'next/head';
import Card from '../components/dataDisplay/others/card'

import Grid from '@material-ui/core/Grid';

import withLayout from '../lib/withLayout';

const styles = {
	padding: {
		padding: '1rem 2rem'
	}
}
const Index = () => (
	<div className='dot-blue right-bg'>
		<div style={styles.padding}>

			<h1 className='bordered-head fullwidth'>À propos</h1>
			<Grid container>
				<Grid item xs={12} sm={6}>
					<Card title="Bolt Influence, c’est quoi ?" color='blue' />
				</Grid>
			</Grid>
		</div>

	</div>
)


export default withLayout(Index);
