import React, { useState, useEffect } from "react";

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Wysiwyg from './wysiwyg'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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


const FormGenerator = ({ fields, classes, form, onChange, onSubmit, align = 'center' }) => {
    const { set } = useState()

    useEffect(() => {

    })

    const textTypes = ['input', 'password', 'email', 'number', 'textarea'],
        spacing = 16,
        defaultWidth = { xs: 12 };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
            <FormControl className={classes.container} >
                <Grid container className={classes.root} spacing={spacing} alignItems="center">
                    {fields.map((elem, key) =>
                        (
                            <Grid key={key} item xs={elem.width || defaultWidth.xs}>
                                <div style={{ paddingBottom: '15px' }}>
                                    {textTypes.includes(elem.type) &&
                                        <TextField
                                            type={elem.type}
                                            label={elem.label}
                                            required={elem.required}
                                            multiline={elem.type === 'textarea'}
                                            fullWidth
                                            defaultValue={form[elem.name]}
                                            onChange={onChange(elem.name)}
                                            style={{ paddingRight: '15px' }}
                                        />
                                        || elem.type == 'wysiwyg' && (
                                            <div>
                                                {elem.helpText && <span >{elem.helpText}</span>}
                                                <Wysiwyg value={form[elem.name]} onChange={onChange(elem.name)} />
                                            </div>
                                        )
                                    }
                                </div>
                            </Grid>
                        )

                    )}
                    <Grid item xs={12}>
                        <Button variant="contained" className={classes.button} type="submit">
                            Submit
                    </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </form>
    )
}

FormGenerator.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    form: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    align: PropTypes.string
}

export default withStyles(styles)(FormGenerator);
