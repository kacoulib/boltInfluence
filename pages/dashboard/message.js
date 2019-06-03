import React, { useState, useEffect } from "react";
import Head from 'next/head';

import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';
import Grid from '../../components/dataDisplay/grid'

const fields = [
    {
        label: "Titre",
        name: "title",
        type: 'input',
        required: true,
        width: 4
    },
    {
        label: "Description",
        name: "description",
        type: 'wysiwyg',
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

        const res = await basicAuth(form)
        console.log(res)
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
            <h1 style={{ textAlign: 'center' }}>Message</h1>

            <div style={{ textAlign: 'left' }}>
                <Grid />
            </div>
        </div>
    )
};

export default withAuth(withLayout(MyBooks));
