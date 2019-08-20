import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import { Link } from '../../server/routes/next-routes'

import Button from '@material-ui/core/Button';

import notify from '../../lib/notifier';

import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';
import { getBookList } from '../../lib/api/http/admin';

const adminPaths = [{ name: 'Posts', href: '/admin/posts' }];

const Index = ({ books }) => (
  <div style={{ padding: '10px 45px' }}>
    <div>
      <h2>Admin</h2>
      <Link href="/admin/posts">
        <Button variant="contained">Users</Button>
      </Link>
      <p />
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
);

Index.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

class IndexWithData extends React.Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    try {
      // const { books } = await getBookList();
      // this.setState({ books }); // eslint-disable-line
    } catch (err) {
      notify(err);
    }
  }

  render() {
    return <Index {...this.state} />;
  }
}

export default withAuth(IndexWithData, { adminRequired: true });
