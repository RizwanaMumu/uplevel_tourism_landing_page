import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";

// Import images
import TestiMonialImage1 from "../assets/images/testimonial/Alberto-DAlleva.webp";
import TestiMonialImage2 from "../assets/images/testimonial/Angela-Iavarone.webp";
import TestiMonialImage3 from "../assets/images/testimonial/Valeria-Baratta.webp";
import TestiMonialImage4 from "../assets/images/testimonial/Valentina-Soggiu.webp";
import TestiMonialImage5 from "../assets/images/testimonial/Angela-Goletti.webp";
import TestiMonialImage6 from "../assets/images/testimonial/Anna-Ivanchikhina.webp";

const TESTIMONIAL_IMAGE_SIZE = 64;

const testimonials = [
  {
    imageSrc: TestiMonialImage1,
    name: "Alberto D’Alleva",
    location: "Roma",
    rating: 5,
    testimonial:
      "Salve, mi chiamo Alberto e ho terminato nel 2018 il Master in Tourism Management presso la sede di Roma. Il corso mi ha dato le conoscenze teoriche necessarie per affrontare correttamente lo stage al termine del Master. I professori sono competenti e preparati..."
  },
  {
    imageSrc: TestiMonialImage2,
    name: "Angela Iavarone",
    location: "Napoli",
    rating: 5,
    testimonial:
      "Salve a tutti, mi chiamo Angela e sto frequentando il master in tourist management presso la sede Up level di Napoli. Posso considerarmi pienamente soddisfatta della scelta in quanto il corso è davvero molto interessante. La presenza di docenti molto competenti e professionali..."
  },
  {
    imageSrc: TestiMonialImage3,
    name: "Valeria Baratta",
    location: "Roma",
    rating: 5,
    testimonial:
      "Eccomi qui, per lasciare un feedback della vostra scuola. Che dire, ho frequentato il Master a inizio del 2005, e dopo tutti questi anni, ho ancora un piacevole ricordo di lei, Dott.ssa Calabrese,e della Dott.ssa Napolitano (alla quale faccio tantissimi auguri) e dei professori…"
  },
  {
    imageSrc: TestiMonialImage4,
    name: "Valentina Soggiu",
    location: "Milano",
    rating: 5,
    testimonial:
      "Buongiorno a tutti, sono Soggiu Valentina e ho frequentato il master di Milano in tourist management. Ieri si è concluso questo percorso e devo dire che è stata davvero una bellissima esperienza, a partire dai docenti tutti ottimi insegnanti che ci hanno trasmesso con tanta passione..."
  },
  {
    imageSrc: TestiMonialImage5,
    name: "Angela Goletti",
    location: "Roma",
    rating: 5,
    testimonial:
      "Salve, ho appena concluso il Master in Tourism Management all’ Up level di Roma, mi ha colpito molto la professionalità dei professori e l’estrema gentilezza dello staff. Ho fatto un’esperienza molto positiva e costruttiva sia a livello umano che professionale e sono sicura..."
  },
  {
    imageSrc: TestiMonialImage6,
    name: "Anna Ivanchikhina",
    location: "Milano",
    rating: 5,
    testimonial:
      "Ciao. Quando sono arrivata in Italia non sapevo nulla di mondo turismo italiano e anche europeo. Ho avuto esperienza in turismo ma in Russia, perciò quando ho deciso continuare mia vita in Italia e lavorare con turismo italiano ho capito che per me e difficilissimo. Ma Up Level..."
  },
];

const Testimonial = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [swiperKey, setSwiperKey] = useState(0);

useEffect(() => {
  if (isVisible) {
    setSwiperKey((prev) => prev + 1); // force Swiper re-render
  }
}, [isVisible]);

  // ✅ Use IntersectionObserver instead of scroll events
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonial"
      className="py-16 sm:py-20 lg:py-24 bg-custom-light-bg"
      aria-labelledby="testimonial-heading"
      
    >
      <div className="max-w-[1500px] mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2
          id="testimonial-heading"
          className="text-4xl md:text-5xl lg:text-[4.375rem] mb-12 leading-[2.568rem] sm:leading-[4.8125rem] text-[#042453] section-title"
        >
          Fidati di chi l'ha fatto
        </h2>
        
          <Swiper
            key={swiperKey}
            slidesPerView={1}
            spaceBetween={16}
            loop
            pagination={{ clickable: true }}
            direction="horizontal"
            modules={[Pagination, A11y]}
            aria-label="Testimonianze degli studenti"
            breakpoints={{
              760: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 2 },
              1024: { slidesPerView: 3, spaceBetween: 32, slidesPerGroup: 3 },
            }}
            className={`testimonial-swiper transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <article
                  className="testimonial-swiper-card bg-white p-6 mb-16 rounded-[24px] shadow-lg flex flex-col text-left"
                  aria-label={`Testimonianza di ${item.name} da ${item.location}`}
                >
                  <header className="flex items-start space-x-3 mb-4">
                    <img
                      src={item.imageSrc}
                      alt={`Foto di ${item.name}`}
                      width={TESTIMONIAL_IMAGE_SIZE}
                      height={TESTIMONIAL_IMAGE_SIZE}
                      className="w-16 h-16 object-cover rounded-full"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-[#042453] mb-1">
                        {item.name}
                      </h3>
                      <p className="text-md text-[#042453] mb-1">
                        <span className="font-medium">Sede:</span>{" "}
                        {item.location}
                      </p>
                      <div
                        className="flex items-center text-[#f0ad4e]"
                        aria-label={`${item.rating} stelle`}
                      >
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <i key={i} className="fa-solid fa-star text-lg"></i>
                        ))}
                      </div>
                    </div>
                  </header>

                  <hr className="border-gray-200 mb-4" />

                  <p className="text-[18px] text-[#042453] leading-[29px] text-roboto">
                    {item.testimonial}
                  </p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
