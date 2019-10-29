import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Admin, isAdmin, Brand, isBrand, Agency, isAgency, RoleList, Influencer, isInfluencer } from '../utils/variables/user'
let globalUser = null;

import Header from '../components/header/index';
import Aside from '../components/header/aside';
import Footer from '../components/footer/index';
import Error from '../pages/_error';
import { userProfileCompeleteFields } from '../utils/variables/user'

const validRole = (user, role) => {
  if (role) {
    if (!RoleList.includes(role))
      return false;
    if ((role == Influencer && !isInfluencer(user))
      || (role == Admin && !isAdmin(user))
      || (role == Brand && !isBrand(user))
      || (role == Agency && !isAgency(user)))
      return false;
  }
  return true
}
const userProfilePercent = (user) => {
  let count = 0;
  if (!user)
    return 0;

  userProfileCompeleteFields.map(e => count += user[e] ? 1 : 0);

  return ((count / userProfileCompeleteFields.length) * 100)
}


export default (
  Page,
  { loginRequired = true, logoutRequired = false, adminRequired = false, role = null, showAside = true, showSideProfile = false } = {},
) => class BaseComponent extends React.Component {
    static propTypes = {
      user: PropTypes.shape({
        id: PropTypes.string,
        isAdmin: PropTypes.bool,
      }),
      isFromServer: PropTypes.bool.isRequired,
    };

    static defaultProps = {
      user: null,
    };

    componentDidMount() {
      const { user, isFromServer } = this.props;
      const sub = Router.pathname.split('/')[1];

      user.profilePercent = userProfilePercent(user).toFixed();

      if (isFromServer) {
        globalUser = user;
      }
      // redirect depending
      if (sub == 'dashboard' && (!user || !RoleList.includes(user.role)))
        return Router.push('/logout');
      if (isInfluencer(user) && user.profilePercent < 70)
        return Router.push(`/${Influencer}/renseignement`);

      if (loginRequired) {
        if (user && !RoleList.includes(user.role))
          return Router.push('/logout');

        if ((!logoutRequired && !user))
          return Router.push('/login');
      }
      if (logoutRequired && user)
        Router.push('/logout');
    }

    static async getInitialProps(ctx) {
      const isFromServer = !!ctx.req;
      const user = ctx.req ? ctx.req.user && ctx.req.user.toObject() : globalUser;

      if (isFromServer && user) {
        user._id = user._id.toString();
      }

      const props = { user, isFromServer };

      if (Page.getInitialProps) {
        Object.assign(props, (await Page.getInitialProps(ctx)) || {});
      }

      return props;
    }

    render() {
      const { user } = this.props;

      if (loginRequired && !logoutRequired && !user) {
        return null;
      }

      if (logoutRequired && user) {
        return null;
      }

      if (adminRequired && (!user || !isAdmin(user))) {
        return null;
      }
      if (role && !validRole(user, role)) {
        return <Error />;
      }

      return (
        <React.Fragment>
          <Header {...this.props} />
          {showAside ?
            <Aside
              showSideProfile={showSideProfile}
            >
              <Page {...this.props} />
            </Aside>
            :
            <Page {...this.props} />
          }
          <Footer />
        </React.Fragment>
      );
    }
  };
