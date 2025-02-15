import AboutUs from "./AboutUs"
import Advantages from "./Advantages"
import News from "./News"
import Catalog from "./Catalog"
import Reviews from "./Reviews"
import Contacts from "./Contacts"
import Gallery from "./Gallery"
import Schema from "./Schema"

export default function Main () {
    return (
        <main className="main">
            <AboutUs/>
            <Advantages/>
            <News/>
            <Catalog/>
            <Gallery/>
            <Reviews/>
            <Contacts/>
            <Schema/>
        </main>
    )
}