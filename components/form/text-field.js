import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const TextFieldComp = ({ name, type, value, dimension, label, disableUnderline, onChange, showLabel, elemProps }) => {
    console.log(dimension)
    return (
        <Grid container>
            {showLabel && <Grid item {...labelSpacing}>{label}</Grid>}
            <Grid>
                <Grid item {...dimension}>
                    <TextField
                        type={type}
                        label={showLabel ? '' : label}
                        multiline={type === 'textarea'}
                        fullWidth
                        value={value}
                        onChange={onChange(name)}
                        InputProps={{
                            disableUnderline: !!disableUnderline
                        }}
                        style={{ paddingRight: '15px' }}
                        {...elemProps}
                        rows={8}
                        rowsMax={10}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}
export default TextFieldComp