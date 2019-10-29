import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

const NavBackComp = ({ redirectUrl, title, children }) => (
    <Grid container>
        <Grid item xs={12} sm={12}>
            <Grid container>
                <Grid item xs={12} sm={3}>
                    <h2 id='subMenuTitle' className='text-right'>
                        <Link prefetch href={redirectUrl}>
                            <a>{title}</a>
                        </Link>
                    </h2>
                </Grid>
            </Grid>
        </Grid>
        <Grid item>
            {children}
        </Grid>
    </Grid>
)

export default NavBackComp