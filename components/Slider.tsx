import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";

const CarouselWrapper = styled.div`
  display: flex;
  width: 800px;
  padding: 10px 5%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    width: 500px;
  }
  * {
    border-radius: 15px;
  }
`;

const Slide = styled.div`
  img {
    height: 400px;
    @media (max-width: 700px) {
      height: 300px;
    }
  }
`;

const Slider = () => {
  return (
    <>
      <Head>
        <title>Slider</title>
        <link href="/styles/carousel.min.css" rel="stylesheet" />
      </Head>
      <CarouselWrapper>
        <Carousel
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          dynamicHeight={true}
          useKeyboardArrows={true}
          infiniteLoop={true}
        >
          <Slide>
            <img src="/images/pizza/pizza1.webp" />
          </Slide>
          <Slide>
            <img src="/images/pizza/pizza2.webp" />
          </Slide>
          <Slide>
            <img src="/images/pizza/pizza3.jpg" />
          </Slide>
          <Slide>
            <img src="/images/pizza/pizza4.webp" />
          </Slide>
          <Slide>
            <img src="/images/pizza/pizza5.webp" />
          </Slide>
        </Carousel>
      </CarouselWrapper>
    </>
  );
};

export default Slider;
