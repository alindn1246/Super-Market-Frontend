import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetAllProductsQuery } from '../../features/productsApi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './CardCarsoul.css';

// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Box } from '@mui/material';
import { Container } from 'react-bootstrap';
import CardsProduct from '../cards/CardsProduct';


export default function CardCarsoul() {
  const { data, error, isLoading } = useGetAllProductsQuery();
  
  return (
    <Container fluid className=' mt-3  ' style={{background:"#f8f8f8"}}>
     
     <div className='text-center mt-1'>
      <h1 style={{fontFamily:"poppins"}}>PRODUCTS</h1>
     </div>
     
      <Swiper
       
        
        keyboard={{
          enabled: true,
        }}

        pagination={{
          clickable: true,
        }}

        breakpoints={{
           300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 5,
              slidesPerGroup:3,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
              slidesPerGroup:5,
            
              
            },
          }}
        navigation={true}
       
        modules={[Keyboard, Pagination, Navigation]}
       id='swiper-cardcasoul'
      >
       
       
       {data && data.map(product => ( 
          <SwiperSlide key={product.id}>
            <CardsProduct products={[product]} />
          </SwiperSlide>
        ))}
        
       
        
       
        
       
       
       
      
        
      </Swiper>
    </Container>
  );
}
