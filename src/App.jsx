import React, {
  Suspense,
  lazy,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import "./index.css";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import BottomAnimatedButton from "./components/BottomAnimatedButton";

const DiscoverMaster = lazy(() => import("./components/DiscoverMaster"));
const WhyUs = lazy(() => import("./components/WhyUs"));
const Testimonial = lazy(() => import("./components/Testimonial"));
const Partners = lazy(() => import("./components/Partners"));
const WhoChoose = lazy(() => import("./components/WhoChoose"));
const StudyPlan = lazy(() => import("./components/StudyPlan"));
const Certificate = lazy(() => import("./components/Certificate"));
const Footer = lazy(() => import("./components/Footer"));
const Copyright = lazy(() => import("./components/Copyright"));

function App() {
  const [loadFirstGroup, setLoadFirstGroup] = useState(false);
  const [loadSecondGroup, setLoadSecondGroup] = useState(false);
  const [loadFooter, setLoadFooter] = useState(false);
  const footerRef = useRef(null);

  // Lazy-load on scroll
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    if (scrollY > 800 && !loadFirstGroup) setLoadFirstGroup(true);
    if (scrollY > 1500 && !loadSecondGroup) setLoadSecondGroup(true);
    if (
      window.innerHeight + scrollY >= document.body.offsetHeight - 600 &&
      !loadFooter
    )
      setLoadFooter(true);
  }, [loadFirstGroup, loadSecondGroup, loadFooter]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (e, targetId) => {
    e?.preventDefault();
    console.log("Scroll requested to:", targetId);

    const scrollBlock =
      targetId === "information" && !loadFooter ? "end" : "start";
    const elementId =
      targetId === "information" && !loadFooter ? "copyright" : targetId;

    let loadTarget = false;

    if (
      ["discoverMaster", "whyus", "testimonial", "partners"].includes(
        targetId
      ) &&
      !loadFirstGroup
    ) {
      console.log("Loading first group");
      setLoadFirstGroup(true);
      loadTarget = true;
    } else if (
      ["whochoose", "study-plan", "certificate"].includes(targetId) &&
      !loadSecondGroup
    ) {
      console.log("Loading second group");
      setLoadFirstGroup(true);
      setLoadSecondGroup(true);
      loadTarget = true;
    } else if (targetId === "information" && !loadFooter) {
      console.log("Loading footer");
      setLoadFirstGroup(true);
      setLoadSecondGroup(true);
      setLoadFooter(true);
      loadTarget = true;
    }

    const performScroll = () => {
      const targetElement = document.getElementById(elementId);
      console.log(
        "Perform scroll → found element?",
        !!targetElement,
        "ID:",
        elementId
      );
      if (targetElement) {
        setTimeout(() => {
          const targetElement = document.getElementById(elementId);
          if (!targetElement) return;

          let offset;
          if (elementId === "copyright") {
            // Footer or information: center it
            const elementRect = targetElement.getBoundingClientRect();
            offset =
              window.scrollY +
              elementRect.top -
              window.innerHeight / 2 +
              elementRect.height / 2;
          } else {
            // All other sections: scroll to top
            offset = targetElement.offsetTop;
          }

          window.scrollTo({
            top: offset - (elementId === "copyright" ? 0 : 70),
            behavior: "smooth",
          });
        }, 1000);
      }
    };

    if (loadTarget) {
      console.log("Waiting for DOM changes...");
      const observer = new MutationObserver(() => {
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
          console.log("Element appeared → scroll now!");
          observer.disconnect();
          performScroll();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      performScroll();
    }
  };

  return (
    <main className="overflow-x-hidden w-full">
      <Header onNavigate={scrollToSection} />
      <Hero onNavigate={scrollToSection} />
      <BottomAnimatedButton onNavigate={scrollToSection} />
      <DiscoverMaster />

      {loadFirstGroup && (
        <Suspense fallback={<div style={{ minHeight: 600 }} />}>
          <WhyUs />
          <Testimonial />
          <Partners />
        </Suspense>
      )}

      {loadSecondGroup && (
        <Suspense fallback={<div style={{ minHeight: 1000 }} />}>
          <WhoChoose />
          <StudyPlan />
          <Certificate />
        </Suspense>
      )}

      {loadFooter && (
        <Suspense fallback={null}>
          <div id="information" ref={footerRef}>
            <Footer />
            <Copyright />
          </div>
        </Suspense>
      )}
    </main>
  );
}

export default App;
