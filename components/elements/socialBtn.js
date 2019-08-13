import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { Link } from '../../server/routes/next-routes'
const styles = {
    buttonIcon: {
        marginRight: '10px',
    },
    instagramButton: {
        color: 'white',
        background: '#f09433',
        background:
            '-moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
        background:
            '-webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
        background:
            'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
        filter:
            "progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 ",
    },
    styleLoginButton: {
        margin: '5px',
        padding: '1rem',
        borderRadius: '5px',
        textTransform: 'none',
        font: '16px Muli',
        fontWeight: '400',
        letterSpacing: '0.01em',
        color: 'white',
        backgroundColor: '#F32732',
    }
};

const SocialBtnComp = ({ type = 'instagram', href = '#', text = 'Log in', onClick }) => {

    return (

        // <Link href={`${ href }`}><a title='#' className='red-btn bold' onClick={onClick}>{text || 'Contact'}</a></Link>
        <div className={`btn-icon icon-${type}`} id='toto'>
            <Link variant="contained" href="/auth/google" >
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
}

export default SocialBtnComp;