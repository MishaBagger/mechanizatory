export default function Reviews() {
    return (
        <section className="reviews" id="reviews">
            <h2 className="title">Отзывы</h2>
            <div className="reviews__container">
                <iframe src="https://yandex.ru/maps-reviews-widget/72022469415?comments"></iframe>
            </div>
            <a
                className="links"
                href="https://yandex.ru/maps/org/shkola_mekhanizatorov/72022469415/"
                target="_blank"
                rel="noopener"
            >
                Школа Механизаторов на карте Вологды — Яндекс Карты
            </a>
        </section>
    )
}
