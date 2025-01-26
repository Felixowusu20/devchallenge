import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button ,Nav } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import sidebysideimg from "../../assets/imgs/ img2.png";
import {Link} from "react-router-dom"
import "./Hero.css";

const Hero = () => {
  const [navColor, setNavColor] = useState(false);

  useEffect(() => {
    // Initialize AOS for animations
    AOS.init({ duration: 1000 });

    // Add event listener for scroll effect on navbar
   
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Hero Text Content */}
        <div className="hero-content" data-aos="fade-up">
          <h1 className="hero-title">
            Welcome to ChapTer2 <br /> Your Daily Transcriber
          </h1>
          <p className="hero-description">
            Unlock the full potential of your audio data with{" "}
            <strong>ChapTer2 AI</strong>! Transcription, Translation, and Audio
            Intelligence add-ons powered by <strong>Assembly API</strong>.
          </p>

          <Nav.Link as={Link} to="Chat" className="text-dark fw-semibold mx-2">
            <Button variant="primary" size="lg" active>
              Try it for Free
            </Button>
          </Nav.Link>
        </div>

        {/* Side-by-Side Animated Image */}
        <div className="hero-image-container" data-aos="fade-left">
          <Image
            src={sidebysideimg}
            className="sidebyside-image"
            alt="Illustration showcasing Chapter2 features"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
