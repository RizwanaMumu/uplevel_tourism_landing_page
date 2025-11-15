import React from "react";

const BottomAnimatedButton = ({ onNavigate }) => {
  return (
    <div id="bottom-request-btn" className="flex justify-center">
      <button
        key="informationBottom"
        onClick={(e) => onNavigate(e, 'information')}
        className="cta-button w-full transform transition-transform duration-200 hover:animate-pulse-scale font-medium text-lg"
      >
        Richiedi informazioni
        {/* Icon for the button: White circle with right arrow */}
        <span className="flex items-center justify-center w-5 h-5 bg-white rounded-full inline-block ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 15 24"
            strokeWidth="2.5"
            stroke="#082453"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#042453"
              d="M9,13 0,13 0,11 8,11 8,6 15,12 8,18 8,13"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default BottomAnimatedButton;
