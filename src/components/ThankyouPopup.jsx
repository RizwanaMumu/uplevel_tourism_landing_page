import React from "react";

const ThankYouContent = ({ onClose }) => {

  const handleReturnHome = () => {
    window.location.href = "https://www.uplevel.it/";
  };

  return (
    <div
      id="thankYouPopup"
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="thankYouTitle"
      aria-describedby="thankYouMessage"
    >
    <div
      id="thankYouContent"
      className="relative flex flex-col items-center justify-center max-w-2xl w-full rounded-3xl bg-white p-8 md:p-12 shadow-2xl"
    >
      {/* Text Section */}
      <div className="w-full mt-4 space-y-5 text-center text-gray-800 z-10">
        <h2 id="thankYouTitle" className="text-3xl font-bold text-[#042453]">
          Grazie per la tua richiesta!
        </h2>
        <p id="thankYouMessage" className="text-sm text-gray-600 leading-relaxed">
          Ti contatteremo al più presto per fornirti tutte le informazioni di cui hai bisogno.
        </p>
      </div>

      {/* Return Home Button */}
      <button
        id="closeButton"
        onClick={handleReturnHome}
        className="mt-12 bg-[#042453] hover:bg-primaryGreen text-white font-semibold px-8 py-3 rounded-full transition duration-300 shadow-md"
      >
        Torna alla Home
      </button>

      {/* Close (X) Button */}
      <button
        id="closeIconBtn"
        onClick={onClose}
        className="absolute top-3 right-5 text-gray-500 hover:text-gray-800 text-3xl font-bold z-20"
      >
        &times;
      </button>
    </div>
    </div>
  );
};

export default ThankYouContent;
