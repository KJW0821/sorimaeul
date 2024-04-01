import { useState, useEffect, useReducer } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';

const HomeInfo: React.FC = () => {
  // 이유는 모르겠으나 이렇게 해줘야 정상작동함 (계산떄려서 값 바꾸기)
  const [activeSlideIndex, setActiveSlideIndex] = useState(5);

  useEffect(() => {
    setActiveSlideIndex(0);
  }, []);

  return (
    <div className="-mt-16">
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        autoplay={true}
        autoplayDelay={5000}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 1,
            itemsToScroll: 1,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
        <div style={{ width: 800, height: 450, background: '#ff80ed' }}>
          slide 0
        </div>
        <div style={{ width: 800, height: 450, background: '#065535' }}>
          slide 1
        </div>
        <div style={{ width: 800, height: 450, background: '#000000' }}>
          slide 2
        </div>
        <div style={{ width: 800, height: 450, background: '#133337' }}>
          slide 3
        </div>
        <div style={{ width: 800, height: 450, background: '#ffc0cb' }}>
          slide 4
        </div>
      </ReactSimplyCarousel>
    </div>
  );
};

export default HomeInfo;
