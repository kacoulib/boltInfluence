import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import { basicAuth } from '../lib/api/http/public';
import { Grid } from '@material-ui/core';
import FormValidator, { LeanForm } from '../lib/form/validator'

import withLayout from '../lib/withLayout';
import { styleLoginButton } from '../components/SharedStyles';
import FormGenerator from '../components/formElement/generator';
import SocialBtn from '../components/elements/socialBtn'
import Btn from '../components/elements/btn'
import Ucfirst from '../lib/ucfirst'
import { lightGray } from '../utils/variables/css'
import notify from '../lib/notifier';

const loginFields = [
  {
    label: "Adresse e-mail*",
    name: "email",
    type: 'email',
    required: true
  },
  {
    label: "Mot de passe*",
    name: "password",
    type: 'password',
    required: true,
  },
]
const settings = { unableBoxShadow: false, showLabel: true, labelPosition: 'top|left' };

const registerFields = [
  {
    label: "Adresse e-mail*",
    name: "email",
    type: 'email',
    required: true
  },
  {
    label: "Mot de passe*",
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
    props: {
      style: {
        fontSize: '.8rem'
      }
    }
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
    showRegister: false
  });

  const toggle = (name) => setState({ ...state, [name]: !state[name] });
  const onChange = (name, value) => setState({ ...state, [name]: value })

  const onSubmit = async () => {
    const fields = state.showRegister ? registerFields : loginFields;
    const errors = FormValidator({ fields, state });

    setState({ ...state, errors })
    if (errors.length)
      return

    try {

      const { login, message } = await basicAuth(LeanForm({ fields, state }));
      if (message)
        notify(message);
      if (login)
        window.location = '/admin/dashboard';
    } catch (err) {
    }
  };
  const socialsList = ['facebook', 'instagram', 'youtube', 'twitter', 'twitch', 'pinterest', 'tiktok', 'linkedin'];

  return (
    <div id="login" className='card-bg dots-pink reverse left'>
      <div>
        <h1 className='text-center'>{state.showRegister ? 'S’inscrire' : 'Connexion'}</h1>
        <Grid container className='text-center divider' id='container'>
          <Grid container item sm={6} xs={12}>
            <Grid sm={12} xs={12}>
              <h2 className='divider fullwidth'>Réseau social</h2>
              <ul id='social_container'>
                {socialsList && socialsList.map((elem, index) => (
                  <li key={index}><SocialBtn type={elem} text={Ucfirst(elem)} href={`/auth/${elem}`} /></li>
                ))}
              </ul>
            </Grid>
          </Grid>
          <Grid container item sm={6} xs={12}>
            <Grid sm={12} xs={12}>
              <h2 className='divider'>Avec un email</h2>
              <div id="form" className='auto responsive-container'>
                <FormGenerator
                  fields={state.showRegister ? registerFields : loginFields}
                  state={state}
                  onChange={onChange}
                  errors={state.errors}
                  settings={settings}
                />
              </div>
              <div id='submit'>
                <Btn text={state.showRegister ? 'Suivant' : 'Connexion'} onClick={onSubmit} />
              </div>
            </Grid>

          </Grid>
        </Grid>
        <p className='text-center fullwidth responsive-container'>Vous n'avez pas de compte ? <span className='red-color pointer' onClick={() => toggle('showRegister')}>{state.showRegister ? 'Connectez-vous' : 'Inscrivez-vous'} ici.</span></p>
      </div>
      <style jsx>{`
        #login {
          padding: 2rem 0;
        }
        .dots-pink::before {
          opacity: .5;
        }
        h1 {
          margin: 0;
          padding: 1rem 0;
        }
        #social_container,
        #form {
          width: 80%;
        }
        #social_container {
          max-width: 300px;
          margin: auto;
        }
        #social_container li {
          margin: .5rem 0;
        }
        #submit {
          padding: 1.5rem;
        }
        h2 {
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default withLayout(Login);
