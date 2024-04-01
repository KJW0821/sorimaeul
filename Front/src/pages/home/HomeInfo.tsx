import React from 'react';
import Slider from 'react-slick';

const HomeInfo = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
  };
  return (
    <div className="carousel">
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
      </Slider>
    </div>
  );
};

export default HomeInfo;
