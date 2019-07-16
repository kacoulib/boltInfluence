import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import FormGenerator from '../../form/generator'

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
    status: { color: '#F13F4B' },
    stars: { width: '50%' },
    influencer_img_container: { height: 'auto', paddingTop: 5 },
    influencer_info_container: { padding: '1rem' },
}

const fields = [
    {
        label: "Pseudonyme",
        name: "pseudo",
        type: 'input',
        required: true,
        width: 6
    },
    {
        label: "Prénom*",
        name: "firstName",
        type: 'input',
        required: true,
        width: 6
    },
    {
        label: "Nom",
        name: "lastName",
        type: 'input',
        required: true,
        width: 6
    },
    {
        label: "Avez vous des enfants*",
        name: "child",
        type: 'email',
        required: true,
        width: 6
    },
    {
        label: "Numero de téléphone",
        name: "phone",
        type: 'input',
        required: true,
        width: 6

    },
    {
        label: "Addresse de livraison",
        name: "companyName",
        type: 'input',
        required: true,
        width: 6
    },
    {
        label: "Phone",
        name: "phone",
        type: 'number',
        required: true,
        width: 6

    },
]

const Index = ({ selectedInfluencer }) => {

    const [form, setForm] = useState(selectedInfluencer)

    const onChange = (name) => ({ target: { value } }) => setForm(Object.assign({}, form, { [name]: value }));
    const onSubmit = async () => {

        const { login } = await basicAuth(form);

        if (login)
            window.location = "/dashboard"
    };


    return (
        <Grid container alignItems='center' justify="center" style={styles.container} >
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h1>{`${selectedInfluencer.firstName} ${selectedInfluencer.lastName}`}</h1>
            </Grid>
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h2>Information de contact</h2>
            </Grid>

            <div>
                <FormGenerator
                    fields={fields}
                    form={form}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    setting={{ showLabel: { xs: 6 } }}
                />
            </div>
        </ Grid>
    )
}
Index.propTypes = {
    selectedInfluencer: PropTypes.object.isRequired,
}

export default Index;