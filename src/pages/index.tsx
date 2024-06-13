import { useTokenStore } from '@/providers/tokenProvider';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const _hasHydrated = useTokenStore((store) => store._hasHydrated);
  const access = useTokenStore((store) => store.access);
  const setAccess = useTokenStore((store) => store.setAccess);

  console.log({ _hasHydrated });

  if (!_hasHydrated) {
    return <p>...loading</p>;
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      accessInput: { value: string };
    };

    setAccess(formElements.accessInput.value);
  };

  return (
    <div className={`${styles.container}`}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="accessInput">
          <h2>access</h2>
        </label>
        <p>value: {access}</p>
        <br />
        <input type="text" id="accessInput" />
        <button type="submit">update access</button>
      </form>
    </div>
  );
}
