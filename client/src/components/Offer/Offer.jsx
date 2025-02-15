
export default function Offer() {
    return (
        <section className="offer">
            <div className="offer__container">
                
                <div className="offer__background">
                    <img src="/src/assets/img/Background.png" alt="Background" />
                </div>
                <div className="offer__main">
                    <div className="offer__block">

                    <h1 className="title title-offer">Школа Механизаторов</h1>
                    <h2 className="subtitle subtitle-offer">Мы предлагаем обучение машинистов, трактористов и специалистов на спецтехнику, включая получение прав на различные категории и работу в Вологде, Великом Устюге и Вытегре</h2>
                    <button className="offer__button" onClick={() => window.location.href="#FormOrder"}><a href="#FormOrder" className="offer__link">Получить права</a></button>

                    </div>
                   
                </div>
            </div>
        </section>
    )
}