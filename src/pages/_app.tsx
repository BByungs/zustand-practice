import { TokenStoreProvider } from '@/providers/tokenProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TokenStoreProvider>
      <Component {...pageProps} />
    </TokenStoreProvider>
  );
}
