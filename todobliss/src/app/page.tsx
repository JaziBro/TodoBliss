import Image from "next/image";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import { Features } from "./Components/Features";
import { CTA } from "./Components/Cta";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Features/>
      <CTA/>
      <Footer/>
    </div>
  );
}

