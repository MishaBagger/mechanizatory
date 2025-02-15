export default function Advantages() {
    return (
        <section className="advantages">
            <div className="advantages__container">
                <h2 className="title">Почему именно мы?</h2>
                <div className="advantages__grid">
                    <div className="advantages__block">
                        <hr className="advantages__hr" />
                        <div className="advantages__title">
                            <div className="advantages__block-container">
                                <img
                                    src="/src/assets/img/advantages_1.png"
                                    alt="advantages_1"
                                />
                            </div>
                            <div className="advantages__block-container">
                                <h3 className="subtitle subtitle-advantages">
                                    Самые квалифицированные инструкторы
                                </h3>
                            </div>
                        </div>
                        <div className="advantages__description">
                            <p className="text text-advantages">
                                Профессиональная подготовка трактористов всех
                                категорий.
                            </p>
                        </div>
                    </div>

                    <div className="advantages__block">
                        <hr className="advantages__hr" />
                        <div className="advantages__title">
                            <div className="advantages__block-container">
                                <img
                                    src="/src/assets/img/advantages_2.png"
                                    alt="advantages_2"
                                />
                            </div>
                            <div className="advantages__block-container">
                                <h3 className="subtitle subtitle-advantages">
                                Быстрые сроки обучения
                                </h3>
                            </div>
                        </div>
                        <div className="advantages__description">
                            <p className="text text-advantages">
                            Продолжительность обучения от 1 недели до 2 месяцев.
                            </p>
                        </div>
                    </div>

                    <div className="advantages__block">
                        <hr className="advantages__hr" />
                        <div className="advantages__title">
                            <div className="advantages__block-container">
                                <img
                                    src="/src/assets/img/advantages_3.png"
                                    alt="advantages_3"
                                />
                            </div>
                            <div className="advantages__block-container">
                                <h3 className="subtitle subtitle-advantages">
                                Низкие цены на обучение
                                </h3>
                            </div>
                        </div>
                        <div className="advantages__description">
                            <p className="text text-advantages">
                            Доступные цены на получение категорий!
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
