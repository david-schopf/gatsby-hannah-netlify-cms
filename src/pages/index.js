import React from 'react'
import Layout from "../components/Layout";


export default class IndexPage extends React.Component {
    render() {
        return (
            <Layout>
                <section className="section">
                    <div className="container">
                        <div className="content">
                            Welcome
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }
}
