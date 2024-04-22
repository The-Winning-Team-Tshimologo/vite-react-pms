import Header from '@/components/header/Header'
import ProfessionalProfileCard from '@/components/professionalProfileCard/ProfessionalProfileCard'
import React from 'react'
import './ApplicantPage.css'

const ApplicantPage = () => {
  return (
    <div>
        <Header/>
        <ProfessionalProfileCard useDocs={true}/>
        
    </div>
  )
}

export default ApplicantPage