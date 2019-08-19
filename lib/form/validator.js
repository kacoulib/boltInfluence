import { isValideEmail } from '../regex'
const FormValidator = ({ fields, state }) => {
    const errors = [];

    if (!fields || !fields.length)
        return false;
    for (let index = 0, elem, value; index < fields.length; index++) {
        elem = fields[index];
        value = state[elem.name];

        if (elem.required) {
            if (!value || !value.length || (elem.type == 'email' && !isValideEmail(value)))
                errors.push(elem.name)
        }
    }
    return (errors);
}

const LeanForm = ({ fields, state }) => {
    const newState = {}
    if (!fields || !fields.length)
        return (newState);
    for (let index = 0, elem, value; index < fields.length; index++) {
        elem = fields[index];
        value = state[elem.name];

        if (state.hasOwnProperty(elem.name))
            newState[elem.name] = value;
    }
    return (newState);
}
export { LeanForm }
export default FormValidator