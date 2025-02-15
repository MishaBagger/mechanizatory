export default function AboutUs () {
    return (
        <section className="about" id="about">
            <h2 className="title">О Школе Механизаторов</h2>
            <div className="about__container">
                <div className="about__description about__description-right">
                <h3 className="subtitle">Профессиональная подготовка</h3>
                <p className="text">Наш центр предлагает базисный учебный план и эффективную программу профессиональной подготовки на категории: <span className="span-bold">«A1», «A2», «A3», «B», «C», «D», «E», «F».</span> Теоретический курс и практические навыки на нашем полигоне.</p>
                </div>
                <div className="about__image about__image-left">
                    <img src="/src/assets/img/Offer1.png" alt="Offer1" />
                </div>
            </div>

            <div className="about__container">
                <div className="about__image about__image-right">
                    <img src="/src/assets/img/Offer2.png" alt="Offer2" />
                </div>
                <div className="about__description about__description-left">
                <h3 className="subtitle">План обучения</h3>
                <p className="text">Продолжительность обучения может составить от <span className="span-bold">1 недели</span> до <span className="span-bold">2 месяцев.</span> За это время учащиеся получают ряд знаний, необходимых для управления, обслуживания и ремонта самоходных машин установленных категорий.</p>
                </div>
            </div>
            <div className="attention attention-short">
                <p className="text text-attention">Мы гарантируем хорошую подготовку и успешную сдачу экзамена для наших обучающихся.</p>
            </div>

            </section>
    )
}