import React from 'react'
import {Link} from 'gatsby'

const Footer = class extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered font-playfair">
                    <Link to={"/impressum"}>Impressum & Datenschutz</Link> | &copy; Hannah
                    Schopf {new Date().getFullYear()}
                </div>
            </footer>
        )
    }
};

export default Footer
