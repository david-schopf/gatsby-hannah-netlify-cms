import React from 'react'
import Layout from "../components/Layout";
import ProjectGrid from '../components/ProjectGrid';

export default class IndexPage extends React.Component {
    render() {
        return (
            <Layout>
                <section className="section">
                    <div className="container">
                        <div className="content">
                            <ProjectGrid/>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }
}
