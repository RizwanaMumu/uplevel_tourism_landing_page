import React, { useState, useEffect } from "react";

import heroImage from "../assets/images/hero_tourism.webp";

const headingClass = "heading-title";
const paragraphClass =
  "heading-sub-text mb-8 mt-6";
const ctaClass =
  "bg-white text-[#042453] w-[200px] transform transition-transform duration-200 hover:animate-pulse-scale font-medium text-lg flex items-center justify-between  py-2 px-6 rounded-full";

const Hero = ({  onNavigate }) => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
    img.fetchPriority = "high";
    img
      .decode()
      .then(() => {
        setShowImage(true);
      })
      .catch(() => {
        // fallback if decode fails
        setShowImage(true);
      });
  }, []);

  return (
    <header className="hero-container relative pt-[80px] overflow-hidden">
      <div className="hero-container-overlay absolute inset-0 bg-gradient-to-b from-white to-[#f4f6fc]"></div>

      <div className="relative max-w-[1440px] min-h-[550px] md:min-h-[750px] mx-auto flex items-center justify-between gap-10 px-4 md:px-8 pb-12 md:pb-20">
        
        <div className="text-left flex-1 md:pl-5 z-10">
          <p className="heading-top-title tracking-wide">
            MASTER IN
          </p>

          <h1 className={headingClass}>
            Tourism <br/>
            Management
          </h1>

          <p className={paragraphClass}>
            Il master che forma da 30 anni i professionisti del settore turistico
Puoi seguire i nostri corsi nelle sedi di <strong>Milano, Roma e Napoli,</strong> oppure comodamente <strong>a distanza.</strong>
          </p>

          <button key='discoverMasterHero' onClick={(e) => onNavigate(e, 'discoverMaster')} className={ctaClass}>
            Scopri di più
            <span className="flex items-center justify-center w-5 h-5 bg-[#042453] rounded-full ml-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 24" strokeWidth="2.5" stroke="White" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" fill="White" d="M9,13 0, 13 0,11 8,11 8,6 15,12 8,18 8,13"></path>
              </svg>
            </span>
          </button>
        </div>

        <div
          className={`hidden md:flex flex-1 transition-opacity duration-700 ease-out ${
            showImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "16px",
            willChange: "opacity",
            aspectRatio: "16 / 12",
          }}
          role="img"
          aria-label="Tourism Management illustration"
        ></div>
      </div>
    </header>
  );
};

export default Hero;
