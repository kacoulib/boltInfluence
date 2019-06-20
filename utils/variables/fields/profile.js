import { languageList, civilityList } from '../general'
import { avatar, civility, firstName, lastName, age, bornePlace, languages } from './index'
const profileField = [
    {
        name: 'radio',
        label: "Radio",
        type: 'radio',

        props: {
            list: civilityList,
        }
    },
    {
        name: 'check',
        label: "Toto",
        type: 'checkbox',

        props: {
            list: civilityList,
        }
    },
    {
        name: 'check',
        label: "Je check",
        type: 'checkbox',

        props: {
            list: civilityList,
        }
    },
    {
        name: avatar,
        type: 'img',

        props: {
            required: true,
            style: {
                textAlign: 'center',
                margin: 'auto',
                display: 'block',
                maxHeight: 100
            }
        }
    },
    {
        name: civility,
        label: "Civilité",
        type: 'select',

        props: {
            list: civilityList,
            required: true,
        }
    },
    {
        name: firstName,
        label: "Nom",
        type: 'input',
        dimension: { xs: 6 },

        props: {
            required: true,
            autoFocus: true
        }
    },
    {
        name: lastName,
        label: "Prénom",
        type: 'input',
        dimension: { xs: 6 },

        props: {
            required: true,
        }
    },
    {
        name: age,
        label: "Age",
        type: 'date',

        props: {
            defaultValue: "2000-05-24",
            required: true,
        }
    },
    {
        name: bornePlace,
        label: "Lieu de résidence",
        type: 'input',

        props: {
            required: true,
        }
    },
    {
        name: languages,
        label: "Langue",
        type: 'select',

        props: {
            multiple: true,
            list: languageList,
            required: true,
        }
    },
]

module.exports = {
    // Vars
    profileField,
}