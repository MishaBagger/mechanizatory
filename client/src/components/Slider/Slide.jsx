import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SRC_URL } from '../../http'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Slide = ({ data }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            loop={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: true, // Это позволяет слайдерам продолжать автоматическую прокрутку даже после ручного взаимодействия
            }}
            pagination={{ clickable: true }}
        >
            {data.map((data, index) => {
                return (
                    <SwiperSlide key={data.title}>
                        {() => {
                            if (!data.title && !data.description) {
                                return (
                                    <div className="info__image">
                                        <img
                                            src={data.imagePath}
                                            alt={`license ${index + 1}`}
                                        />
                                    </div>
                                )
                            } else {
                                return (
                                    <>
                                        <div className="news__text">
                                            <h3 className="subtitle subtitle-news">
                                                {data.title}
                                            </h3>
                                            <p className="text text-news">
                                                {data.description}
                                            </p>
                                            {(function () {
                                                if (Object.hasOwn(data, 'link')) {
                                                    return (<a href={data.link} className='links' target='_blank'>Читать далее...</a>)
                                                }
                                            })()}
                                        </div>
                                        <div className="news__image">
                                            <img
                                                src={`${SRC_URL}/images/${data.image}`}
                                                alt={data.title}
                                            />
                                        </div>
                                    </>
                                )
                            }
                        }}
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default Slide
