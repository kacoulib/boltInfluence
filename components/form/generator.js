import React, { useState, useEffect } from "react";

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Wysiwyg from './wysiwyg'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

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

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit,
    },
});


const FormGenerator = ({ fields, classes, form, handleChange }) => {
    const { set } = useState()
    useEffect(() => {

    })

    const textTypes = ['input', 'password', 'email', 'number', 'textarea'],
        spacing = 16;
    return (
        <FormControl className={classes.container}>
            <Grid container className={classes.root} spacing={spacing} justify="center" alignItems="center">
                {fields.map((elem, key) =>
                    (
                        <Grid key={key} item xs={elem.width}>
                            {
                                textTypes.includes(elem.type) &&
                                <TextField
                                    type={elem.type}
                                    label={elem.label}
                                    required={elem.required}
                                    multiline={elem.type === 'textarea'}
                                    fullWidth
                                    style={{ paddingRight: '15px' }}
                                />
                                || elem.type == 'wysiwyg' && <Wysiwyg value={"**Hello world!!!**"} />
                            }
                        </Grid>
                    )

                )}
            </Grid>
        </FormControl>
    )
}

FormGenerator.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    form: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleChange: PropTypes.func.required
}

export default withStyles(styles)(FormGenerator);
