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


const loginFields = [
  {
    label: "Email *",
    name: "email",
    type: 'email',
    required: true,
    // props: {
    //     style: {
    //         backgroundColor: '#fff',
    //         borderRadius: 5
    //     }
    // }
  },
  {
    label: "Password *",
    name: "password",
    type: 'password',
    required: true,
    // props: {
    //     style: {
    //         backgroundColor: '#fff',
    //         borderRadius: 5
    //     },
    //     unableBoxShadow: false
    // }
  },
]
const settings = { unableBoxShadow: false };


const styles = {
  buttonIcon: {
    marginRight: '10px',
  },
  instagramButton: {
    color: 'white',
    background: '#f09433',
    background:
      '-moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    background:
      '-webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
    background:
      'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
    filter:
      "progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 ",
  },
};

const fields = [
  {
    label: 'First name',
    name: 'firstName',
    type: 'input',
    required: true,
    width: 6,
  },
  {
    label: 'Last name',
    name: 'lastName',
    type: 'input',
    required: true,
    width: 6,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
    width: 6,
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    required: true,
    width: 6,
  },
  {
    label: 'Company name',
    name: 'companyName',
    type: 'input',
    required: true,
    width: 6,
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'number',
    required: true,
    width: 6,
  },
];

const Login = () => {
  const [state, setState] = useState({
    firstName: 'Karim',
    lastName: 'Coulibaly',
    email: 'kacoulib@gmail.com',
    password: 'Test123$',
    companyName: 'KacoulibINC',
    phone: '0645100284',
    errors: []
  });

  const onChange = (name) => ({ target: { value } }) =>
    setState(Object.assign({}, state, { [name]: value }));
  const onSubmit = async () => {
    const { login } = await basicAuth(state);

    if (login) window.location = '/dashboard';
  };

  return (
    <div style={{ textAlign: 'center', margin: '0 20px' }}>
      <Grid container justify="center" alignItems="center" className='text-center'>
        <Grid item sm={6} xs={6} justify="center" alignItems="center" className='text-center'>
          Réseau social
          </Grid>
        <Grid item sm={6} xs={6} justify="center" alignItems="center" className='text-center'>
          Réseau social
          </Grid>
        <Grid container item sm={6} xs={6} justify="center" alignItems="center" className='text-center'>
          <div id='social_container'>
            <div><SocialBtn type='facebook' text='Facebook' onClick={() => onChange('selectedSocial', 'facebook')} /></div>
            <div><SocialBtn type='instagram' text='Instagram' href="/auth/facebook" /></div>
            <div><SocialBtn type='youtube' text='Youtube' onClick={() => onChange('selectedSocial', 'youtube')} /></div>
            <div><SocialBtn type='twitter' text='Twitter' onClick={() => onChange('selectedSocial', 'ywitter')} /></div>
            <div><SocialBtn type='twitch' text='Twitch' onClick={() => onChange('selectedSocial', 'twitch')} /></div>
            <div><SocialBtn type='pinterest' text='Pinterest' onClick={() => onChange('selectedSocial', 'pinterest')} /></div>
            <div><SocialBtn type='tiktok' text='Tiktok' onClick={() => onChange('selectedSocial', 'tiktok')} /></div>
            <div><SocialBtn type='linkedin' text='Linkedin' onClick={() => onChange('selectedSocial', 'linkedin')} /></div>
          </div>
        </Grid>
        <Grid container item sm={6} xs={6}>
          <FormGenerator
            fields={fields}
            state={state}
            onChange={onChange}
            errors={state.errors}
            settings={settings}
          />
        </Grid>
      </Grid>


      <div>
        <Button variant="contained" type="submit" className='submit large' onClick={() => onSubmit()}>
          Mettre à jour
                </Button>
      </div>
      <style jsx>{`
        #social_container {
          width: 70%;
        }
      `}</style>
    </div>
  );
};

export default withLayout(Login);
