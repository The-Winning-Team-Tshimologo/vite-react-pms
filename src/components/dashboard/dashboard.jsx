import React from 'react';
import { services } from '../Constants';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, icon }) => {
  return(
    <>
      <div
        className='w-full p-[1px] rounded-[10px] columns-2 shadow-card'
      >
        <div 
          className='bg-tertiary rounded-[10px] py-5 px-12 min-h-[200px] flex justify evenly items-center flex-col'
        >
          <img src={icon} alt={title}
            className='w-20 h-20 object-contain'
          />
          <h3 className='text-white text-[24px] font-bold text-center'>{title}</h3>

        </div>
      </div>
    </>
  )
}

const Dashboard = () => {
  return (
    <>
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper( About, "about" )