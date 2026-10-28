import BookButton from "../components/BookButton";
import Footer from "../components/Footer";
import MobileBar from "../components/MobileBar";
import Nav from "../components/Nav";
import Page from "../components/Page";
import Giropizza from "../sections/Giropizza";
import Hero from "../sections/Hero";
import Locale from "../sections/Locale";
import Marquee from "../sections/Marquee";
import Reviews from "../sections/Reviews";
import Signature from "../sections/Signature";
import Story from "../sections/Story";
import Visit from "../sections/Visit";

export default function Home() {
  return (
    <Page label="Bella Napoli">
      <Nav />
      <main>
        <Hero />
        <Story />
        <Signature />
        <Marquee />
        <Locale />
        <Giropizza />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <BookButton />
      <MobileBar />
    </Page>
  );
}
