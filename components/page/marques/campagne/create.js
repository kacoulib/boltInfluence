import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Upload from '../../../form/upload'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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
                <h2 className='red-color'>Nouvelle campagne</h2>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <FormControl >
                            <InputLabel htmlFor='age-simple'>Choisir la marque</InputLabel>
                            <Select
                                fullWidth
                                inputProps={{
                                    name: 'age',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value={10}>Marque 1</MenuItem>
                                <MenuItem value={20}>Marque 2</MenuItem>
                                <MenuItem value={30}>Marque</MenuItem>
                            </Select>
                        </FormControl>
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
                    <Grid item xs={12} sm={6} className='center-text'>
                        <Upload label='Image de la campagne' />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h2>Description de la campagne</h2>
                <Grid container>
                    <Grid container item xs={12} sm={12}>
                        <Grid item xs={12} sm={6}>
                            <h3>Description de la campagne</h3>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h3>Conditions</h3>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="filled-bare"
                                label='Brief/description détaillé de la campagne'
                                defaultValue=""
                                margin="normal"
                                variant="filled"
                                multiline
                                fullWidth
                                rows='14'
                                inputProps={{ 'aria-label': 'bare', }}
                                styles={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} justify='center' className='center-text'>
                        <Button variant="contained" type="submit" className='submit large' onClick={() => onSubmit()}>
                            Sauvegarder
                        </Button>
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