import { useState } from "react";
import { Link } from '@material-ui/core';
import FormGenerator from '../../form/generator'
import { lightGray } from '../../../utils/variables/css';

const fields = [{
    label: "Prénom *",
    name: "firstname",
    type: 'input',
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
    props: {
        list: [{ name: 'Mr', value: 'Mr' }, { name: 'Mme', value: 'Mme' }],
        style: {
            padding: 5,
            backgroundColor: lightGray,
        }
    }
},
{
    label: "Titre professionnel *",
    name: "job",
    type: 'input',
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
    props: {
        style: {
            padding: 5,
            backgroundColor: lightGray,
        }
    }
}
]


const Contactus = ({ onClick, linkText = 'Contact' }) => {
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

    return (
        <div id='contact-us'>
            <div className='center-text'>
                <h3>Intéressé par une démo ? Contactez-nous</h3>
                <h4>Vous êtes un influenceur ? <Link><a className='red-color'> Inscrivez-vous par ici</a></Link></h4>
            </div>

            <FormGenerator
                fields={fields}
                form={{}}
                onChange={onChange}
                onClick={onclick}
            />
            <div className='text-right'>
                <Link ><a className='red-btn' onClick={onClick}>{linkText}</a></Link>
            </div>
        </div>
    )
}

export default Contactus