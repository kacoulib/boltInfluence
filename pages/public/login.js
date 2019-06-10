import React, { useState, useEffect } from "react";
import { basicAuth } from '../../lib/api/public'
import Head from 'next/head';
import Button from '@material-ui/core/Button';

import withLayout from '../../lib/withLayout';
import { styleLoginButton } from '../../components/SharedStyles';
import FormGenerator from '../../components/form/generator'

const styles = {
  buttonIcon: {
    marginRight: '10px'
  },
  instagramButton: {
    color: 'white',
    background: "#f09433",
    background: "-moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    background: "-webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
    background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 ",
  }
}

const fields = [
  {
    label: "First name",
    name: "firstName",
    type: 'input',
    required: true,
    width: 6
  },
  {
    label: "Last name",
    name: "lastName",
    type: 'input',
    required: true,
    width: 6
  },
  {
    label: "Email",
    name: "email",
    type: 'email',
    required: true,
    width: 6
  },
  {
    label: "Password",
    name: "password",
    type: 'password',
    required: true,
    width: 6

  },
  {
    label: "Company name",
    name: "companyName",
    type: 'input',
    required: true,
    width: 6
  },
  {
    label: "Phone",
    name: "phone",
    type: 'number',
    required: true,
    width: 6

  },
]

const Login = () => {
  const [form, setForm] = useState({

    firstName: "Karim",
    lastName: "Coulibaly",
    email: "kacoulib@gmail.com",
    password: "Test123$",
    companyName: "KacoulibINC",
    phone: "0645100284",
  })

  const onChange = (name) => ({ target: { value } }) => setForm(Object.assign({}, form, { [name]: value }));
  const onSubmit = async () => {

    const { login } = await basicAuth(form);

    if (login)
      window.location = "/dashboard"
  };

  return (
    <div style={{ textAlign: 'center', margin: '0 20px' }}>
      <Head>
        <title>
          Log in to Builder Book
      </title>
        <meta name="description" content="Login page for builderbook.org" />
      </Head>
      <br />
      <p style={{ margin: '45px auto', fontSize: '44px', fontWeight: '400' }}>
        Log in
    </p>
      <p>
        You’ll be logged in for 14 days unless you log out manually.
    </p>
      <br />
      <Button variant="contained" style={styleLoginButton} href="/auth/google">
        <img
          src="https://storage.googleapis.com/builderbook/G.svg"
          alt="Log in with Google"
          style={styles.buttonIcon}
        />
        Log in with Google
    </Button>
      <br />
      <Button variant="contained" style={styles.instagramButton} href="/auth/instagram">
        <span className='fa fa-instagram' style={styles.buttonIcon}></span>
        Instagram
    </Button>

      <div>
        <FormGenerator
          fields={fields}
          form={form}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
};

export default withLayout(Login);
