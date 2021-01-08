import Header from "../../components/header";
import Head from "next/head";

export default function Explore() {
  return (
    <>
      <Head>
        <title>Explore screen</title>
      </Head>
      <Header />
      <div style={{ paddingInline: "15vw" }}>
        <p>Explore screen</p>
      </div>
    </>
  );
}
