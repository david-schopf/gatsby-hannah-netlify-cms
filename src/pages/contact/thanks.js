import React from 'react'
import Layout from '../../components/Layout'
import {Helmet} from "react-helmet";

export default () => (
    <Layout>
        <Helmet title="Kontakt | Hannah Schopf">
            <meta name="description" content='Vielen Dank für Ihre Nachricht'/>
        </Helmet>
        <section className="section">
            <div className="container">
                <div className="content">
                    <h1>Danke</h1>
                    <p>Für deine Nachricht</p>
                </div>
            </div>
        </section>
    </Layout>
)
