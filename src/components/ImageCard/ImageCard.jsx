import css from './ImageCard.module.css';

export default function ImageCard({ src, alt, id }) {
  return (
    <>
      <img className={css.card} src={src} alt={alt} id={id} />
    </>
  );
}
