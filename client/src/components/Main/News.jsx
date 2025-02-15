import Slider from "../Slider/Slider"
export default function News () {
    return (
        <section className="news" id="news">
            <h2 className="title">Наши услуги</h2>
            <div className="news__container">
            <Slider>Services</Slider>
            </div>
        </section>
    )
}