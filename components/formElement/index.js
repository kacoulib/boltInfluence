import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';

let labelDimension = { xs: 6, ms: 12 },
    className;
const defaultDimension = { xs: 12, ms: 12 }

const iconDisplay = (src) => <img src={src} className='elem-icon' />
const LableWrapper = ({ label, labelPosition = '', icon, ...props }) => {
    if (labelPosition.includes && labelPosition.includes('top'))
        labelDimension.xs = 12
    if (labelPosition.includes && labelPosition.includes('left'))
        className = 'text-left'

    return (
        <Grid container justify="space-between" alignItems="center" alignContent='center'>
            <Grid item {...labelDimension} className={className}>
                {icon && iconDisplay(icon)}
                {label}
            </Grid>
            <Grid item {...labelDimension}>{props.children}</Grid>
        </Grid>
    )
}

const FormElementWrapper = ({ showLabel = false, icon, ...props }) => {

    if (showLabel)
        return (<LableWrapper {...props} icon={icon} />)

    return (
        <Grid item container alignItems='center' justify='space-between' {...defaultDimension}>
            {icon && <Grid item xs={1}>
                {icon && iconDisplay(icon)}
            </Grid>}

            <Grid item xs={icon ? 11 : 12} className={icon ? 'input-icon-wrapper' : ''}>{props.children}</Grid>
        </Grid>
    )
}
FormElementWrapper.propTypes = {
    showLabel: PropTypes.bool,
    label: PropTypes.string,
}

export { FormElementWrapper }