import { useState, useEffect, useRef, useCallback } from "react";
import logo from "../assets/images/uplevel.webp";

// ✅ Optimized scroll detection (with throttling)
const useScrollDirection = (threshold = 100) => {
  const [scrollDir, setScrollDir] = useState("up");
  const lastScrollTopRef = useRef(0);
  const tickingRef = useRef(false); // Prevents frequent reflows

  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    if (!tickingRef.current) {
      window.requestAnimationFrame(() => {
        const lastScrollTop = lastScrollTopRef.current;
        if (Math.abs(currentScroll - lastScrollTop) > 5) {
          if (currentScroll > lastScrollTop && currentScroll > threshold) {
            setScrollDir("down");
          } else if (currentScroll < lastScrollTop) {
            setScrollDir("up");
          }
          lastScrollTopRef.current = Math.max(currentScroll, 0);
        }
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scrollDir;
};

const Header = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollDir = useScrollDirection(100);
  const isHidden = scrollDir === "down";

  const navItems = [
    { id: "discoverMaster", label: "Scopri il Master" },
    { id: "study-plan", label: "Il piano studi" },
    { id: "whyus", label: "Perché Up Level" },
    { id: "testimonial", label: "Le testimonianze" },
    { id: "information", label: "Informazioni" },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`top-nav fixed top-0 left-0 w-full z-40 flex items-center justify-center bg-white shadow-sm will-change-transform transition-transform duration-300 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="nav-menu flex items-center justify-between w-full px-4 sm:px-8">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden flex items-center justify-center"
            aria-label="Open Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex justify-center lg:justify-start w-[60%] max-w-[220px] min-w-[150px]">
            <a href="#" aria-label="Homepage">
              <img
                width="220"
                height="70"
                src={logo}
                alt="Uplevel Logo"
                loading="eager" 
                fetchPriority="high"
                className="w-[70%] sm:w-full h-auto p-[15px]"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center h-full space-x-2 transition-all duration-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => onNavigate(e, item.id)} 
                className="nav-link hover:text-[#e53e3e] relative transition-colors group"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Call button */}
          <div className="tel-btn flex items-center justify-center rounded-full md:min-w-[180px]">
            <a
              href="tel:800275305"
              title="Chiama ora!"
              rel="nofollow"
              className="sk-btn sk-btn--green flex items-center"
            >
              <span className="px-[20px] py-[10px] flex items-center gap-2">
                <span className="w-[20px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 405.333 405.333">
                    <path
                      fill="#FFF"
                      d="M373.333 266.88c-25.003 0-49.493-3.904-72.704-11.563-11.328-3.904-24.192-.896-31.637 6.699l-46.016 34.752c-52.8-28.181-86.592-61.952-114.389-114.368l33.813-44.928c8.512-8.512 11.563-20.971 7.915-32.64-7.723-23.36-11.648-47.872-11.648-72.832 0-17.643-14.357-32-32-32H32C14.357 0 0 14.357 0 32c0 205.845 167.488 373.333 373.333 373.333 17.643 0 32-14.357 32-32V298.88c0-17.643-14.357-32-32-32z"
                    ></path>
                  </svg>
                </span>
                <span className="hidden sm:block text-white text-[18px] font-medium">
                  800 275305
                </span>
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          id="overlay"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Mobile menu */}
      <div
        id="mobileMenu"
        className={`fixed top-0 left-0 h-screen w-[70%] md:w-[33%] bg-[#F4F6FC] transform transition-transform duration-300 z-40 lg:hidden shadow-lg flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          id="closeBtn"
          className="self-end p-4 text-gray-600 hover:text-black text-xl"
          aria-label="Close Menu"
        >
          ✕
        </button>

        <div className="flex flex-col items-center justify-center space-y-3 text-lg font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="text-[#042453] hover:text-[#e53e3e] bg-white w-[90%] h-[50px] flex items-center justify-start px-4 rounded-[8px]"
              onClick={(e) => {
                onNavigate(e, item.id)
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
