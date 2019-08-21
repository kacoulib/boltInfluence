import React from 'react';
import withLayout from '../../lib/withLayout';
import { Grid } from '@material-ui/core';
import Partners from '../../components/page/public/partners'
import ContactUs from '../../components/page/public/contactUs'

import girlboat from '../../static/img/girl-in-boat.jpg';
import { NextSeo } from 'next-seo';

const styles = {
    leftContainer: {
        padding: '4rem',
    },
    title: {
        marginBottom: 0,
    },
    double: {
        padding: 0,
        height: '100%',
        width: '100%'
    },
    contactUs: {
        padding: '3rem 0',
    }
}

const AnnonceDemo = () => {

    const onSubmit = () => console.log('submit')

    return (
        <Grid container>
            <NextSeo
                title="Bolt Influence Agences"
                description="Vous êtes un annonceur ou une agence, Bolt Influence vous conseille sur la sélection rapide et authentique d’influenceurs ayant un ROI bien supérieur à une campagne de publicité classique."
            />
            <Grid id="description" container>
                <Grid container item sm={6} xs={12} alignItems="center" alignContent="center" style={styles.leftContainer}>
                    <h1 style={styles.title}> En incarnant votre marque, les influenceurs la rendent plus vivante et sensible</h1>
                    <p>Grâce à leur communauté, vous obtenez un moyen privilégié d'échange avec vos clients et futurs clients.</p>
                </Grid>
                <Grid container item sm={6} xs={12} alignItems="center" style={styles.double} className='responsive-hide'>
                    <div className='card-bg dots-pink' style={styles.double}>
                        <Grid item container className='card-bg dots-pink reverse-all' style={styles.double}>
                            <Grid item container className='card-bg dots-pink reverse-all' style={styles.double}>
                                <Grid item container alignItems="center" alignContent="center" style={styles.double}>
                                    <img src={girlboat} alt="" className='auto' />
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <Grid container alignContent="center" style={styles.contactUs}>
                <Grid item xs={12} sm={2} className='text-center'></Grid>
                <Grid item xs={12} sm={8} className='text-center'>
                    <ContactUs onSubmit={onSubmit} />
                </Grid>
                <Grid item xs={12} sm={2} className='text-center'></Grid>
                <Partners />
            </Grid>
        </Grid>
    );
}

export default withLayout(AnnonceDemo)