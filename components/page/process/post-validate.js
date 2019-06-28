import Grid from '@material-ui/core/Grid';
import Buttom from '@material-ui/core/Button';
import CustomButtom from '../../../components/elements/OutlinedButtons'
import Rectangle from '../../../static/img/rectangle.png';
import Slider from '../../dataDisplay/element/slider';

const fakeData = [
    { text: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula le develit, molestie sitela amet pretium consectetur. sit velit, amet pretium consectetu.#hashtagone #hasthagtwo #hashtagthree #hasthagfour' },
    { text: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula le develit, molestie sitela amet pretium consectetur. sit velit, amet pretium consectetu.#hashtagone #hasthagtwo #hashtagthree #hasthagfour' },
    { text: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula le develit, molestie sitela amet pretium consectetur. sit velit, amet pretium consectetu.#hashtagone #hasthagtwo #hashtagthree #hasthagfour' },
    { text: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula le develit, molestie sitela amet pretium consectetur. sit velit, amet pretium consectetu.#hashtagone #hasthagtwo #hashtagthree #hasthagfour' },
    { text: 'Lorem ipsum dolor sit sit amet, consectetur adipiscing elit. Suspendisse vel ligula le develit, molestie sitela amet pretium consectetur. sit velit, amet pretium consectetu.#hashtagone #hasthagtwo #hashtagthree #hasthagfour' },
]

export default () => {
    const settings = { slidesToShow: 2, dots: false };
    const selected = [0, 4];

    return (
        <Grid container alignItems='center' justify="center" >
            <Grid item xs={12} sm={8} className='center-text' p={1}>
                <Slider settings={settings}>
                    {fakeData.map((e, i) => (
                        <div key={i} className={`red-card ${selected.includes(i) ? 'selected' : ''} `}>
                            <img src={Rectangle} />
                            <p className='gray-color'>{e.text}</p>
                            <div className='selection'></div>
                        </div>
                    ))}
                </Slider>
                <CustomButtom>Validate</CustomButtom>
            </Grid>

        </ Grid>
    )
}