import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Layout>
      <Component key={router.asPath} {...pageProps} />
    </Layout>
  );
}

export default MyApp
