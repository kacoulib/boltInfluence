import React from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = {
    container: {padding: '0 3em'},
    spaceBottom: {marginBottom: '1rem', backgroundColor: "#F4F3F8"},
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
};

const Campagne = () => {

    return (
        <Grid container style={styles.container}>
            <Grid container spacing={2} style={styles.spaceBottom}>
                <Grid item>
                    <img style={styles.img} alt="complex" src="/static/images/grid/complex.jpg" />
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <p>Campagne Naked blushed</p>
                            <p>Sephora</p>
                        </Grid>
                    </Grid>
                    <Grid item xs container direction="row" spacing={2}>
                        <span>Aperçu</span>
                        <span>Aperçu</span>
                        <span>Aperçu</span>
                        <span>Aperçu</span>
                        <span>Aperçu</span>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
    );
}

export default Campagne;