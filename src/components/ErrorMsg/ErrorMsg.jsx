import css from './ErrorMsg.module.css';

export default function ErrorMsg() {
  return (
    <p className={css.text}>
      Sorry, something went wrong, please try again later, or contact the
      service!
    </p>
  );
}
