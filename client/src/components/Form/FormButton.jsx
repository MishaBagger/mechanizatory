export default function FormButton ({ children}) {
    const handleSubmit = (event) => {
        event.preventDefault(); // предотвращает перезагрузку страницы
        // Логика обработки данных формы
        console.log('форма отправилась')
    };
    
    return (
        <button className="formButton" onClick={handleSubmit}>{children}</button>
    )
}