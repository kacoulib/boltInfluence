import React from 'react';
import withLayout from '../../lib/withLayout';
import { Grid } from '@material-ui/core';
import Partners from '../../components/page/public/partners'
import ContactUs from '../../components/page/public/contactUs'

import girlboat from '../../static/img/girl-in-boat.jpg';

const styles = {
    leftContainer: {
        padding: '6.5em',
    },
    title: {
        lineHeight: '2rem'
    },
    double: {
        padding: 0,
        height: '100%',
        width: '100%'
    },
    contactUs: {
        padding: '2em 0',
    }
}

const AnnonceDemo = () => {

    const onSubmit = () => console.log('submit')

    return (
        <Grid container>
            <Grid id="description" container>
                <Grid container item sm={6} xs={12} alignItems="center" alignContent="center" style={styles.leftContainer}>
                    <h1 className="text-center" style={styles.title}> En incarnant votre marque, les influenceurs la rendent plus vivante et sensible</h1>
                    <p className="text-center">
                        Grâce à leur communauté, vous obtenez un moyen privilégié d'échange avec vos clients et futurs clients.
                    </p>
                </Grid>
                <Grid container item sm={6} xs={12} alignItems="center" style={styles.double}>
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