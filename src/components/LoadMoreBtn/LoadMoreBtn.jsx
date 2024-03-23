import css from './LoadMoreBtn.module.css';
export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={css.load}>
      <button type="submit" className={css.submitBtn} onClick={onClick}>
        Load More
      </button>
    </div>
  );
}
