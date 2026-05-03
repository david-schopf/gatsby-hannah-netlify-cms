import React from 'react'
import Layout from '../../components/Layout'

const Thanks = () => (
    <Layout>
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

export function Head() {
  return (
    <>
      <title>Kontakt | Hannah Schopf</title>
      <meta name="description" content='Vielen Dank für Ihre Nachricht'/>
    </>
  )
}

export default Thanks
