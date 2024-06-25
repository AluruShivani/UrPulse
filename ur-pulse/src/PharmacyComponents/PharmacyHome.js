import React from 'react'
import PharmacyMenu from './PharmacyMenu'
import ViewPrescription from './ViewPrescription'
import PharmacyProfile from './PharmacyProfile'

export default function PharmacyHome() {
  return (
    <div>
      <PharmacyMenu/>
      <ViewPrescription/>
      <PharmacyProfile/>
    </div>
  )
}
