import '@/styles/bootstrap.min.css';
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import { getToken } from '@/lib/authenticate';
import RouteGuard from '@/components/RouteGuard';

export default function App({ Component, pageProps }) {
  const fetcher = async (url) => {
    const response = await fetch(url, {
      headers: { Authorization: `JWT ${getToken()}` }
    });
    return response.json();
  };
  return (
    <>
      <RouteGuard>
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </RouteGuard>
    </>
  );
}

