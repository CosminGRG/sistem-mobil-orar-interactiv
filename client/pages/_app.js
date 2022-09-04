import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { Provider as UserProvider } from "./../store/Context";

import Layout from "../components/Layout";
import RouteGuard from "../utils/RouteGuard";

function MyApp({ Component, pageProps, ...appProps }) {
  if ([`/login`].includes(appProps.router.pathname))
    return (
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    );

  return (
    <UserProvider>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </UserProvider>
  );
}

export default MyApp;
