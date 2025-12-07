import React from "react";
import Graduates from "../assets/images/riv_01_g.webp";
import Professions from "../assets/images/riv_02.webp";
import Entrepreneurs from "../assets/images/riv_03_g.webp";
import Operators from "../assets/images/riv_04.webp";

const WhoChooseFeatures = [
  {
    imgSrc: Graduates,
    altText: "Laureati & Diplomati",
    labelText: "Laureati & Diplomati",
  },
  {
    imgSrc: Professions,
    altText: "Professionisti",
    labelText: "Professionisti",
  },
  {
    imgSrc: Entrepreneurs,
    altText: "Imprenditori",
    labelText: "Imprenditori",
  },
  {
    imgSrc: Operators,
    altText: "Operatori del settore",
    labelText: "Operatori del settore",
  },
];

const WhoChoose = () => {
  return (
    <section
      id="WhoChoose"
      className="py-16 sm:py-20 lg:py-24 bg-custom-light-bg"
      aria-labelledby="whochoose-heading"
    >
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          id="whochoose-heading"
          className="text-4xl md:text-[3.85rem] lg:text-[4.375rem] mb-12 leading-[2.568rem] sm:leading-[4.8125rem] section-title text-caros text-[#042453]"
        >
          Chi <span className="text-primaryGreen font-medium">sceglie</span> il Master in
          <br />
          Tourism Management
        </h2>

        {/* Feature Grid */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10" role="list">
          {WhoChooseFeatures.map((feature, index) => (
            <li key={index} className="flex flex-col items-center">
              <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] relative mb-3">
                <img
                  src={feature.imgSrc}
                  alt={feature.altText}
                  className="w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={150}
                  height={150}
                  fetchPriority="low"
                />
              </div>
              <p className="text-xl sm:text-2xl font-medium leading-snug text-caros text-[#042453] text-center">
                {feature.labelText}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhoChoose;
