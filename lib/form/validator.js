const FormValidator = ({ fields, state }) => {
    const errors = [];

    if (!fields || !fields.length)
        return false;
    for (let index = 0, elem; index < fields.length; index++) {
        elem = fields[index];
        if (elem.required) {
            if (!state[elem.name] || !state[elem.name].length)
                errors.push(elem.name)
        }
    }
    return (errors);
}

const LeanForm = ({ fields, state }) => {
    const newState = {}
    if (!fields || !fields.length)
        return (newState);
    for (let index = 0, elem; index < fields.length; index++) {
        elem = fields[index];
        if (state.hasOwnProperty(elem.name))
            newState[elem.name] = state[elem.name];
    }
    return (newState);
}
export { LeanForm }
export default FormValidator