import React from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {Redirect} from '@docusaurus/router';

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Anonymize your test data and make GDPR a breeze">
      <Redirect to="/docs/intro" />
    </Layout>
  )
}
