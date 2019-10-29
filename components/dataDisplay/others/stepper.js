import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Btn from '../../elements/btn'

const activeComplete = {
    background: '#F13F4B',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    transform: 'scale(1)',
    border: '3px solid white',
}

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 25,
        height: 25,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #F13F4B',
        backgroundColor: 'none',
        position: 'relative',
        transform: 'scale(.5)'
    },
    active: activeComplete,
    completed: activeComplete,
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));


const StepperComp = ({ steps, getStepContent, submit, finish }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleStep = step => () => {
        setActiveStep(step);
    };

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} nonLinear orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                            <div className='pointer' onClick={handleStep(index)}><h2>{label}</h2></div>
                        </StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                {index !== steps.length - 1 ?
                                    <div>
                                        <Btn
                                            text="Suivant"
                                            style={{ background: 'none', color: '#F13F4B', border: '1px solid #F13F4B' }}
                                            onClick={() => finish() && handleNext()}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Btn>
                                    </div>
                                    :
                                    <div className='text-center'>
                                        <Btn
                                            text="Finaliser"
                                            style={{ minWidth: '50%' }}
                                            onClick={submit}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Btn>
                                    </div>
                                }
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}
StepContent.propTypes = {
    steps: PropTypes.array.isRequired,
    getStepContent: PropTypes.func.isRequired,
    finish: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
}
export default StepperComp