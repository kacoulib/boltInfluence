import Grid from '@material-ui/core/Grid';
import Hooray from '../../../static/img/icon/hooray.png'

export default () => (
    <Grid container alignItems='center' justify="center" >

        <Grid item xs={12} sm={12} className='center-text'>

            <img src={Hooray} />
            <h3>Votre candidature pour cette campagne a été validée !</h3>
            <p>Vous pouvez maintenant commencer à remplir tous les éléments requis.</p>
        </Grid>

    </ Grid>
)