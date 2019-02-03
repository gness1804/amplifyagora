import React from 'react';
import { Menu as Nav, Icon, Button } from 'element-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import content from '../utils/content';

const Navbar = ({ user, handleSignOut }) => (
  <Nav mode="horizontal" theme="dark" defaultActive="1">
    <div className="nav-container">
      <Nav.Item index="1">
        <NavLink to="/" className="nav-link" title="Home">
          <span className="app-title">
            <img
              src="https://icon.now.sh/account_balance/f90"
              alt="Home icon."
            />
            &nbsp; {content.Navbar.title}
          </span>
        </NavLink>
      </Nav.Item>

      <div className="nav-items">
        <Nav.Item index="2">
          <span className="app-user">
            {content.Navbar.userGreeting}
            {user.username}
          </span>
        </Nav.Item>
        <Nav.Item index="3">
          <NavLink to="/profile" className="nav-link" title="Profile">
            <Icon name="setting" />
            {content.Navbar.profileText}
          </NavLink>
        </Nav.Item>
        <Nav.Item index="4">
          <Button type="warning" onClick={handleSignOut}>
            {content.Navbar.signOutText}
          </Button>
        </Nav.Item>
      </div>
    </div>
  </Nav>
);

export default Navbar;

Navbar.propTypes = {
  user: PropTypes.shape({}).isRequired,
  handleSignOut: PropTypes.func.isRequired,
};
