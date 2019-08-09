import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { customRequest } from '../../lib/api/http'
import InfluencersPicture from '../../static/img/influenceurs_picture.png'
import FormGenerator from '../form/generator'
import Btn from '../elements/btn'
import { Grid } from '@material-ui/core';

const styles = {
    container: {
        padding: '3rem'
    }
}

const fields = [{
    label: "Prénom *",
    name: "firstname",
    type: 'input',
    disableUnderline: true,
    required: true,
    dimension: { xs: 6, sm: 12 },
    props: {
        style: {
            backgroundColor: '#fff',
            borderRadius: 5
        }
    }
},
{
    label: "Nom *",
    name: "lastname",
    type: 'input',
    disableUnderline: true,
    required: true,
    dimension: { xs: 6, sm: 12 },
    props: {
        style: {
            backgroundColor: '#fff',
            borderRadius: 5
        }
    }
},
{
    label: "Code postal *",
    name: "zipCode",
    type: 'input',
    disableUnderline: true,
    required: true,
    dimension: { xs: 6, sm: 12 },
    props: {
        style: {
            backgroundColor: '#fff',
            borderRadius: 5
        }
    }
},
{
    label: "Date de naissance *",
    name: "birthday",
    type: 'date',
    disableUnderline: true,
    required: true,
    dimension: { xs: 6, sm: 12 },
    props: {
        style: {
            backgroundColor: '#fff',
            borderRadius: 5
        }
    }
},
]

const Index = () => {
    const [state, setState] = useState({
        open: true,
        subscribe: false
    })

    const toggle = (name) => setState({ ...state, [name]: !state[name] });

    const onChange = (name, value) => setState({ ...state, [name]: value })

    return (
        <Dialog maxWidth={false} aria-labelledby="simple-dialog-title" open={state.open} >
            <div id='subscribe'>
                {state.subscribe ?
                    <div>
                        <Grid container justify="center" alignItems="center" className='text-center'>
                            <Grid item xs={12} sm={12}>
                                <div>
                                    <img src={InfluencersPicture} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormGenerator
                                fields={fields}
                                form={state}
                                onChange={onChange}
                            />
                        </Grid>
                    </div>
                    :
                    <div>
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={12} sm={6} className='text-center'>
                                <div className='text-container'>
                                    <h2>S'abonner maintenant</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                    <div className='link-container'>
                                        <Btn text="S'abonner maintenant" onClick={() => toggle('subscribe')} />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className='text-container'>
                                    <img src={InfluencersPicture} className='fullwidth' />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                }
            </div>
            <style jsx>{`
               #subscribe {
                   padding: 3rem 0;
                   color: white;
                   background-image: linear-gradient(-45deg, #101322, #20263d);
                }
                #subscribe > div {
                    padding: 5rem 1rem;
                }
                #subscribe .text-container {
                    padding: 0 1rem;
                }
                #subscribe h2 {
                    display: inline-block;
                    text-transform: uppercase;
                    font-size: 3rem;
                    color: #20263d;
                    background-color: #fff;
                }
                #subscribe .link-container {
                    font-size: 1.5rem;
                }
            `}</style>
        </Dialog>
    )
}
export default Index