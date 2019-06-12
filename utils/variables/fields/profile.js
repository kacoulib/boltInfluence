import { languageList, civilityList } from '../general'
import { avatar, civility, firstName, lastName, age, bornePlace, languages } from './index'
const profileField = [
    {
        label: "Check",
        name: 'check',
        type: 'radio',

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
        label: "Civilité",
        name: civility,
        type: 'select',

        props: {
            list: civilityList,
            required: true,
        }
    },
    {
        label: "Nom",
        name: firstName,
        type: 'input',
        dimension: { xs: 6 },

        props: {
            required: true,
            autoFocus: true
        }
    },
    {
        label: "Prénom",
        name: lastName,
        type: 'input',
        dimension: { xs: 6 },

        props: {
            required: true,
        }
    },
    {
        label: "Age",
        name: age,
        type: 'date',

        props: {
            defaultValue: "2000-05-24",
            required: true,
        }
    },
    {
        label: "Lieu de résidence",
        name: bornePlace,
        type: 'input',

        props: {
            required: true,
        }
    },
    {
        label: "Langue",
        name: languages,
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