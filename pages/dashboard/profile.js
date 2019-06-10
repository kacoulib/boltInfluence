import React, { useState } from "react";
import Head from 'next/head';

import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';
import FormGenerator from '../../components/form/generator';
import { plateformList } from '../../utils/variables/influencer'
import { languageList } from '../../utils/variables/language'

const fields = [
    {
        name: "avatarUrl",
        type: 'img',
        required: true,
        style: {
            textAlign: 'center',
            margin: 'auto',
            display: 'block',
            maxHeight: 100
        }
    },
    {
        label: "Nom",
        name: "firstName",
        type: 'input',
        row: 6,
        required: true,
    },
    {
        label: "Prénom",
        name: "lastName",
        type: 'input',
        row: 6,
        required: true,
    },
    {
        label: "Age",
        name: "age",
        type: 'date',
        defaultValue: "2000-05-24",
        row: 6,
        required: true,
    },
    {
        label: "Lieu de résidence",
        name: "bornePlace",
        type: 'input',
        row: 6,
        required: true,
    },
    {
        helpText: "Langue",
        name: "languages",
        type: 'select',
        multiple: true,
        list: languageList,
        required: true,
    },
]

const MyBooks = (props) => {
    const { user } = props;

    const [form, setForm] = useState(Object.assign({ languages: [] }, { ...user }))
    // {

    //     firstName: "Karim",
    //     lastName: "Coulibaly",
    //     email: "kacoulib@gmail.com",
    //     password: "Test123$",
    //     companyName: "KacoulibINC",
    //     phone: "0645100284",
    //     languages: []
    // })

    const onChange = (name) => ({ target: { value } }) => setForm(Object.assign({}, form, { [name]: value }));
    const onSubmit = async () => {

        console.log(form)
    };
    console.log(props, form)
    return (
        <div style={{ padding: '10px 45px' }}>
            <Head>
                <title>
                    Log in to Builder Book
                </title>
                <meta name="description" content="Login page for builderbook.org" />
            </Head>
            <br />
            <h1 style={{ textAlign: 'center' }}>Profile</h1>

            <div style={{ textAlign: 'left' }}>
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
