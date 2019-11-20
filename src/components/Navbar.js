import React from 'react'
import {Link} from 'gatsby'

const Navbar = class extends React.Component {
  constructor(props) {
      super(props);
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  };

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
              <Link to="/" className="navbar-item has-text-weight-bold">
                  Hannah Schopf
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/contact">
                Kontakt
              </Link>
            </div>
            <div className="navbar-end is-flex-desktop has-text-centered">
              <span className="navbar-item is-hidden-desktop">//</span>
              <Link className="navbar-item" to="/tags/text/">
                Text
              </Link>
              <Link className="navbar-item" to="/tags/theater/">
                Theater
              </Link>
              <Link className="navbar-item" to="/tags/film/">
                Film
              </Link>
              <span className="navbar-item">//</span>
              <Link className="navbar-item" to="/tags/autorin/">
                Autorin
              </Link>
              <Link className="navbar-item blupp" to="/tags/dramaturgin/">
                Dramaturgin
              </Link>
              <Link className="navbar-item" to="/tags/regisseurin/">
                Regisseurin
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
};

export default Navbar
