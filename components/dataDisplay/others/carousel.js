import Slider from "react-slick";

var defaultSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};
const CarouselComp = (props) => {
    const tmp = { ...defaultSettings, ...props.settings };

    return (
        <div className='fullwidth'>
            <Slider {...tmp}>{props.children}</Slider>
        </div>
    )
}

export default CarouselComp