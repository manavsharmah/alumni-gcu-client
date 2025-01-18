import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CardCarousel = ({ cards }) => {
  return (
    <div className="card-carousel-wrapper">
      <Swiper
        modules={[Navigation, Pagination]}
        loop={true}
        speed={700}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index} className="card-carousel-item">
            <a href={card.link} className="card-carousel-link">
              <img src={card.image} alt={card.title} className="card-carousel-image" />
              <p className="badge">{card.badge}</p>
              <h2 className="card-carousel-title">{card.title}</h2>
              <button className="card-carousel-button">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination"></div>
      <div className="swiper-slide-button swiper-button-prev"></div>
      <div className="swiper-slide-button swiper-button-next"></div>
    </div>
  );
};

export default CardCarousel;
