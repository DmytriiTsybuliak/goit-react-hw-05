import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ data, onClick }) {
  const handleClick = evt => {
    onClick(evt.target.id);
  };
  return (
    <ul className={css.gallery}>
      {data.map(item => (
        <li className={css.item} key={item.id} onClick={handleClick}>
          <ImageCard
            src={item.urls.small}
            alt={item.alt_description}
            id={item.id}
            regular={item.urls.regular}
          />
        </li>
      ))}
    </ul>
  );
}
