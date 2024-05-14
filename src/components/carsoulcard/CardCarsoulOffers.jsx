import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetAllProductsQuery } from '../../features/productsApi';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './CardCarsoul.css';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Box } from '@mui/material';
import { Container } from 'react-bootstrap';
import CardsProduct from '../cards/CardsProduct';

export default function CardCarsoulOffers() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7211/api/product/GetOffers');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container fluid className='mt-3' style={{ background: '#f8f8f8' }}>
      <div className='text-center mt-1'>
      <h1 style={{fontFamily:"poppins"}}>OFFERS</h1>
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
            slidesPerGroup: 3,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
            slidesPerGroup: 5,
          },
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        id='swiper-cardcasoul'
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <CardsProduct products={[product]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
