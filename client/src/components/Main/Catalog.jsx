import FormOrder from '../Form/FormOrder'
import { useState } from 'react'

export default function Catalog() {
    const [formSend, setFormSend] = useState(false)

    function formSended() {
        setFormSend(true)

        setTimeout(() => {
            setFormSend(false)
        }, 5000)
    }

    return (
        <>
            <section className="catalog" id="catalog">
                <h2 className="title">Каталог</h2>
                <div className="catalog__container catalog__container-blue">
                    <img src="/src/assets/img/Catalog1.png" alt="catalog1" />
                    <img src="/src/assets/img/Catalog2.png" alt="catalog2" />
                    <img src="/src/assets/img/Catalog3.png" alt="catalog3" />
                </div>
                <div className="catalog__container catalog__container-red">
                    <img src="/src/assets/img/Catalog4.png" alt="catalog4" />
                    <img src="/src/assets/img/Catalog5.png" alt="catalog5" />
                    <img src="/src/assets/img/Catalog6.png" alt="catalog6" />
                    <img src="/src/assets/img/Catalog7.png" alt="catalog7" />
                </div>

                <div className="catalog__container catalog__container-category">
                    <div className="category">
                        <div className="category__container category__container-horizontal">
                            <div className="category__image">
                                <img
                                    src="/src/assets/img/description_category1.png"
                                    alt="category1"
                                />
                            </div>

                            <div className="category__description">
                                <h3 className="subtitle">Категория "AI"</h3>
                                <p className="text">
                                    Внедорожные мототранспортные средства -{' '}
                                    <span className="span-bold">
                                        квадроциклы, снегоходы.
                                    </span>{' '}
                                    Общим признаком такой техники является
                                    мотоциклетная посадка и наличие
                                    мотоциклетного руля. Удостоверение можно
                                    получить с 16 лет.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="category category-vertical">
                        <div className="category__container category__container-vertical">
                            <div className="category__description">
                                <h3 className="subtitle">Категория "AII"</h3>
                                <p className="text">
                                    Внедорожные автотранспортные средства
                                    (признаком такой техники является
                                    автомобильная посадка и автомобильный руль),
                                    разрешенная максимальная масса которых не
                                    превышает 3500 кг и число сидячих мест
                                    которых, помимо сиденья водителя, не
                                    превышает 8:{' '}
                                    <span className="span-bold">
                                        багги, болотоходы, каракаты, вездеходы
                                        СF МОТО Z6, Трэкол.
                                    </span>
                                </p>
                                <p className="text">
                                    К экзамену допускаются только лица, имеющие
                                    водительские права категории В. Получить её
                                    можно с 19 лет, при условии, что у вас есть
                                    как минимум год опыта вождения категории
                                    «В». Удостоверение можно получить с 19 лет.
                                </p>
                            </div>
                            <div className="category__image category__image-vertical">
                                <img
                                    src="/src/assets/img/description_category2.png"
                                    alt="category2"
                                />
                            </div>
                        </div>

                        <div className="category__container category__container-vertical">
                            <div className="category__description">
                                <h3 className="subtitle">Категория "AIII"</h3>
                                <p className="text">
                                    Внедорожные автотранспортные средства,
                                    разрешенная максимальная масса которых
                                    превышает 3500 кг и число сидячих мест
                                    которых, помимо сиденья водителя, не
                                    превышает 8:{' '}
                                    <span className="span-bold">
                                        БелАЗ, Урал Полярник, Харп, Кержач.
                                    </span>
                                </p>
                                <p className="text">
                                    {' '}
                                    Для получения удостоверения требуется
                                    наличие водительских прав категории «С» и
                                    стаж вождения не менее 1 года, что позволит
                                    управлять специализированными грузовыми
                                    машинами , карьерными самосвалами и
                                    вездеходами, болотоходами. Удостоверение
                                    можно получить с 19 лет.
                                </p>
                            </div>
                            <div className="category__image category__image-vertical">
                                <img
                                    src="/src/assets/img/description_category3.png"
                                    alt="category3"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="category">
                        <div className="category__container category__container-horizontal">
                            <div className="category__description ">
                                <h3 className="subtitle">Категория "B"</h3>
                                <p className="text">
                                    Управление самоходными машинами на
                                    гусеничном и колёсном ходу с мощностью
                                    двигателя до 25,7 кВт (36 л.с.): включая
                                    <span className="span-bold">
                                        {' '}
                                        тракторы, погрузчики и мини-экскаваторы.
                                    </span>{' '}
                                    Удостоверение можно получить с 17 лет.
                                </p>
                            </div>

                            <div className="category__image category__image-right">
                                <img
                                    src="/src/assets/img/description_category4.png"
                                    alt="category4"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="category">
                        <div className="category__container category__container-horizontal">
                            <div className="category__image">
                                <img
                                    src="/src/assets/img/description_category5.png"
                                    alt="category5"
                                />
                            </div>

                            <div className="category__description">
                                <h3 className="subtitle">Категория "C"</h3>
                                <p className="text">
                                    Колесные машины с двигателем мощностью от
                                    25,7 кВт (36 л.с) до 110,3 кВт (150 л.с.) –{' '}
                                    <span className="span-bold">
                                        МТЗ-82, ЮМЗ, ЛТЗ.
                                    </span>{' '}
                                    Самая популярная тракторная категория. К ней
                                    относятся большинство вилочных дизельных
                                    погрузчиков, фронтальные ковшовые
                                    погрузчики, колёсные грейдеры и экскаваторы.
                                    Удостоверение можно получить с 17 лет.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="category category-vertical">
                        <div className="category__container category__container-vertical">
                            <div className="category__description">
                                <h3 className="subtitle">Категория "D"</h3>
                                <p className="text">
                                    Колесные машины с двигателем мощностью свыше
                                    110,3 кВт (150 л.с.) -{' '}
                                    <span className="span-bold">
                                        Т-150К, К-701.
                                    </span>{' '}
                                    Эта категория позволяет управлять мощной
                                    колёсной техникой – экскаваторами и
                                    тракторами. К ней относятся: большие
                                    фронтальные ковшовые погрузчики, колёсные
                                    грейдеры и экскаваторы. Удостоверение можно
                                    получить с 18 лет.
                                </p>
                            </div>
                            <div className="category__image category__image-vertical">
                                <img
                                    src="/src/assets/img/description_category6.png"
                                    alt="category6"
                                />
                            </div>
                        </div>

                        <div className="category__container category__container-vertical">
                            <div className="category__description">
                                <h3 className="subtitle">Категория "E"</h3>
                                <p className="text">
                                    Гусеничные машины с двигателем мощностью
                                    свыше 25,7 кВт (36 л.с.) -{' '}
                                    <span className="span-bold">
                                        ДТ-75, Т-170, Т-10, Т-11.
                                    </span>{' '}
                                    Удостоверение можно получить с 17 лет.
                                </p>
                            </div>
                            <div className="category__image category__image-vertical">
                                <img
                                    src="/src/assets/img/description_category7.png"
                                    alt="category7"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="category">
                        <div className="category__container category__container-horizontal">
                            <div className="category__description ">
                                <h3 className="subtitle">Категория "F"</h3>
                                <p className="text">
                                    Тракторист-машинист. К ней относятся:
                                    <span className="span-bold">
                                        {' '}
                                        самоходные косилки и комбайны.
                                    </span>{' '}
                                    Удостоверение можно получить с 17 лет.
                                </p>
                            </div>

                            <div className="category__image category__image-right">
                                <img
                                    src="/src/assets/img/description_category8.png"
                                    alt="category8"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="attention">
                    <p className="text text-attention">
                        Курсанты сдают экзамен инспектору ГосТехНадзора и
                        получают удостоверение тракториста-машиниста.
                    </p>
                </div>

                {formSend && (
                    <div className="popup">
                        <h2 className="title title-popup">
                            Заявка успешно отправлена!
                        </h2>
                        <p className="text text-popup">
                            Спасибо за уделённое время, мы обязательно свяжемся
                            с Вами в ближайшее время!
                        </p>{' '}
                        <div className="popup__container">
                            {' '}
                            <hr className="line" />
                        </div>
                    </div>
                )}

                <FormOrder formSended={formSended} />
            </section>
        </>
    )
}
