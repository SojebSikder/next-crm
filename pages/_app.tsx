import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { useEffect } from "react";
import App from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { NextPage, NextPageContext } from "next";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("tw-elements");
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// MyApp.getInitialProps = async (context: any) => {
//   const pageProps = await App.getInitialProps(context); // Retrieves page's `getInitialProps`
//   const host = context.ctx.req.cookies.token;
//   // console.log("context", host);

//   return {
//     ...pageProps,
//     initialState: { demo: "sojebdemo" },
//   };
// };

MyApp.getInitialProps = async ({
  Component,
  ctx,
}: {
  Component: NextPage;
  ctx: NextPageContext;
}) => {
  // const cookie = ctx.req?.headers.cookie;
  // const {} = ctx.query;

  const demo = "sojebdemo";
  const pageProps = {
    demo,
  };

  if (Component.getInitialProps) {
    Object.assign(pageProps, await Component.getInitialProps(ctx));
  }

  const appProps = { pageProps };

  return {
    ...appProps,
    initialState: {
      demo,
      currentUrl: ctx.asPath,
    },
  };
};
