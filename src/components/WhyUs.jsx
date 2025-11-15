import React, { useEffect } from "react";
import {
  InternShipIcon,
  ExperienceIcon,
  SatisfactionIcon,
  ExcillenceIcon,
  PaymentIcon,
  ScholarshipIcon,
} from "./ui/svg-icons.jsx";

const WhyUsFeatures = [
  {
    statText: "100%",
    labelText: "stage garantito",
    svg: InternShipIcon,
  },
  {
    statText: "30 anni",
    labelText: "di esperienza",
    svg: ExperienceIcon,
  },
  {
    statText: "oltre 10.000",
    labelText: "corsisti soddisfatti",
    svg: SatisfactionIcon,
  },
  {
    statText: "Possibilità",
    labelText: "di rateizzazione",
    svg: PaymentIcon,
  },
  {
    statText: "Network",
    labelText: "d'eccellenza",
    svg: ExcillenceIcon,
  },
  {
    statText: "Accesso",
    labelText: "a borse di studio",
    svg: ScholarshipIcon,
  },
];

const WhyUs = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="whyus"
      aria-labelledby="whyus-title"
      className="relative bg-white overflow-hidden choose-section"
    >
      {/* Top Decorative Shape */}
      <div
        className="elementor-shape absolute top-[-1px]"
        aria-hidden="true"
        data-negative="false"
      >
        <svg
          className="w-[300%] h-[140px] lg:h-[328px] relative left-1/2 -translate-x-1/2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            fill="#F4F6FC"
            d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7
            c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3
            c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
          ></path>
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto text-center relative z-10 pt-[7rem] pb-[14rem] mt-16 mb-4">
        <header className="fade-up opacity-0 translate-y-10 transition-all duration-700">
          <h2
            id="whyus-title"
            className="text-4xl sm:text-5xl lg:text-[4.375rem] mb-10 leading-[4.8125rem] text-[#042453]"
          >
            Perché <span className="text-primaryGreen font-medium">scegliere</span>{" "}
            noi
          </h2>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 px-4 sm:px-0 fade-up opacity-0 translate-y-10 transition-all duration-700">
          {WhyUsFeatures.map(({ statText, labelText, svg: Icon }, index) => (
            <article
              key={index}
              className="flex flex-col items-center justify-start text-center p-4 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-center w-full max-h-[220px]">
                <Icon className="w-[100px] sm:w-[120px] h-auto" />
              </div>
              <p className="text-lg md:text-3xl text-primaryGreen tracking-wider">
                {statText}
              </p>
              <p className="text-lg md:text-3xl font-bold text-[#042453] leading-snug tracking-wider">
                {labelText}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom Decorative Shape */}
      <div
        className="elementor-shape absolute bottom-[-1px] rotate-180"
        aria-hidden="true"
        data-negative="false"
      >
        <svg
          className="w-[300%] h-[140px] lg:h-[328px] relative left-1/2 -translate-x-1/2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            fill="#F4F6FC"
            d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7
            c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3
            c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default WhyUs;
