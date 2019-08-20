import { useState } from "react";
import { Link } from '../../../server/routes/next-routes'
import FormGenerator from '../../formElement/generator'
import { lightGray } from '../../../utils/variables/css';
import PropTypes from 'prop-types';
import Btn from '../../elements/btn'
import { customRequest } from '../../../lib/api/http'
import FormValidator from '../../../lib/formElement/validator'

const fields = [{
    label: "Prénom *",
    name: "firstName",
    type: 'input',
    required: true,
    props: {
        style: {
            backgroundColor: lightGray,
        }
    }
},
{
    label: "Nom *",
    name: "lastName",
    type: 'input',
    required: true,
    props: {
        style: {
            backgroundColor: lightGray,
        }
    }
},
{
    label: "Email *",
    name: "email",
    type: 'email',
    required: true,
    props: {
        style: {
            backgroundColor: lightGray,
        }
    }
},
{
    label: "Téléphone *",
    name: "phoneNumber",
    type: 'input',
    required: true,
    props: {
        style: {
            backgroundColor: lightGray,
        }
    }
},
{
    label: "Société *",
    name: "company",
    type: 'input',
    required: true,
    props: {
        style: {
            backgroundColor: lightGray,
        }
    }
},

{
    label: "Titre professionnel *",
    name: "position",
    type: 'input',
    required: true,
    props: {
        style: {
            backgroundColor: lightGray,
        }
    }
},
{
    label: "Décrivez les besoins ou les objectifs de votre entreprise",
    name: "message",
    type: 'textarea',
    required: true,
    props: {
        style: {
            backgroundColor: lightGray,
        }
    }
},
{
    label: "- Veuillez sélectionner un secteur d'activité -",
    name: "activity",
    type: 'select',
    required: true,
    list: [
        { name: 'employee (non cadre)', value: 'Salarié (non cadre)' },
        { name: 'cadre', value: 'Cadre' },
        { name: 'entreprener', value: 'Entrepreneur/autoentrepreneur' },
        { name: 'liberal', value: 'De profession libérale' },
        { name: 'art-spectacle', value: 'Profession des arts et spectacles' },
        { name: 'unemployed', value: 'Sans emploi' },
        { name: 'Retirement', value: 'Retraité' },
        { name: 'other', value: 'Autre' }
    ],
    props: {
        style: {
            borderRadius: 5,
            backgroundColor: lightGray,
        },
    }
},
]
const settings = { unableUnderline: false, unableBoxShadow: true }

const Contactus = (props) => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        position: '',
        message: '',
        activity: '',
        errors: []
    })
    const onChange = (name, value) => setState({ ...state, [name]: value })
    const handleSubmit = async () => {
        const errors = FormValidator({ fields, state });
        if (errors.length)
            return setState({ ...state, errors })

        const res = await customRequest({ path: '/public/contact', state });
        console.log(res)
    }
    return (
        <div id='contact-us'>
            <div className='center-text'>
                {props.children ? props.children : (<>
                    <h2>Intéressé par une démo ? Contactez-nous</h2>
                    <h3>Vous êtes un influenceur ? <Link href='#'><a title='#' className='red-color'> Inscrivez-vous par ici</a></Link></h3></>
                )}
            </div>

            <FormGenerator
                fields={fields}
                state={state}
                onChange={onChange}
                settings={settings}
                errors={state.errors}
            />
            <p id='submit-contact' className='text-right'>
                <Btn onClick={handleSubmit} href="#contact-us" text={props.linkText} />
            </p>
        </div>
    )
}
Contactus.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Contactus