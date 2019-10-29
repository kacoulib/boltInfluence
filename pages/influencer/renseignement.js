import Stepper from '../../components/dataDisplay/others/stepper'
import FormGenerator from '../../components/formElement/generator'
import SocialBtn from '../../components/elements/socialBtn'
import { categories as categoryList, activities as activityList, civilityChoiceList } from '../../utils/variables/user'
import Ucfirst from '../../lib/ucfirst'
import withAuth from '../../lib/withAuth';

import { multiLeanForm, MultiFormValidation } from '../../lib/form/validator'
import { editProfile } from '../../lib/api/http/user';

import { Grid } from '@material-ui/core';

import { useState } from "react";

const fields1 = [
    {
        label: "Ajouter une photo de profil",
        name: "picture",
        type: 'upload',
        // dimension: { ms: 2, xs: 4 },
    },
    {
        label: "Prénom",
        name: "firstName",
        type: 'input',
        required: true,
        dimension: { ms: 2, xs: 4 },
    },
    {
        label: "Nom",
        name: "lastName",
        type: 'input',
        required: true,
        dimension: { ms: 2, xs: 4 },
    },
    {
        label: "ADRESSE EMAIL",
        name: "email",
        type: 'email',
        required: true,
        dimension: { ms: 2, xs: 4 },
    },
    {
        label: "Lieu de naissance",
        name: "placeOfBirth",
        type: 'input',
        required: true,
        dimension: { ms: 2, xs: 4 },
    },
    {
        label: "Date de naissance",
        name: "dateOfBirth",
        type: 'dateYear',
        required: true,
        dimension: { ms: 2, xs: 4 },
    },
    {
        label: "Activity *",
        name: "civilState",
        type: 'radio',
        // dimension: { ms: 2, xs: 4 },
        required: true,

        list: civilityChoiceList,
    },
]

const fields2 = [
    {
        label: "Technologie / High tech",
        name: "sector",
        type: 'select',
        required: true,
        list: categoryList,
    },
    {
        label: "Activity *",
        name: "categories",
        type: 'checkbox',
        required: true,
        list: categoryList,
    }]

const fields3 = [{
    label: "Activity *",
    name: "interests",
    type: 'select',
    required: true,
    list: activityList,
}]
const settings = {
    // showLabel: true,
    unableUnderline: true,
    unableBoxShadow: false,
    bordered: true
}
const socialsList = ['facebook', 'instagram', 'youtube', 'twitter', 'twitch', 'pinterest', 'tiktok', 'linkedin'];

const steps = ['Renseignement du profil', 'Connexion des comptes', 'Choisir une catégorie', 'Activité professionnelle'];

function getStepContent(state, onChange) {

    return (step) => {
        switch (step) {
            case 0:
                return <FormGenerator
                    fields={fields1}
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
            case 3:
                return <FormGenerator
                    fields={fields3}
                    state={state}
                    errors={state.errors}
                    onChange={onChange}
                    settings={settings}
                />;
            default:
                return 'Unknown step :(';
        }
    }
}

const RenseignementComp = ({ user }) => {
    const [state, setState] = useState({
        firstname: '',
        picture: '',
        email: '',
        description: '',
        agence: '',
        activity: '',
        technology: '',
        job: '',
        message: '',
        selectValue: '',
        sector: '',
        ...user,
        ...user.influencer,
        errors: []
    })
    const onChange = (name, value) => setState({ ...state, [name]: value })
    const submit = async () => {
        const fields = [fields1, fields2, fields3];
        let errors = MultiFormValidation({ fields, state });

        setState({ ...state, errors })
        const data = multiLeanForm({ fields, state });


        try {

            const res = await editProfile(data);
            console.log(data, fields, res)
            if (errors.length)
                return console.log(errors)
        } catch (err) {
            console.error(err)
        }
    }
    const finish = () => {
        // const errors = MultiFormValidation({ fields, state });
        // return !errors.length
        console.log(state)
    }

    console.log(state)
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

export default withAuth(RenseignementComp, { showAside: false })