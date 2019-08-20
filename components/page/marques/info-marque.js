import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import FormGenerator from '../../formElement/generator'
import Button from '@material-ui/core/Button';
import { choiceList } from '../../../utils/variables/general'

const styles = {
    container: { padding: '0 3em' },
    createMArque: { margin: 0, fontSize: '1rem' },
    faceIcon: { fontSize: '1.2rem', marginRight: '1rem' }
}

const fields = [
    {
        label: "Nom de la marque",
        name: "contact",
        type: 'input',
        required: true,
        width: 12,
    },
    {
        label: "Contact",
        name: "contact",
        type: 'input',
        required: true,
        width: 12,
    },
    {
        label: "Image / Logo",
        name: "picture",
        type: 'upload',
        required: true,
        width: 12,
    },
    {
        label: "Description",
        name: "phone",
        type: 'textarea',
        required: true,
        width: 12,
        props: {
            list: choiceList,
            required: true,
            margin: "normal",
            variant: "outlined",
        }
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
                <h2>Information de marque</h2>
            </Grid>
            <Grid item xs={12} sm={12}>
                <h3 style={styles.createMArque} className='red-color'><span style={styles.faceIcon}>+</span>Créer une marque page</h3>
            </Grid>
            <Grid item xs={12} sm={12}>

                <FormGenerator
                    fields={fields}
                    state={state}
                    onChange={onChange}
                    onSubmit={onSubmit}
                />
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