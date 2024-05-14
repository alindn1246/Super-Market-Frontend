import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';

import imag1 from './Ready-for-Lunch-Banner.jpg'
import imag2 from './Free-Delivery-100.jpg'
import imag3 from './phoneprom.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './Hero.css'
import { Button, Nav } from 'react-bootstrap';
function DarkVariantExample() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
    
    return (
        <Carousel fade activeIndex={index} onSelect={handleSelect} >
            <Carousel.Item interval={1000}>
           
              <img
                    className="d-block w-100"
                    src={imag1}
                    alt="First slide"
                    style={{ cursor: "pointer" }}
                />
            
                
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src={imag2}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item  interval={1000}>
                <img
                    className="d-block w-100"
                    src={imag3}
                    alt="Third slide"
                />
            </Carousel.Item>
           
        </Carousel>
    );
}

export default DarkVariantExample;
