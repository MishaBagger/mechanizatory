import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss';
   
export default function Gallery() {
    const images = [];

for (let i = 1; i <= 10; i++) {
    images.push({
        original: `/src/assets/img/gallery${i}.PNG`,
        thumbnail: `/src/assets/img/gallery${i}.PNG`
    });
}
    return (
        <>
        <section className="gallery">
            <h2 className="title">Галерея</h2>
            <ImageGallery
                items={images}
                autoPlay={true}
                slideOnThumbnailOver={true}
                showIndex={true}
                slideInterval={5000}
            />
        </section>
            
        </>
    )
}
