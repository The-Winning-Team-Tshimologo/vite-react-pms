import Header from '@/components/header/Header'
import ProfessionalProfileCard from '@/components/professionalProfileCard/ProfessionalProfileCard'
import React from 'react'
import { useParams } from 'react-router'

const CustomerProfile = () => {
   const { id }= useParams();

  return (
    <div className='profile__container'>
    <Header />
    <div className='review-carousel__container'>
       (
            <ProfessionalProfileCard
                useButtons={false}
                useDocs={false}
                useServiceDetails={true}
                id={id}
            />
        ) 
    </div>

</div>
  )
}

export default CustomerProfile