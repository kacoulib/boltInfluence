import { choiceList } from '../../../../utils/variables/general'

const marqueInformationsFields = [
    [{
        label: "Nom de la marque",
        name: "name",
        type: 'input',
        required: true,
    },
    {
        label: "Contact",
        name: "contact",
        type: 'input',
        required: true,
    }],
    [{
        label: "Image",
        name: "logo",
        type: 'upload',
        required: true,
    },
    {
        label: "Description",
        name: "description",
        type: 'textarea',
        required: true,
    }],
]
const marquePaymentFields = [
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
    },
    {
        label: "BIC",
        name: "bic",
        type: 'input',
        required: true,
    }
]

export { marqueInformationsFields, marquePaymentFields }