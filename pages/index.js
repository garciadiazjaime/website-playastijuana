import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import 'isomorphic-unfetch'

import Layout from '../components/layout'
import Place from '../components/place'

const apiURL = process.env.API_URL

export default class extends React.Component {

  static async getInitialProps() {
    const res = await fetch(`${apiURL}/places`)
    const places = await res.json()
    return { places }
  }

  renderPlaces() {
    const { places } = this.props;
    if (places && places.length) {
      return places.map(place => <Place place={place} key={place.placeId} />);
    }
    return null;
  }

  render() {
    return (<Layout>
      {this.renderPlaces()}
    </Layout>);
  }
}
