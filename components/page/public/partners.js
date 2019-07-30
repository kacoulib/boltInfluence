import Grid from '@material-ui/core/Grid';
import Partners from '../../../static/img/partners.png'

const styles = {
    partners: {
        padding: '2rem 0',
        backgroundColor: 'white'
    },
    partnersTitle: {
        padding: '0 0 1rem'
    },
}

const PartnersComp = () => (
    <Grid container style={styles.partners} >
        <Grid item xs={12} sm={12} className='text-center' style={styles.partnersTitle}><h3>Il nous font confiance</h3></Grid>
        <Grid item xs={12} sm={12} className='text-center'>
            <img src={Partners} />
        </Grid>
    </Grid>
)
export default PartnersComp