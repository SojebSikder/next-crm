import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { useEffect } from "react";
import App from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("tw-elements");
  }, []);

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context); // Retrieves page's `getInitialProps`

  const cookies = context.req.headers.cookie;
  console.log("cookies", context);

  return {
    ...pageProps,
  };
};
