import Grid from '@material-ui/core/Grid';
import NounLoading from '../../../static/img/icon/noun-loading.png'

export default () => (
    <Grid container alignItems='center' justify="center" >

        <Grid item xs={12} sm={12} className='center-text'>

            <img src={NounLoading} />
            <h3>Votre candidature pour cette campagne est en cours d'examen.</h3>
        </Grid>

    </ Grid>
)
