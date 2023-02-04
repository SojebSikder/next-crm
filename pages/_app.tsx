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

// MyApp.getInitialProps = async (context: any) => {
//   const pageProps = await App.getInitialProps(context); // Retrieves page's `getInitialProps`
//   const host = context.ctx.req.cookies.token;
//   console.log("context", host);

//   return {
//     ...pageProps,
//   };
// };
