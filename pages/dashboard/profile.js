import React, { useState } from "react";
import Head from 'next/head';

import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';
import FormGenerator from '../../components/form/generator';
import { plateformList } from '../../utils/variables/influencer'
import { languageList, civilityList } from '../../utils/variables/general'

const fields = [
    {
        name: "avatarUrl",
        type: 'img',

        props: {
            required: true,
            style: {
                textAlign: 'center',
                margin: 'auto',
                display: 'block',
                maxHeight: 100
            }
        }
    },
    {
        label: "Civilité",
        name: "civility",
        type: 'select',
        list: civilityList,

        props: {
            required: true,
        }
    },
    {
        label: "Nom",
        name: "firstName",
        type: 'input',
        dimension: { xs: 6 },

        props: {
            required: true,
            autoFocus: true
        }
    },
    {
        label: "Prénom",
        name: "lastName",
        type: 'input',
        dimension: { xs: 6 },

        props: {
            required: true,
        }
    },
    {
        label: "Age",
        name: "age",
        type: 'date',
        defaultValue: "2000-05-24",
        props: {
            required: true,
        }
    },
    {
        label: "Lieu de résidence",
        name: "bornePlace",
        type: 'input',
        props: {
            required: true,
        }
    },
    {
        label: "Langue",
        name: "languages",
        type: 'select',
        multiple: true,
        list: languageList,
        props: {
            required: true,
        }
    },
]

const MyBooks = (props) => {
    const { user } = props;

    const [form, setForm] = useState(Object.assign({ languages: [], civility: [] }, { ...user }))
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
