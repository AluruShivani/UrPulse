import React from 'react'
import Card from './card'
import CardBelow from './cardbelow'
import Doctor from './Doctor'
import Pharmacy from './Pharmacy'

export default function Home() {
  return (
    <div>
      <Card/>
      <CardBelow/>
      <Doctor/>
      <Pharmacy/>
    </div>
  )
}
