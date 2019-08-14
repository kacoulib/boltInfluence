import React, { useState } from "react";
import Head from 'next/head';
import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';
import FormGenerator from '../../components/form/generator';
import { profileField } from '../../utils/variables/fields/profile'



const MyBooks = (props) => {
    const { user } = props;

    const [state, setState] = useState(Object.assign({ check: 'Mr', languages: [], civility: [], firstName: 'karim' }, { ...user }))

    const onChange = (name, value) => setState(Object.assign({}, state, { [name]: value }));
    const onSubmit = async () => {

        console.log(state)
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
                    fields={profileField}
                    state={state}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    align={'initial'}
                />
            </div>
        </div>
    )
};

export default withAuth(withLayout(MyBooks));
