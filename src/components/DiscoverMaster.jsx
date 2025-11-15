import React, { useEffect } from "react";

const DiscoverMaster = () => {
  // Animate sections when they enter the viewport
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
      id="discoverMaster"
      aria-labelledby="discover-master-title"
      className="max-w-6xl mx-auto px-4 mb-20  py-16"
    >
      {/* Title */}
      <header className="text-center mb-12 fade-up opacity-0 translate-y-10 transition-all duration-700">
        <h2
          id="discover-master-title"
          className="text-4xl md:text-5xl lg:text-[4.375rem] leading-tight text-[#042453]"
        >
          Cos'è il <span className="text-primaryGreen font-semibold">Master</span>{" "}
          in <br />
          Tourism Management
        </h2>
      </header>

      {/* Main Content */}
      <article className="space-y-6 max-w-4xl mx-auto fade-up opacity-0 translate-y-10 transition-all duration-700 text-[#042453]">
        <p className="text-[18px] leading-relaxed">
          Questo Master è uno dei corsi di formazione turistica d’eccellenza
          nell’ambito del turismo per diventare professionisti nel settore
          turistico.
        </p>

        <p className="text-[18px] leading-relaxed">
          Potrai lavorare come{" "}
          <strong>
            Manager di Agenzie di Viaggio e Tour Operator, Esperto Marketing e
            Comunicazione per il turismo, Responsabile di Promozione Turistica,
            Direttore Tecnico di Agenzia di Viaggi, Accompagnatore Turistico.
          </strong>
        </p>

        <p className="text-[18px] leading-relaxed">
          Scegli tra le nostre sedi prestigiose a Milano, Roma e Napoli,
          immergendoti nell’atmosfera vibrante di queste città ricche di
          opportunità. Se preferisci la flessibilità, puoi seguire i corsi
          comodamente a distanza, senza rinunciare alla qualità e
          all’interazione con i docenti e gli altri partecipanti.
        </p>
      </article>

      {/* Subsection / Callout */}
      <aside className="text-center mt-16 fade-up opacity-0 translate-y-10 transition-all duration-700">
        <p className="text-2xl lg:text-4xl text-[#042453] font-normal">
          Master disponibili <span className="font-bold">online</span> o in{" "}
          <span className="font-bold">aula</span>
        </p>
        <p className="text-lg text-[#042453] mt-4">
           Puoi seguire i nostri corsi nelle sedi di Milano, Roma e Napoli, oppure comodamente online.
        </p>
      </aside>
    </section>
  );
};

export default DiscoverMaster;
