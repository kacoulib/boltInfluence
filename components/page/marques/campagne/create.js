import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const cardContainer = {
    padding: '1rem',
    color: 'white',
    backgroundColor: '#242B45',
    margin: '.5em'
}

const styles = {
    cardContainer,
    container: { padding: '0 3em' },
    childContainer: { marginBottom: '3em' },
    cardText: { margin: '.5em 0 0' },
    syntaxRed: { color: '#F13F4B' },
    stars: { width: '50%' },
    influencer_img_container: { height: 'auto', paddingTop: 5 },
    influencer_info_container: { padding: '1rem' },
    fullwidth: { width: '100%' }
}


const Index = ({ datas, selectedMarqueAgence, selectMarquesAgences, loadMore }) => {
    return (
        <Grid container alignItems='center' justify="center" style={styles.container} >
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h2>Nouvelle campagne</h2>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <Select
                            fullWidth
                            inputProps={{
                                name: 'age',
                                id: 'age-simple',
                            }}
                        >
                            <MenuItem value="" disabled>
                                Placeholder
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="filled-bare"
                            defaultValue="Titre de la campagne"
                            margin="normal"
                            variant="filled"
                            inputProps={{ 'aria-label': 'bare' }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h2>Description de la campagne</h2>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="filled-bare"
                            defaultValue=""
                            margin="normal"
                            variant="filled"
                            inputProps={{ 'aria-label': 'bare' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                    </Grid>
                </Grid>
            </Grid>
        </ Grid>
    )
}

Index.propTypes = {
    datas: PropTypes.object.isRequired,
    selectMarquesAgences: PropTypes.func.isRequired,
    loadMore: PropTypes.func
}

export default Index;