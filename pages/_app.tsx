import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component key={router.asPath} {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp
