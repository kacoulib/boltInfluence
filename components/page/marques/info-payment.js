import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import FormGenerator from '../../formElement/generator'
import Button from '@material-ui/core/Button';


const styles = {
    container: { padding: '0 3em' },
    cancel: { margin: '1rem 0 3em' },
}

const fields = [
    {
        label: "IBAN",
        name: "iban",
        type: 'input',
        required: true,
        width: 12,
    },
    {
        label: "RIB",
        name: "rib",
        type: 'input',
        required: true,
        width: 12,
    },
    {
        label: "BIC",
        name: "bic",
        type: 'input',
        required: true,
        width: 12,
    },

]

const Index = ({ selectedInfluencer }) => {

    const [state, setState] = useState({})

    const onChange = (name, value) => {
        console.log(name, value)
        setState(Object.assign({}, state, { [name]: value }))
    };
    const onSubmit = async () => {
        console.log(state)
    };


    return (
        <Grid container alignItems='center' justify="center" style={styles.container} >
            <Grid item xs={12} sm={12}>
                <h2>Information de payment</h2>
            </Grid>

            <Grid item xs={12} sm={12}>
                <FormGenerator
                    fields={fields}
                    state={state}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    settings={{ showLabel: { xs: 6 } }}
                />
            </Grid>
            <Grid item xs={12} justify='center' className='center-text' style={styles.cancel}><a className='red-color'>Arrêter l'abonnement  (30 jours)</a>
            </Grid>
            <Grid item xs={12} justify='center' className='center-text'>
                <Button variant="contained" type="submit" className='submit large' onClick={() => onSubmit()}>
                    Mettre à jour
                </Button>
            </Grid>
        </ Grid>
    )
}
Index.propTypes = {
    selectedInfluencer: PropTypes.object.isRequired,
}

export default Index;