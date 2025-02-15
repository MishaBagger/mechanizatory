import { SRC_URL } from '../../http'

export default function Vacancy({ vacancies }) {
    return (
        <div className="vacancy__wrapper">
            {vacancies &&
                vacancies.map((data, index) => (
                    <a
                        href={data.link}
                        className="links vacancy__container"
                        key={index}
                        target='_blank'
                    >
                        <div className="vacancy__inner">
                            <img
                                className="vacancy__image"
                                src={`${SRC_URL}/images/${data.image}`}
                                alt={data.title}
                            />
                            <p className="text vacancy__text">{data.title}</p>
                        </div>
                    </a>
                ))}
        </div>
    )
}
