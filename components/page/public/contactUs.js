import { useState } from "react";
import { Link } from '@material-ui/core';
import FormGenerator from '../../form/generator'
import { lightGray } from '../../../utils/variables/css';
import PropTypes from 'prop-types'

const fields = [{
    label: "Prénom *",
    name: "firstname",
    type: 'input',
    disableUnderline: true,
    required: true,
    props: {
        style: {
            padding: 5,
            backgroundColor: lightGray,

        }
    }
},
{
    label: "Nom *",
    name: "lastname",
    type: 'input',
    disableUnderline: true,
    required: true,
    props: {
        style: {
            padding: 5,
            backgroundColor: lightGray,
        }
    }
},
{
    label: "Email *",
    name: "email",
    type: 'email',
    required: true,
    disableUnderline: true,
    props: {
        style: {
            padding: 5,
            backgroundColor: lightGray,
        }
    }
},
{
    label: "Téléphone *",
    name: "phone",
    type: 'input',
    disableUnderline: true,
    required: true,
    props: {
        style: {
            padding: 5,
            backgroundColor: lightGray,
        }
    }
},
{
    label: "Société *",
    name: "agence",
    type: 'input',
    disableUnderline: true,
    required: true,
    props: {
        style: {
            padding: 5,
            backgroundColor: lightGray,
        }
    }
},
{
    label: "- Veuillez sélectionner un secteur d'activité -",
    name: "activity",
    type: 'select',
    required: true,
    disableUnderline: true,
    formControlStyle: {
        backgroundColor: lightGray
    },
    props: {
        list: [{ name: 'Mr', value: 'Mr' }, { name: 'Mme', value: 'Mme' }],
        style: {
            // padding: 5,
            backgroundColor: lightGray,
        },
    }
},
{
    label: "Titre professionnel *",
    name: "job",
    type: 'input',
    disableUnderline: true,
    required: true,
    props: {
        style: {
            padding: 5,
            backgroundColor: lightGray,
        }
    }
},
{
    label: "Décrivez les besoins ou les objectifs de votre entreprise",
    name: "message",
    type: 'textarea',
    required: true,
    disableUnderline: true,
    props: {
        style: {
            padding: 5,
            backgroundColor: lightGray,
        }
    }
}
]


const Contactus = ({ onSubmit, linkText = 'Contact' }) => {
    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        agence: '',
        activity: '',
        job: '',
        message: '',
    })
    const onChange = (name, value) => setState({ ...state, [name]: value })
    const handleSubmit = () => {
        console.log(state)
    }
    return (
        <div id='contact-us'>
            <div className='center-text'>
                <h3>Intéressé par une démo ? Contactez-nous</h3>
                <h4>Vous êtes un influenceur ? <Link><a className='red-color'> Inscrivez-vous par ici</a></Link></h4>
            </div>

            <FormGenerator
                fields={fields}
                form={state}
                onChange={onChange}
            />
            <p id='submit-contact' className='text-right'>
                <Link ><a className='red-btn' onClick={handleSubmit}>{linkText}</a></Link>
            </p>
        </div>
    )
}
Contactus.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Contactus