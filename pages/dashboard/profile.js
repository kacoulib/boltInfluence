import React, { useState } from "react";
import Head from 'next/head';

import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';
import FormGenerator from '../../components/form/generator';
import { plateformList } from '../../utils/variables/influencer'

const fields = [
    {
        name: "plateform",
        helpText: "Choose a platform:",
        type: 'chipList',
        list: plateformList
    },
    {
        label: "Lieu de résidence",
        name: "bornePlace",
        type: 'date',
        defaultValue: "2000-05-24",
        width: 6,
        required: true,
    },
    {
        label: "Date de naissance",
        name: "bornePlace",
        type: 'date',
        defaultValue: "2000-05-24",
        width: 6,
        required: true,
    },
    {
        label: "Langue",
        name: "languages",
        type: 'select',
        multiple: true,
        list: [
            'Oliver Hansen',
            'Van Henry',
            'April Tucker',
            'Ralph Hubbard',
            'Omar Alexander',
            'Carlos Abbott',
            'Miriam Wagner',
            'Bradley Wilkerson',
            'Virginia Andrews',
            'Kelly Snyder',
        ],
        required: true,
    },
    {
        label: "Titre",
        name: "title",
        type: 'input',
        required: true,
    },
    {
        label: "Titre",
        name: "title",
        type: 'input',
        required: true,
    },
]

const MyBooks = (props) => {
    const [form, setForm] = useState({

        firstName: "Karim",
        lastName: "Coulibaly",
        email: "kacoulib@gmail.com",
        password: "Test123$",
        companyName: "KacoulibINC",
        phone: "0645100284",
        languages: []
    })

    const onChange = (name) => ({ target: { value } }) => setForm(Object.assign({}, form, { [name]: value }));
    const onSubmit = async () => {

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
                <FormGenerator
                    fields={fields}
                    form={form}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    toggleList={toggleList}
                    align={'initial'}
                />
            </div>
        </div>
    )
};

export default withAuth(withLayout(MyBooks));
