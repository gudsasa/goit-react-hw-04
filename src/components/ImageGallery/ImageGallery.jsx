import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";


export default function ImageGallery({ data, openModal }) {
  return (
    <ul className={css.gallery}>
      {data.map((image) => {
        return (
          <li className={css.item} key={image.id}>
            <ImageCard openModal={openModal} images={image} />
          </li>
        );
      })}
    </ul>
  );
}
