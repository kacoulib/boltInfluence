const FormValidatorComp = ({ fields, form }) => {

    if (!fields || !fields.length)
        return false;
    for (let index = 0, elem; index < fields.length; index++) {
        elem = fields[index];
        if (elem.required) {
            if (!form[elem.name] || !form[elem.name].length) {
                return (false)
            }
        }
    }
    return (true);
}
export default FormValidatorComp