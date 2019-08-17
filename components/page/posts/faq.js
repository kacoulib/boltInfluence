import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import FormGenerator from '../../form/generator'
import { buttonStyle } from '../../../utils/variables/css';
import Button from '@material-ui/core/Button';
import { choiceList } from '../../../utils/variables/general'

const cardContainer = {
    padding: '1rem',
    color: 'white',
    backgroundColor: '#242B45',
    margin: '.5em'
}
const styles = {
    cardContainer,
    rightCardContainer: { ...cardContainer, ...{ backgroundColor: '#F13F4B' } },
    container: { padding: '0 3em' },
    cardText: { margin: '.5em 0 0' },
    status: { color: '#F13F4B' },
    footer: { marginBottom: '3rem' },
    stars: { width: '50%' },
    influencer_img_container: { height: 'auto', paddingTop: 5 },
    influencer_info_container: { padding: '1rem' },
}

const fields = [
    {
        label: "Titre",
        name: "title",
        type: 'input',
        required: true,
        props: {
            list: [{ name: 'Marque1', value: 'marque 1' }, { name: 'Marque2', value: 'second marque' }],

            margin: "normal",
            // variant: "outlined",
            required: true
        }
    },
    {
        label: "Contenu",
        name: "content",
        type: 'wysiwyg',
        required: true,
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
            {/* <Grid item xs={12} sm={12}>
                <h2>F.A.Q</h2>
            </Grid> */}

            <Grid item xs={12} sm={12}>

                <FormGenerator
                    fields={fields}
                    state={state}
                    onChange={onChange}
                    onSubmit={onSubmit}
                />
            </Grid>
            <Grid item xs={12} justify='center' className='center-text' style={styles.footer}>
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