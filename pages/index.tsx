import Footer from "../components/footer/Footer";
import Header from "../components/header/home/Header";

import Meta from "../components/header/Meta";

export default function Home() {
  return (
    <div>
      <Meta />
      <Header />

      <main className="flex justify-center h-screen">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>

      <Footer />
    </div>
  );
}
