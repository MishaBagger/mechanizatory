export default function Schema() {
    return (
        <div
            className="visually-hidden"
            itemScope
            itemType="http://schema.org/Organization"
        >
            <span itemProp="name">Школа Механизаторов</span>
            <span itemProp="description">
                Обучение на тракторные права в Вологде, удостоверение
                тракториста-машиниста, работа на спецтехнике. Категории AI, AII,
                AIII, B, C, D, E, F.
            </span>
            <div
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
            >
                <span itemProp="streetAddress">
                    Вологда, Советский проспект, 113Б
                </span>
                <span itemProp="addressCountry">Россия</span>
                <span itemProp="addressLocality">Вологда</span>
            </div>
            <a href="mailto:mechanizatory@mail.ru" itemProp="email">
                mechanizatory@mail.ru
            </a>
            <a href="https://mechanizatory.ru" itemProp="url">
                https://mechanizatory.ru
            </a>
            <span itemProp="telephone">+7 (921) 054-40-11</span>
        </div>
    )
}
