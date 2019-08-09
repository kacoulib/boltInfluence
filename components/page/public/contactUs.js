import { useState } from "react";
import { Link } from '../../../server/routes/next-routes'
import FormGenerator from '../../form/generator'
import { lightGray } from '../../../utils/variables/css';
import PropTypes from 'prop-types';
import Btn from '../../elements/btn'
import { customRequest } from '../../../lib/api/http'
import FormValidator from '../../../lib/form/validator'

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
]


const Contactus = (props) => {
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
    const handleSubmit = async () => {
        return console.log(FormValidator({ fields, form: state }))
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
                form={state}
                onChange={onChange}
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