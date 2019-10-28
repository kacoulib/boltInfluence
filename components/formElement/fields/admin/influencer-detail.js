import { choiceList } from '../../../../utils/variables/general'

const userInfoFields = [
    {
        label: "Pseudonyme",
        name: "slug",
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
        name: "haveChildren",
        type: 'radio',
        required: true,
        width: 6,
        props: {
            list: choiceList,
            required: true
        }
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
        name: "address",
        type: 'input',
        required: true,
        width: 6
    },
    {
        label: "Ville",
        name: "city",
        type: 'input',
        required: true,
        // dimension: { ms: 2, xs: 4 },
        width: 6

    },
    {
        label: "Code postal",
        name: "postalCode",
        type: 'input',
        required: true,
        // dimension: { ms: 2, xs: 4 },
        width: 6

    },
    {
        label: "Bio",
        name: "bio",
        type: 'textarea',
        placeholder: 'Texte libre de présentation',
        required: true,
        // dimension: { ms: 2, xs: 4 },
        width: 6

    },
    {
        label: "Numero de SIRET",
        name: "siret",
        type: 'number',
        required: true,
        width: 6

    },
]
const userAcountFields = [
    {
        label: "Adresse e-mail (login)",
        name: "email",
        type: 'email',
        required: true,
    }
]
const userPaymentFields = [
    {
        label: "IBAN",
        name: "iban",
        type: 'input',
        required: true,
    },
    {
        label: "RIB",
        name: "rib",
        type: 'input',
        required: true,
        width: 6
    },
    {
        label: "BIC",
        name: "bic",
        type: 'input',
        required: true,
        width: 6
    },
    {
        label: "Paypal",
        name: "paypal",
        type: 'input',
        required: true,
        width: 6
    },
    {
        label: "Adresse de facturation",
        name: "facturation_address",
        type: 'input',
        required: true,
        width: 6
    },
    {
        label: "Ville",
        name: "facturation_city",
        type: 'input',
        required: true,
        // dimension: { ms: 2, xs: 4 },
        width: 6

    },
    {
        label: "Code postal",
        name: "facturation_zip",
        type: 'input',
        required: true,
        // dimension: { ms: 2, xs: 4 },
        width: 6

    }
]

export { userInfoFields, userAcountFields, userPaymentFields }