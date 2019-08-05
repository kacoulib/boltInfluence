import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Wysiwyg from './wysiwyg'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import ChipList from '../../components/form/chipList';
import Select from '@material-ui/core/Select';
import Radio from './radio';
import Upload from './upload';
import Checkbox from './checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ReactSelect from 'react-select'
/*

    <FormGenerator
        fields={fieldsMarque}
        form={form}
        onChange={onChange}
        setting={{ showLabel: { xs: 6 } }}
    />

    // input
    const form = [{ //input
        label: "Nom de la marque",
        name: "name",
        type: 'input',
        required: true,
        disableUnderline: true,
        width: 4,
        formControlStyle: {},
        props: {
            style: {},
        },
    }]

    // select
    const select = {

    {
        label: "Description",
        name: "description",
        type: 'textarea',
        required: true,
        width: 4
        }
    ]
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
        padding: theme.spacing.unit,
        width: '100%',
    },
    inputControl: {
        backgoundColor: 'red'
    },
    formLabel: {
        paddingLeft: '1rem'
    },
    InputLabelProps: {
        paddingLeft: '1rem'
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

const FormGenerator = ({ fields, classes, form, onChange, toggleList, setting, align = 'center' }) => {

    const textTypes = ['input', 'password', 'email', 'number', 'textarea', 'date', 'datetime-local'],
        spacing = 16,
        defaultDimension = { xs: 12 };

    const handleChange = (name) => ({ target: { value } }) => onChange(name, value)
    const showLabel = setting && setting.showLabel;
    const labelSpacing = showLabel ? setting.showLabel : defaultDimension;

    return (
        <form onSubmit={(e) => { e.preventDefault(); }}>
            <FormControl className={classes.container} required={true}>
                <Grid container className={classes.root} spacing={spacing} alignItems="center">
                    {fields && fields.map((elem, key) => {
                        const dimentions = elem.dimension ? elem.dimension : defaultDimension;
                        const elemProps = elem.props;
                        const inputDefaultProps = elemProps && elemProps.defaultValue ? elemProps.defaultValue : '';
                        return (
                            <Grid key={key} item {...dimentions}>
                                <div style={{ paddingBottom: '15px' }}>
                                    {textTypes.includes(elem.type) &&
                                        (
                                            <Grid container>
                                                {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}
                                                <Grid item {...labelSpacing}>
                                                    <TextField
                                                        type={elem.type}
                                                        label={showLabel ? '' : elem.label}
                                                        underlineStyle={false}
                                                        multiline={elem.type === 'textarea'}
                                                        fullWidth
                                                        defaultValue={form[elem.name] || inputDefaultProps}
                                                        value={form[elem.name] || inputDefaultProps}
                                                        onChange={handleChange(elem.name)}
                                                        InputLabelProps={{
                                                            FormLabelClasses: {
                                                                root: classes.InputLabelProps
                                                            }
                                                        }}
                                                        InputProps={{
                                                            disableUnderline: !!elem.disableUnderline
                                                        }}
                                                        style={{ paddingRight: '15px' }}
                                                        {...elemProps}
                                                        rows={8}
                                                        rowsMax={10}
                                                        underlineStyle={{ display: 'none' }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        )
                                        || elem.type == 'wysiwyg' && (
                                            <Grid container>
                                                {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                                <Grid item {...labelSpacing}>
                                                    {elem.label && <span >{elem.label}</span>}
                                                    <Wysiwyg value={form[elem.name]} onChange={handleChange(elem.name)}
                                                        {...elemProps}
                                                    />
                                                </ Grid>
                                            </ Grid>
                                        )
                                        || elem.type == 'chipList' && (
                                            <Grid container>
                                                {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                                <Grid item {...labelSpacing}>
                                                    <p>{elem.label && <span >{elem.label}</span>}</p>
                                                    <ChipList onClick={toggleList} onDelete={toggleList}
                                                        {...elemProps}
                                                    />
                                                </ Grid>
                                            </ Grid>
                                        )
                                        || elem.type == 'select' && (
                                            <Grid container>
                                                {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                                <Grid item {...labelSpacing}>
                                                    <FormControl className={classes.formControl} required={elem.props && elem.props.required} style={elem.formControlStyle}>
                                                        <InputLabel htmlFor={elem.name}>{elem.label}</InputLabel>
                                                        < Select
                                                            multiple={elemProps.multiple}
                                                            value={form[elem.name]}
                                                            onChange={handleChange(elem.name)}
                                                            input={<Input id={elem.name} />}
                                                            renderValue={selected => elemProps.multiple ? (
                                                                <div className={classes.chips}>
                                                                    {selected && selected.map(value => (
                                                                        <Chip key={value} label={value} className={classes.chip} />
                                                                    ))}
                                                                </div>
                                                            ) : selected}
                                                            MenuProps={MenuProps}
                                                            // {...elemProps}
                                                            disableUnderline={!!elem.disableUnderline}
                                                            required={true}
                                                        >
                                                            {elemProps.list && elemProps.list.map((elem, key) => (
                                                                <MenuItem key={`${elem.name}-${key}`} value={elem.name}>
                                                                    {elem.value}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </ Grid>
                                            </ Grid>
                                        )
                                        || elem.type == 'react-select' && (
                                            <Grid container>
                                                {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                                <Grid item {...labelSpacing}>
                                                    <FormControl className={classes.formControl} required={elem.props && elem.props.required} style={elem.formControlStyle}>
                                                        {elem.label && <span >{elem.label}</span>}
                                                        <ReactSelect
                                                            isMulti
                                                            name="colors"
                                                            options={[
                                                                { value: 'chocolate', label: 'Chocolate' },
                                                                { value: 'strawberry', label: 'Strawberry' },
                                                                { value: 'vanilla', label: 'Vanilla' },
                                                                { value: 'chocolate1', label: 'Chocolate' },
                                                                { value: 'strawberry1', label: 'Strawberry' },
                                                                { value: 'vanilla1', label: 'Vanilla' },
                                                                { value: 'chocolate2', label: 'Chocolate' },
                                                                { value: 'strawberry2', label: 'Strawberry' },
                                                                { value: 'vanilla2', label: 'Vanilla' },
                                                            ]}
                                                            styles={{ control: styles => ({ ...styles, backgroundColor: 'none', borderRadius: 0, border: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.42)' }), }}
                                                        />
                                                    </FormControl>
                                                </ Grid>
                                            </ Grid>
                                        )
                                        || elem.type == 'img' && (
                                            <Grid container>
                                                {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                                <Grid item {...labelSpacing}>

                                                    <div>
                                                        <img src={form[elem.name]} {...elemProps} onChange={onChange} />
                                                    </div>
                                                </ Grid>
                                            </ Grid>
                                        )
                                        || elem.type == 'radio' && (
                                            <Grid container>
                                                {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                                <Grid item {...labelSpacing}>

                                                    <div>
                                                        <Radio name={elem.name} label={showLabel ? '' : elem.label} value={form[elem.name]} onChange={onChange} {...elemProps} />
                                                    </div>
                                                </ Grid>
                                            </ Grid>
                                        )
                                        || elem.type == 'checkbox' && (
                                            <Grid container>
                                                {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                                <Grid item {...labelSpacing}>

                                                    <div>
                                                        <Checkbox name={elem.name} label={elem.label} value={form[elem.name]} onChange={onChange} {...elemProps} />
                                                    </div>
                                                </ Grid>
                                            </ Grid>
                                        )
                                        || elem.type == 'upload' && (
                                            <Grid container>
                                                {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                                <Grid item {...labelSpacing}>
                                                    <div>
                                                        <Upload name={elem.name} label={elem.label} defaultValue={form[elem.name]} value={form[elem.name]} onChange={value => onChange(elem.name, value)} {...elemProps} />
                                                    </div>
                                                </ Grid>
                                            </ Grid>
                                        )
                                    }
                                </div>
                            </Grid>
                        )
                    }

                    )}
                </Grid>
            </FormControl>
        </form >
    )
}

FormGenerator.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    form: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    setting: PropTypes.object,
    toggleList: PropTypes.func,
    align: PropTypes.string
}

export default withStyles(styles)(FormGenerator);
