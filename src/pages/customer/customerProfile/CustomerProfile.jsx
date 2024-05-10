import Header from '@/components/header/Header'
import ProfessionalProfileCard from '@/components/professionalProfileCard/ProfessionalProfileCard'
import React from 'react'

const CustomerProfile = () => {
    

  return (
    <div className='profile__container'>
    <Header />
    <div className='review-carousel__container'>
       (
            <ProfessionalProfileCard
                useButtons={false}
                useDocs={false}
                useServiceDetails={true}
                // id={id}
            />
        ) 
    </div>

</div>
  )
}

export default CustomerProfile