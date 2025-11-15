import React from "react";

import Eden from "../assets/images/companies/Eden-Viaggi-1.webp";
import Gattitoni from "../assets/images/companies/Gattitoni-viaggi.webp";
import Jumbo from "../assets/images/companies/Jumbo-viaggi-1.webp";
import King from "../assets/images/companies/King-holidays-tour-operator.webp";
import Alpitour from "../assets/images/companies/Alpitour-1.webp";
import Malatesta from "../assets/images/companies/Malatesta-Viaggi.webp";
import Simply from "../assets/images/companies/Simply-Education-Travel.webp";
import Uvet from "../assets/images/companies/Uvet-Global-Business-Travel-1.webp";
import MappaMondo from "../assets/images/companies/MappaMondo.webp";
import ClubMed from "../assets/images/companies/Club-Med.webp";
import Settemari from "../assets/images/companies/Settemari-logo.webp";

const PartnersImageSrc = [
  { src: Eden, alt: "Eden Viaggi Logo" },
  { src: Gattitoni, alt: "Gattitoni Viaggi Logo" },
  { src: Jumbo, alt: "Jumbo Viaggi Logo" },
  { src: King, alt: "King Holidays Tour Logo" },
  { src: Alpitour, alt: "Alpitour Logo" },
  { src: Malatesta, alt: "Malatesta Viaggi Logo" },
  { src: Simply, alt: "Simply Education Travel Logo" },
  { src: Uvet, alt: "Uvet Global Business Travel Logo" },
  { src: MappaMondo, alt: "MappaMondo Logo" },
  { src: ClubMed, alt: "Club Med Logo" },
  { src: Settemari, alt: "Settemari Logo" },
];

const Partners = () => {
  return (
    <section
      id="partners"
      className="partners-section py-16 sm:py-20 lg:py-20 bg-white"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2
          id="partners-heading"
          className="text-4xl md:text-[3.85rem] lg:text-[4.375rem] mb-12 leading-[2.568rem] sm:leading-[4.8125rem] section-title text-[#042453] text-caros"
        >
          I <span className="text-primaryGreen font-medium">Partner</span> del Master in
          <br />
          Hospitality Management
        </h2>

        <ul
          className="max-w-[1140px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-y-6 gap-x-4 items-center justify-items-center mx-auto"
          role="list"
        >
          {PartnersImageSrc.map((partner, index) => (
            <li key={index} className="flex items-center justify-center">
              <picture>
                {/* Using <source> for browsers that support modern formats */}
                <source srcSet={partner.src} type="image/webp" />
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="object-contain w-[80%] h-auto p-[15px] sm:p-[20px] transition-transform duration-300 hover:scale-105"
                  width="250"
                  height="120"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </picture>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Partners;
