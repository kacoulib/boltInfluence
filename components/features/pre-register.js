import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { customRequest } from '../../lib/api/http'
import InfluencersPicture from '../../static/img/influenceurs_picture.png'
import FormGenerator from '../form/generator'
import Btn from '../elements/btn'
import { Grid } from '@material-ui/core';
import SocialBtn from '../elements/socialBtn'
import FormValidator, { LeanForm } from '../../lib/form/validator'
import { Router } from '../../server/routes/next-routes'

const fields = [
    {
        label: "Nom *",
        name: "lastname",
        type: 'input',
        required: true,
        dimension: { xs: 12, sm: 6 },
        props: {
            style: {
                backgroundColor: '#fff',
                borderRadius: 5
            }
        }
    },
    {
        label: "Prénom *",
        name: "firstname",
        type: 'input',
        required: true,
        dimension: { xs: 12, sm: 6 },
        props: {
            style: {
                backgroundColor: '#fff',
                borderRadius: 5
            },
            unableBoxShadow: false
        }
    },
    {
        label: "Date de naissance *",
        name: "birthday",
        type: 'date',
        required: true,
        dimension: { xs: 12, sm: 6 },
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
        required: true,
        dimension: { xs: 12, sm: 6 },
        props: {
            style: {
                backgroundColor: '#fff',
                borderRadius: 5
            }
        }
    },
    {
        label: "Centre d'intérêt",
        name: "interest",
        type: 'select',
        required: true,
        multiple: true,
        dimension: { xs: 12, sm: 12 },
        list: [
            { name: 'Sport', value: 'sport' },
            { name: 'Beauté', value: 'beauty' },
            { name: 'Mode', value: 'mode' },
            { name: 'Photographie', value: 'shooting' },
            { name: 'High-Tech', value: 'high-tech' },
            { name: 'Gaming', value: 'gaming' },
        ],
        props: {
            style: {
                backgroundColor: '#fff',
                borderRadius: 5
            }
        }
    },
]

const settings = { unableBoxShadow: false };

const Index = () => {
    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        zipCode: '',
        birthday: '',
        interest: '',
        open: true,
        subscribe: true,
    })

    const toggle = (name) => setState({ ...state, [name]: !state[name] });

    const onChange = (name, value) => setState({ ...state, [name]: value })
    const handleSubmit = (socialName) => {
        if (FormValidator({ fields, state }))
            Router.pushRoute(`/auth/${socialName}?${encodeURI(JSON.stringify(LeanForm({ fields, state })))}`)
    }

    return (
        <Dialog maxWidth={false} aria-labelledby="simple-dialog-title" open={state.open} >
            <div id='subscribe'>
                {state.subscribe ?
                    <div id='socials-slide'>
                        <div className='close pointer' onClick={() => toggle('open')} >X</div>
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
                                state={state}
                                onChange={onChange}
                                settings={settings}
                            />
                            <p className='italic'>*Champs obligatoire</p>
                        </Grid>
                        <div id='minimum'>
                            <h3 className='inline-block auto'>Minimum connexion à un compte</h3>
                        </div>
                        <Grid container justify="center" alignItems="center" className='text-center'>
                            <Grid item xs={6} sm={6}><SocialBtn type='facebook' text='Facebook' onClick={() => handleSubmit('facebook')} /></Grid>
                            <Grid item xs={6} sm={6}><SocialBtn type='instagram' text='Instagram' onClick={() => handleSubmit('instagram')} /></Grid>
                            <Grid item xs={6} sm={6}><SocialBtn type='youtube' text='Youtube' onClick={() => handleSubmit('youtube')} /></Grid>
                            <Grid item xs={6} sm={6}><SocialBtn type='twitter' text='Twitter' onClick={() => handleSubmit('ywitter')} /></Grid>
                            <Grid item xs={6} sm={6}><SocialBtn type='twitch' text='Twitch' onClick={() => handleSubmit('twitch')} /></Grid>
                            <Grid item xs={6} sm={6}><SocialBtn type='pinterest' text='Pinterest' onClick={() => handleSubmit('pinterest')} /></Grid>
                            <Grid item xs={6} sm={6}><SocialBtn type='tiktok' text='Tiktok' onClick={() => handleSubmit('tiktok')} /></Grid>
                            <Grid item xs={6} sm={6}><SocialBtn type='linkedin' text='Linkedin' onClick={() => handleSubmit('linkedin')} /></Grid>
                        </Grid>
                        <div className='link-container text-center' id="submit">
                            <Btn text="Envoyer & fermer" onClick={handleSubmit} />
                        </div>
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
                   background-image: linear-gradient(-45deg, #101322, rgba(37, 44, 70, 0.92));
                }
                #subscribe > div {
                    padding: 0 1rem 5rem 1rem;
                }
                #socials-slide {
                    position: relative;
                    width: 70%;
                    margin: auto;
                }
                #socials-slide .close{
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: #ea3e4a;
                    font-size: 2rem;
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
                #submit.link-container{
                    margin-top: 1rem;
                    font-size: 1.2rem;
                }
                #minimum {
                    padding: 1rem;
                    text-align: center;
                }
            `}</style>
        </Dialog>
    )
}
export default Index