import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import FormGenerator from '../../form/generator'
import Button from '@material-ui/core/Button';
import { buttonStyle } from '../../../utils/variables/css';
import { choiceList } from '../../../utils/variables/general'

const cardContainer = {
    padding: '1rem',
    color: 'white',
    backgroundColor: '#242B45',
    margin: '.5em'
}

const styles = {
    cardContainer,
    rightCardContainer: Object.assign({}, cardContainer, { backgroundColor: '#F13F4B' }),
    container: { padding: '0 3em' },
    childContainer: { marginBottom: '3em' },
    cardText: { margin: '.5em 0 0' },
    redSyntax: { color: '#F13F4B' },
    stars: { width: '50%' },
    influencer_img_container: { height: 'auto', paddingTop: 5 },
    influencer_info_container: { padding: '1rem' },
}

const fieldsContact = [
    {
        label: "Choix de la page marque",
        name: "selectMarque",
        type: 'input',
        required: true,
        width: 6
    },
    {
        label: "Bio",
        name: "bio",
        type: 'textarea',
        required: true,
        width: 6
    },
]

const fieldsMarque = [
    {
        label: "Nom de la marque",
        name: "name",
        type: 'input',
        required: true,
        width: 4
    },
    {
        label: "Contact",
        name: "contact",
        type: 'input',
        required: true,
        width: 4
    },
    {
        label: "Description",
        name: "description",
        type: 'textarea',
        required: true,
        width: 4
    },
]

const Index = ({ selectedMarqueAgence }) => {

    const [state, setState] = useState(selectedMarqueAgence)

    const onChange = (name, value) => {
        console.log(name, value);
        setState(Object.assign({}, state, { [name]: value }))
    }

    const onSubmit = async () => {
        console.log(state);
    }

    return (
        <Grid container alignItems='center' justify="center" style={styles.container} >
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h1 style={styles.redSyntax}>{`${selectedMarqueAgence.name}`}</h1>
            </Grid>
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h2>Information de contact</h2>
            </Grid>

            <div>
                <FormGenerator
                    fields={fieldsContact}
                    state={state}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    settings={{ showLabel: { xs: 6 } }}
                />
            </div>

            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h2>Information de marque</h2>
            </Grid>

            <div>
                <FormGenerator
                    fields={fieldsMarque}
                    state={state}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    settings={{ showLabel: { xs: 6 } }}
                />
            </div>
            <Grid item xs={12}>
                <Button variant="contained" type="submit" style={buttonStyle} onClick={() => onSubmit()}>
                    Mettre à jour
                </Button>
            </Grid>
        </ Grid>
    )
}

Index.propTypes = {
    selectedMarqueAgence: PropTypes.object.isRequired,
}

export default Index;