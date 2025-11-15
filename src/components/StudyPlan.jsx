import React from "react";
import { useState } from "react";

const modulesData = [
  {
    id: 1,
    title: "Tecnica turistica",
    items: [
      "Cenni storici ed evoluzione del turismo",
      "Terminologia turistica",
      "Concetto di Marketing turistico e strategie di mercato",
      "Le professioni turistiche",
      "Mercato dei viaggi e target di riferimento",
      "Definizione del prodotto turistico e dei consumatori turistici",
      "Promozione e vendita viaggi",
      "Gestione ed organizzazione Agenzia di Viaggi",
      "Programmazione viaggi, costi e ricavi, determinazione prezzi, mezzi di pagamento, norme valutarie, documenti di lavoro",
      "Strutture ricettive, esercizi alberghieri ed extra alberghieri",
      "Trasporti ferroviari, marittimi, aerei, su gomma",
      "Rapporti tra vettori e Agenzia di Viaggi",
    ],
  },
  {
    id: 2,
    title: "Itinerari turistici",
    items: [
      "Itinerari Turistici Italiani",
      "Itinerari Turistici Europei",
      "Itinerari Turistici dei Paesi Extraeuropei",
      "Progettazione di un itinerario turistico",
    ],
  },
  {
    id: 3,
    title: "Legislazione turistica",
    items: [
      "Diritto costituzionale e commerciale",
      "Codice del turismo D. Lgs. 79/2011",
      "Contratti di organizzazione ed intermediazione turistica",
      "Convenzioni internazionali",
      "Legislazione turistica regionale",
    ],
  },
  {
    id: 4,
    title: "Contabilità e amministrazione",
    items: [
      "Contabilità generale",
      "Contabilità Biglietterie, Turismo Terzi",
      "Registri e libri contabili",
      "Contabilità IVA, Art. 74 ter, singoli servizi e intermediazione",
      "Registrazioni, costi e ricavi di un’agenzia di viaggi e turismo",
      "Bilancio d’esercizio, competenza",
      "Fatturazione Elettronica",
    ],
  },
  {
    id: 5,
    title: "Social Media e Strategia Digitale nel Marketing Turistico",
    items: [
      "Principi e tecniche di Digital Marketing nel settore turistico",
      "L’Impatto dell’Innovazione Digitale nel marketing e nella comunicazione turistica",
      "La Gestione della Reputazione attraverso i Social Media per agenzie di Viaggio e Tour Operator",
      "Disegnare una strategia omnicanale: la gestione integrata dei media digitali nell’ecosistema globale aziendale",
      "Workshop operativi: costruzione del Project Work Finale",
    ],
  },
  {
    id: 6,
    title: "Definire una Strategia di Social Media Marketing nel turismo",
    items: [
      "I Social media nel mondo",
      "La scelta dei social media e la loro integrazione in una strategia di marketing turistico",
      "Definire un piano di comunicazione e di marketing: focus su Facebook, Instagram, Pinterest e altri canali",
      "Definizione di Target Persona, Tone of Voice",
      "Elementi di Visual Storytelling per il Turismo",
      "Workshop operativi",
      "Project Work finale",
    ],
  },
  
];


const AccordionItem = ({ module, isOpen, toggleAccordion }) => {
  return (
    <article
      className="rounded-[30px] overflow-hidden border border-gray-200"
      aria-labelledby={`accordion-title-${module.id}`}
    >
      <button
        id={`accordion-title-${module.id}`}
        className="w-full text-left px-4 sm:px-6 py-[15px] bg-white text-gray-700 flex justify-between items-center font-bold text-md sm:text-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#15AF17]"
        onClick={() => toggleAccordion(module.id)}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${module.id}`}
      >
        {module.title}
        <span
          className={`text-[#15AF17] font-medium text-3xl transform transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        id={`accordion-content-${module.id}`}
        className={`transition-all duration-500 ease-in-out overflow-hidden bg-white ${
          isOpen ? "max-h-[1500px] py-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="list-disc list-inside px-6 text-base space-y-2 text-gray-700">
          {module.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

// Main StudyPlan component
const StudyPlan = () => {
  const [openModuleId, setOpenModuleId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenModuleId(openModuleId === id ? null : id);
  };

  return (
    <section
      id="study-plan"
      className="py-16 sm:py-20 lg:py-24 min-h-screen bg-custom-light-bg"
      aria-labelledby="study-plan-heading"
    >
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-custom-dark-blue">
        <h2
          id="study-plan-heading"
          className="text-4xl text-[#042453] md:text-[3.85rem] lg:text-[4.375rem] text-center mb-8 leading-[2.568rem] sm:leading-[4.8125rem] section-title text-caros"
        >
          Piano di <span className="text-[#15AF17] font-medium">Studi</span>
        </h2>
        <p className="text-center text-[#042453] mb-8">
          Il programma di studi del master per i nuovi manager dell’hospitality prevede lo studio delle seguenti materie:
        </p>

        <div className="space-y-5">
          {modulesData.map((module) => (
            <AccordionItem
              key={module.id}
              module={module}
              isOpen={openModuleId === module.id}
              toggleAccordion={toggleAccordion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyPlan;