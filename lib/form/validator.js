import { isValideEmail } from '../regex';

const excludeValueTypes = ['dateYear'];

const FormValidator = ({ fields, state }) => {
    const errors = [];

    if (!fields || !fields.length)
        return false;
    for (let index = 0, elem, value; index < fields.length; index++) {
        elem = fields[index];
        value = state[elem.name];

        if (elem.required) {
            if ((elem.type == 'email' && !isValideEmail(value))) {
                errors.push(elem.name)
            }
            else if (!value || (!value.length && !excludeValueTypes.includes(elem.type))) {
                errors.push(elem.name)
            }
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
const multiLeanForm = ({ fields, state }) => {
    let tmp = [];
    fields.map(e => tmp.push(...e));
    return LeanForm({ fields: tmp, state });
}
const MultiFormValidation = ({ fields, state }) => {
    const errors = [];
    for (let index = 0; index < fields.length; index++) {
        const element = FormValidator({ fields: fields[index], state });
        errors.push(...element)
    }
    return errors;
}

export { LeanForm, MultiFormValidation, multiLeanForm }
export default FormValidator