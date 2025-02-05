import React from "react";
import Head from "next/head";

export default function Meta({ title = "Whatsapp crm" }) {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Whatsapp crm system" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
