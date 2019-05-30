import React from 'react';
import Head from 'next/head';

import withLayout from '../lib/withLayout';

const Index = () => (
  <div style={{ padding: '10px 45px' }}>
    <Head>
      <title>Settings</title>
      <meta
        name="description"
        content="Welcome."
      />
    </Head>
    <p>Welcome </p>

  </div>
)


export default withLayout(Index);
