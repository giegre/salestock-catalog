import React from 'react';
import {Link} from 'react-router-dom';

import Logo from '../logo.png';
import './Navbar.css';

//Fixed Navigation Bar
const Navbar = ({page}) => {

    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} style={styles} alt="Logo"/>
          </Link>

          <ul className="navbar-nav navbar-right">
            <li className="nav-item active">
              { page === 'list' ?
              <Link className="nav-link" to="/Login">Update Catalog</Link>
              : <Link className="nav-link" to="/">Home</Link>
              }
            </li>
          </ul>
        </div>
      </nav>
    )

}

const styles = {
  width: '150px'
}

export default Navbar;
