import Grid from '@material-ui/core/Grid';
import Hooray from '../../../static/img/icon/hooray.png'

export default () => (
    <Grid container alignItems='center' justify="center" >

        <Grid item xs={12} sm={12} className='center-text'>

            <img src={Hooray} />
            <p>Félicitations pour cette belle campagne. </p>
            <p>La marque vous a laissé un petit mot :</p>

            <p>“Merci beaucoup pour cette experience”</p>

            <p>~ Adidas</p>
        </Grid>

    </ Grid>
)