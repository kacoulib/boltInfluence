import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';

const AroundCitySlider = withStyles({
    root: {
      color: 'red',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

const styles = {
    title: {textDecoration: "underline red"},
}

const SelectCountry = () => {

    const [values, setValues] = React.useState({
        age: '',
        name: 'hai',
      });

    const country = [
        'France', 'Belgium', 'Germany', 
        'Spain', 'Italy', 'United Kingdom', 
        'Ireland', 'Portugal', 'Greece',
        'Ukraine', 'Bulgaria', 'Croatia',
        'Austria', 'Czechia', 'Slovakia',
        'Hungary', 'Serbia', 'Poland',
        'Denmark', 'Romania'
    ];

    const handleChange = (event) => {
        setValues(oldValues => ({
          ...oldValues,
          [event.target.name]: event.target.value,
        }));
    }

    return (
        <FormControl>
            <Select
                value={values.age}
                onChange={handleChange}
                inputProps={{
                    name: 'age',
                    id: 'age-simple',
                }}
            >
            {
                country.map((e, idx) => <MenuItem value={idx}>{e}</MenuItem>)
            }
            </Select>
        </FormControl>
    );
}

const Map = () => {
    return (
        <Grid item container sm={12} xs={12} alignItems="center" justify="center">
            <Grid item container sm={4} xs={4}>
                <Grid item sm xs={12}>
                    <h2 style={styles.title}>Pays</h2>
                    <SelectCountry />
                    <h2>Code postal</h2>
                    <Input
                        defaultValue=""
                        inputProps={{
                        'aria-label': 'zipcode',
                        }}
                    />
                    <h2>Ville périmètre</h2>
                    <AroundCitySlider valueLabelDisplay="auto" aria-label="Pretto slider" defaultValue={20} />
                </Grid>
            </Grid>
            <Grid item sm={8} xs={4}></Grid>
        </Grid>
    );
}

export default Map