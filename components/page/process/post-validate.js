import Grid from '@material-ui/core/Grid';
import Buttom from '@material-ui/core/Button';
// import CustomButtom from '../../'
// import Hooray from '../../../static/img/icon/hooray.png';
import Slider from '../../dataDisplay/element/slider';

export default () => (
    <Grid container alignItems='center' justify="center" >
        <Grid item xs={12} sm={12} className='center-text'>

            <Slider>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
            <Buttom>Validate</Buttom>
        </Grid>

    </ Grid>
)