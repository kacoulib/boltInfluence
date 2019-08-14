import { Grid } from '@material-ui/core';
import { Link } from '../../server/routes/next-routes'

const SocialBtnComp = ({ type = 'instagram', href = '#', text = 'Log in', onClick }) => (
    <div className={`btn-icon icon-${type}`} onClick={onClick}>
        <Link variant="contained" href={href} >
            <Grid container justify="center" alignItems="center" className='text-center'>
                <Grid item xs={2} sm={2}>

                    <span className={`icon`}></span>
                </Grid>
                <Grid item xs={10} sm={10}>
                    {text}
                </Grid>
            </Grid>
        </Link>
    </div>
)

export default SocialBtnComp;