import React from "react";
import certificateImage from "../assets/images/degree_Tourism.webp";

const Certificate = () => {
  return (
    <section
      className="py-16 sm:py-20 lg:py-24 certification-sec bg-custom-light-bg"
      aria-labelledby="certificate-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            id="certificate-heading"
            className="text-4xl text-[#042453] md:text-[3.85rem] lg:text-[4.375rem] leading-[2.568rem] sm:leading-[4.8125rem] section-title text-caros"
          >
            L'attestato
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Certificate Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={certificateImage}
              alt="Certificate of Hospitality"
              className="w-[70%] max-w-md object-contain rounded-lg shadow-lg"
              loading="lazy"
              decoding="async"
              width={500}
              height={350}
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-7 text-[#042453] text-lg">
            <p>
              <span className="font-bold">
                Il nostro attestato è la chiave per il successo.
              </span>
            </p>
            <p className="leading-[2.2rem]">
             Al termine del Master, la nostra scuola rilascia ad ogni partecipante un attestato di specializzazione che è un vero e proprio diploma di master che certifica la formazione conseguita.
            </p>
            <p className="leading-[2.2rem]">
              Essere allievi Up level, infatti, significa proporsi al mondo del lavoro con credenziali importanti, certificate da un marchio leader nella formazione di alto livello.
            </p>
            <p className="leading-[2.2rem]">
              Un importante biglietto da visita per il mondo del lavoro, perché oggi un master post diploma o post laurea costituisce un livello di specializzazione sempre più stimato e talvolta anche esplicitamente richiesto dalle aziende.
              </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
