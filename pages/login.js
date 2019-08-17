import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import { basicAuth } from '../lib/api/http/public';
import { Grid } from '@material-ui/core';
import FormValidator, { LeanForm } from '../lib/form/validator'

import withLayout from '../lib/withLayout';
import { styleLoginButton } from '../components/SharedStyles';
import FormGenerator from '../components/form/generator';
import SocialBtn from '../components/elements/socialBtn'
import Btn from '../components/elements/btn'
import Ucfirst from '../lib/ucfirst'
import Divider from '@material-ui/core/Divider';
import { lightGray } from '../utils/variables/css'

const loginFields = [
  {
    label: "Email*",
    name: "email",
    type: 'email',
    required: true
  },
  {
    label: "Password*",
    name: "password",
    type: 'password',
    required: true,
  },
]
const settings = { unableBoxShadow: false, showLabel: true, labelPostion: 'top|left' };

const registerFields = [
  {
    label: "Email*",
    name: "email",
    type: 'email',
    required: true
  },
  {
    label: "Password*",
    name: "password",
    type: 'password',
    required: true,
  },
  {
    label: 'Prénom*',
    name: 'firstName',
    type: 'input',
    required: true,
  },
  {
    label: 'Nom*',
    name: 'lastName',
    type: 'input',
    required: true,
  },
  {
    label: "J'accepte de recevoir la Newsletter",
    name: 'newsletter',
    type: 'checkbox',
  },
  {
    label: "J'accepte de recevoir les notifications de nouveaux messages (nouvelle campagne publicitaire)",
    name: 'notification',
    type: 'checkbox',
  },
  {
    label: "J’accepte les conditions générales",
    name: 'cgt',
    type: 'checkbox',
  },
];

const Login = () => {
  const [state, setState] = useState({
    newsletter: false,
    notification: false,
    cgt: false,
    errors: [],
    showRegister: true
  });

  const toggle = (name) => setState({ ...state, [name]: !state[name] });
  const onChange = (name, value) => setState({ ...state, [name]: value })

  const onSubmit = async () => {
    const errors = FormValidator({ fields: state.showRegister ? loginFields : registerFields, state });

    setState({ ...state, errors })
    if (errors.length)
      return
    // const { login } = await basicAuth(state);

    // if (login)
    //   window.location = '/dashboard';
  };
  const socialsList = ['facebook', 'instagram', 'youtube', 'twitter', 'twitch', 'pinterest', 'tiktok', 'linkedin'];
  console.log(state)
  return (
    <div id="login" style={{ textAlign: 'center', padding: '0 20px' }} className='card-bg dots-pink reverse left'>
      <h1>{state.showRegister ? 'S’inscrire' : 'Connexion'}</h1>
      <Grid container className='text-center'>
        <Grid item sm={6} xs={6} justify="center" alignItems="center" className='text-center'>
          <h2>Réseau social</h2>
        </Grid>
        <Grid item sm={6} xs={6} justify="center" alignItems="center" className='text-center'>
          <h2>Avec un email</h2>
        </Grid>
        <Grid container item sm={6} xs={6} justify="center" className='text-center'>
          <ul id='social_container'>
            {socialsList && socialsList.map((elem, index) => (
              <li key={index}><SocialBtn type={elem} text={Ucfirst(elem)} /></li>
            ))}
          </ul>
        </Grid>
        <Grid container item sm={6} xs={6}>
          <Grid>
            <FormGenerator
              fields={state.showRegister ? registerFields : loginFields}
              state={state}
              onChange={onChange}
              errors={state.errors}
              settings={settings}
            />
            <div id='submit'>
              <Btn text={state.showRegister ? 'Suivant' : 'Connexion'} onClick={onSubmit} />
            </div>
          </Grid>

        </Grid>
        <p className='text-center fullwidth'>Vous n'avez pas de compte ? <span className='red-color pointer' onClick={() => toggle('showRegister')}>{state.showRegister ? 'Connectez-vous' : 'Inscrivez-vous'} ici.</span></p>
      </Grid>

      <style jsx>{`
        .dots-pink::before {
          opacity: .5;
        }
        h1 {
          margin: 0;
          padding: 1rem 0;
        }
        #social_container {
          width: 70%;
        }
        #social_container li {
          margin: .5rem 0;
        }
        #submit {
          padding: 1rem;
        }
      `}</style>
    </div>
  );
};

export default withLayout(Login);
