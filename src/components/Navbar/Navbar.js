import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/auth';
import { useNav } from '../../context/nav';

const Navbar = () => {
  const { user } = useUser();
  const { nav, toggleCollapse, toggleUserDropdown } = useNav();

  const handleToggleNav = () => {
    toggleCollapse();
  };

  const handleToggleUserDropdown = (e) => {
    toggleUserDropdown();
  };

  const signOut = () => {
    firebase.auth().signOut();
  };

  const isAuth = user !== null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <NavLink to="/" exact className="navbar-brand" href="#nav">
        AnimalCrossingHub
      </NavLink>
      <button
        onClick={handleToggleNav}
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className={(nav.collapsed ? 'collapse' : '') + ' navbar-collapse'}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to="/islands" exact className="nav-link">
              Islands
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          {isAuth ? (
            <li className="nav-item dropdown">
              <a
                onClick={handleToggleUserDropdown}
                className="nav-link dropdown-toggle"
                href="#user"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Welcome, {user.displayName}
              </a>
              <div
                className={
                  (nav.showUserDropdown ? 'show' : '') + ' dropdown-menu'
                }
                aria-labelledby="navbarDropdownMenuLink"
              >
                <NavLink
                  onClick={handleToggleUserDropdown}
                  to="/dashboard"
                  exact
                  className="dropdown-item"
                >
                  Dashboard
                </NavLink>
                <a onClick={signOut} className="dropdown-item" href="#signout">
                  Sign out
                </a>
              </div>
            </li>
          ) : (
            <NavLink className="btn btn-outline-info" to="/login">
              Login
            </NavLink>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
