import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import { Link } from '../../server/routes/next-routes'

import Button from '@material-ui/core/Button';

import notify from '../../lib/notifier';

import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';
import { getBookList } from '../../lib/api/http/admin';

const adminPaths = [
  { name: 'Posts', href: '/admin/posts' },
  { name: 'Process', href: '/admin/process' },
];

const Index = () => (
  <div style={{ padding: '10px 45px' }}>
    <div>
      <h2>Admin</h2>
      <ul>
        {adminPaths.map((b) => (
          <li key={b.name}>
            <Link href={b.href}><a title={b.name}>{b.name}</a></Link>
          </li>
        ))}
      </ul>
      <br />
    </div>
  </div>
)

export default withAuth(Index, { adminRequired: true });
