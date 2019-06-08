import React, { useState, useEffect } from "react";
import Router from 'next/router'
import Head from 'next/head';

import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';
import FormGenerator from '../../components/form/generator';
import ChipList from '../../components/form/chipList';
import { plateformList } from '../../utils/variables/influencer'
const fields = [
  {
    label: "Titre",
    name: "title",
    type: 'input',
    required: true,
  },
  {
    label: "Description",
    name: "description",
    type: 'wysiwyg',
    helpText: 'Message'
  },
]

const MyBooks = () => {
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

    console.log('1')
    const res = await basicAuth(form);
    console.log('1')
    Router.push('/dashboard')
    console.log(res)
  };

  const [list, setList] = useState(plateformList)

  const toggleList = (i) => {
    let tmp = list.slice();

    tmp[i].selected = !tmp[i].selected;
    setList(tmp)
  };

  return (
    <div style={{ padding: '10px 45px' }}>
      <Head>
        <title>
          Log in to Builder Book
      </title>
        <meta name="description" content="Login page for builderbook.org" />
      </Head>
      <br />
      <h1 style={{ textAlign: 'center' }}>Campagne</h1>

      <div style={{ textAlign: 'left' }}>
        <ChipList list={list} onClick={toggleList} onDelete={toggleList} />
        <FormGenerator
          fields={fields}
          form={form}
          onChange={onChange}
          onSubmit={onSubmit}
          align={'initial'}
        />
      </div>
    </div>
  )
};

export default withAuth(withLayout(MyBooks));
