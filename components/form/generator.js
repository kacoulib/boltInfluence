import { Fragment } from 'react'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Wysiwyg from './wysiwyg'
import PropTypes from 'prop-types'

/*
        Generate form

  Settings :
      - handleChange
      - form
      - desc
      - fields : - name
                    - label
                    - type (null, checkbox, radio, select)
                    - placeholder
                    - required (null, true, false)
                    - labels = [] (not to select)
                    - values = [] (to select = [{value: "", text: ""}, {}])
Autofocus on the first field

{
    label:        "Test - Radio",
    name:         "radio",
    type:         "radio",
    labels: ["one", "two", "three"],
    values: ["One", "Two", "Three"]
},
{
    label:        "Test - Checkbox",
    name:         "checkbox",
    type:         "checkbox",
    labels: ["un", "deux", "trois"],
    values: ["Un", "Deux", "Trois"]
},
{
    label:        "Test - Select",
    name:         "select",
    type:         "select",
    values: [{values: "Dix", text: "dix"}, {values: "Vingt", text: "vingt"}, {values: "Trente", text: "trente"}, {values: "Quarante", text: "quarante"}, {values: "Cinquante", text: "cinquante"}]
}

*/


const FormGenerator = ({ fields }) => {

    return (
        <FormControl>
            {fields.map((elem, key) =>
                (
                    <Fragment key={key}>
                        {
                            elem.type == 'input' &&
                            <TextField id={`${elem.name}-${key}`} label={elem.label} />
                            || elem.type == 'wysiwyg' && <Wysiwyg value={"**Hello world!!!**"} />
                        }
                    </Fragment>
                )

            )}
        </FormControl>
    )
}

FormGenerator.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default FormGenerator;
