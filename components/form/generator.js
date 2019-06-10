import React, { useState, useEffect } from "react";

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Wysiwyg from './wysiwyg'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ChipList from '../../components/form/chipList';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { orangeColor } from '../../utils/variables/color';


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
    formControl: {
        margin: theme.spacing.unit,
        width: '100%',
        // minWidth: '100%',
        // maxWidth: 300,
    },
    control: {
        padding: theme.spacing.unit,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const FormGenerator = ({ fields, classes, form, onChange, onSubmit, toggleList, align = 'center' }) => {
    const { set } = useState()

    useEffect(() => {

    })

    const textTypes = ['input', 'password', 'email', 'number', 'textarea', 'date', 'datetime-local'],
        spacing = 16,
        defaultWidth = { xs: 12 };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
            <FormControl className={classes.container} >
                <Grid container className={classes.root} spacing={spacing} alignItems="center">
                    {fields && fields.map((elem, key) =>
                        (
                            <Grid key={key} item xs={elem.row || defaultWidth.xs}>
                                <div style={{ paddingBottom: '15px' }}>
                                    {textTypes.includes(elem.type) &&
                                        <TextField
                                            type={elem.type}
                                            label={elem.label}
                                            required={elem.required}
                                            multiline={elem.type === 'textarea'}
                                            fullWidth
                                            defaultValue={form[elem.name] || elem.defaultValue}
                                            onChange={onChange(elem.name)}
                                            style={{ paddingRight: '15px' }}
                                        />
                                        || elem.type == 'wysiwyg' && (
                                            <div>
                                                {elem.helpText && <span >{elem.helpText}</span>}
                                                <Wysiwyg value={form[elem.name]} onChange={onChange(elem.name)} />
                                            </div>
                                        )
                                        || elem.type == 'chipList' && (<div>
                                            <p>{elem.helpText && <span >{elem.helpText}</span>}</p>
                                            <ChipList list={elem.list} onClick={toggleList} onDelete={toggleList} />
                                        </div>
                                        )
                                        || elem.type == 'select' && (
                                            <FormControl className={classes.formControl} required={elem.required}>
                                                <InputLabel htmlFor={elem.name}>{elem.helpText}</InputLabel>
                                                < Select
                                                    multiple={elem.multiple}
                                                    value={form[elem.name]}
                                                    onChange={onChange(elem.name)}
                                                    input={<Input id={elem.name} />}
                                                    renderValue={selected => elem.multiple ? (
                                                        <div className={classes.chips}>
                                                            {selected && selected.map(value => (
                                                                <Chip key={value} label={value} className={classes.chip} />
                                                            ))}
                                                        </div>
                                                    ) : selected}
                                                    MenuProps={MenuProps}
                                                >
                                                    {elem.list && elem.list.map(name => (
                                                        <MenuItem key={name} value={name}>
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )
                                        || elem.type == 'img' && (
                                            <div>
                                                <img src={form[elem.name]} style={elem.style} />
                                            </div>
                                        )
                                    }
                                </div>
                            </Grid>
                        )

                    )}
                    <Grid item xs={12}>
                        <Button variant="contained" className={classes.button} type="submit" style={{ background: orangeColor, color: 'white' }}>
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
    toggleList: PropTypes.func,
    align: PropTypes.string
}

export default withStyles(styles)(FormGenerator);
