import Stepper from '../../../components/dataDisplay/others/stepper'
import FormGenerator from '../../../components/formElement/generator'
import SocialBtn from '../../../components/elements/socialBtn'
import Ucfirst from '../../../lib/ucfirst'
import FormValidator, { LeanForm } from '../../../lib/form/validator'

import { Grid } from '@material-ui/core';

import { useState } from "react";


const fields = [
    {
        label: "Ajouter une photo de profil",
        name: "picture",
        type: 'upload',
        // dimension: { ms: 2, xs: 4 },
    },
    {
        label: "Prénom",
        name: "firstname",
        type: 'input',
        required: true,
        dimension: { ms: 2, xs: 4 },
    },
    {
        label: "Nom",
        name: "lastname",
        type: 'input',
        required: true,
        dimension: { ms: 2, xs: 4 },
    },
    {
        label: "ADRESSE EMAIL",
        name: "email",
        type: 'input',
        required: true,
        dimension: { ms: 2, xs: 4 },
    },
    {
        label: "Lieu de naissance",
        name: "place_of_born",
        type: 'input',
        required: true,
        dimension: { ms: 2, xs: 6 },
    },
    {
        label: "Date de naissance",
        name: "birthday",
        type: 'datetime-local',
        required: true,
        dimension: { ms: 2, xs: 6 },
    },
    {
        label: "Activity *",
        name: "activity",
        type: 'radio',
        // dimension: { ms: 2, xs: 4 },

        list: [{ value: 'Célibaltaire', name: 'single' }, { value: 'Pacsé', name: 'second marque' }, { value: 'Marié', name: 'married' }],
    },
]

const fields2 = [{
    label: "Activity *",
    name: "activity",
    type: 'select',
    required: true,
    list: [
        { name: 'Salarié (non cadre)', value: 'salarie' },
        { name: 'Cadre', value: 'cadre' },
        { name: 'Entrepreneur/autoentrepreneur', value: 'entreprenor' },
        { name: 'De profession libérale', value: 'liberal' },
        { name: 'Profession des arts et spectacles', value: 'art' },
        { name: 'Sans emploi', value: 'businessman' },
        { name: 'Retraité', value: 'retiree' },
        { name: 'Autre', value: 'other' },
    ],
}]
const settings = {
    // showLabel: true,
    unableUnderline: true,
    // unableBoxShadow: false,
    bordered: true
}
const socialsList = ['facebook', 'instagram', 'youtube', 'twitter', 'twitch', 'pinterest', 'tiktok', 'linkedin'];

const steps = ['Renseignement du profil', 'Choisir une catégorie', 'Activité professionnelle'];

function getStepContent(state, onChange) {

    return (step) => {
        switch (step) {
            case 0:
                return <FormGenerator
                    fields={fields}
                    state={state}
                    errors={state.errors}
                    onChange={onChange}
                    settings={settings}
                />;
            case 1:
                return (
                    <div id="login">
                        <Grid id='social_container' container justify='space-around'>
                            {socialsList && socialsList.map((elem, index) => (
                                <Grid item xs={5} key={index}><SocialBtn type={elem} text={Ucfirst(elem)} href={`/auth/${elem}`} /></Grid>
                            ))}
                        </Grid>
                    </div>
                )
            case 2:
                return <FormGenerator
                    fields={fields2}
                    state={state}
                    errors={state.errors}
                    onChange={onChange}
                    settings={settings}
                />;
            default:
                return 'Unknown step';
        }
    }
}

const RenseignementComp = () => {
    const [state, setState] = useState({
        firstname: '',
        picture: '',
        email: '',
        description: '',
        agence: '',
        activity: '',
        job: '',
        message: '',
        selectValue: '',
        errors: []
    })
    const onChange = (name, value) => setState({ ...state, [name]: value })
    const submit = () => console.log('submit')
    const finish = () => {
        const errors = FormValidator({ fields, state });
        console.log(errors, state)
        return !errors.length
    }

    return (
        <div>
            <Stepper
                steps={steps}
                getStepContent={getStepContent(state, onChange)}
                submit={submit}
                finish={finish}
            />
        </div>
    )
}

export default RenseignementComp