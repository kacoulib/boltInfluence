import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = {
    container: { padding: '0 3em' },
    childContainer: { marginBottom: '3em' },
}

const Index = (props) => {
    const { loadMore, title } = props;

    return (
        <Grid container justify="center" alignItems='baseline' style={styles.container} >
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h2 className='no-margin-top'>{title}</h2>
                {props.children}
            </Grid>
            <Button onClick={() => loadMore()}>More</Button>
        </ Grid>
    )
}

export default Index;