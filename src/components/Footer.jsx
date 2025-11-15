import React, { useState, useEffect, useRef } from "react";
import ThankYouContent from "./ThankyouPopup";
import { toast } from "@/components/ui/use-toast";

import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

const TourismFormFooter = () => {
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);
  const formRef = useRef(null);
  const [message, setMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (phoneInputRef.current) {
      const iti = intlTelInput(phoneInputRef.current, {
        initialCountry: "it",
        separateDialCode: true,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@25.10.1/build/js/utils.js", // Required for formatting/validation (though we skip validation)
        
      });
      itiRef.current = iti;
      return () => {
        iti.destroy();
      };
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    let fullPhoneNumber = formData.get("telephone2") || "";
    try {
      if (itiRef.current.isValidNumber()) {
        fullPhoneNumber = itiRef.current.getNumber();
      } else if (itiRef.current.getNumber() === "") {
        const countryData = itiRef.current.getSelectedCountryData();
        const nationalNumber = phoneInputRef.current.value.trim();

        if (countryData && nationalNumber) {
           fullPhoneNumber = `+${countryData.dialCode}${nationalNumber.replace(/[^\d]/g, '')}`; 
        } else {
             fullPhoneNumber = nationalNumber;
        }
      }
    } catch (error) {
       console.warn("intlTelInput utilsScript may not have loaded, falling back to raw number.", error);
       }

    console.log("Full phone number:", fullPhoneNumber);

    formData.set("telephone2", fullPhoneNumber);

    window.dataLayer = window.dataLayer || [];
    const formName = formRef.current.dataset.gtmFormName || "Tourism_HTML5";
    const master = formRef.current.dataset.gtmMaster || "Tourism";

    window.dataLayer.push({
      event: "form_submit_html5",
      form_name: formName,
      form_id: formRef.current.id,
      master: master,
      success: true,
      source_page: location.pathname,
      tag_owner: "rizwana_mumu",
      email: formData.get("emailaddress1") || "",
      phone: formData.get("telephone2") || "",
    });

    const urlEncodedData = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      urlEncodedData.append(key, value);
    }

    try {
      const response = await fetch(
        "https://c38a86a8a5e249219bcacc6bf45baa.4b.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/cee236b5bd5643849cceafc7bf6e22da/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZN7PHluz9yp5-cQjQ19TDkFSBnBx1pqzyEu3oTWs3fk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlEncodedData.toString(),
        }
      );

      if (response.ok) {
        formRef.current.reset();
        setShowThankYou(true);
        setMessage("");
      } else {
        setMessage("Errore nell'invio. Riprova più tardi.");
      }
    } catch (error) {
      console.error(error);
      toast({
      title:
        "Errore di rete. Riprova.",
    });
    }
  };

  return (
    <>
      <div className="w-full h-auto -mb-1 footer-top">
        <div className="column-gap"></div>
      </div>
      <footer className="cta-footer p-2 sm:p-12">
        <div
          className="cta-footer-content max-w-[1000px] text-center items-center mx-auto"
          id="information"
        >
          <h2 className="text-4xl md:text-[3.85rem] lg:text-[4.375rem] mb-8 leading-[2.568rem] sm:leading-[4.8125rem] section-title text-caros">
            Richiedi{" "}
            <span className="font-medium text-[#082453]">informazioni</span> sul
            Master in Tourism Management
          </h2>

          <form
            onSubmit={handleSubmit}
            ref={formRef}
            id="TourismForm"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#042453]"
            data-gtm-form-name="Tourism_HTML5"
            data-gtm-master="Tourism"
          >
            {/* Name */}
            <input
              type="text"
              id="name"
              name="firstname"
              placeholder="Nome *"
              required
            />

            <input
              type="text"
              id="surname"
              name="lastname"
              placeholder="Cognome *"
              required
            />

            <div className="mb-2.5">
              <input
                type="tel"
                id="myCustomPhone"
                placeholder="Cellulare *"
                name="telephone2"
                ref={phoneInputRef}
                required
                className="form-input-style pl-26"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              id="myEmail"
              name="emailaddress1"
              placeholder="Email *"
              required
            />

            {/* Master Dropdown */}
            <select
              id="master"
              name="new_master"
              required
              className="custom-select mb-2.5"
              defaultValue="100000000"
              aria-label="Seleziona un master"
            >
              <option value="" disabled>
                Seleziona un master *
              </option>
              <option value="100000000">Master in Tourism Management</option>
              <option value="100000002">
                Master in Hospitality Management
              </option>
              <option value="100000001">
                Master in Comunicazione Social Media e Digital Marketing
              </option>
              <option value="100000004">Master in Event Management</option>
              <option value="100000005">Master in Human Resources</option>
            </select>

            {/* Site Dropdown */}
            <select
              id="site"
              name="new_sede"
              required
              className="custom-select mb-2.5"
              defaultValue=""
              aria-label="Seleziona un sede"
            >
              <option value="" disabled>
                Sede *
              </option>
              <option value="100000006">Online</option>
              <option value="100000001">Milano</option>
              <option value="100000002">Roma</option>
              <option value="100000003">Napoli</option>
            </select>

            {/* Checkboxes */}
            <div className="md:col-span-2 flex flex-col gap-2 items-start text-left mt-2">
              {/* Newsletter */}
              <label htmlFor="newsletter" className="checkbox-label">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="new_invionewsletter"
                  className="transform scale-125"
                />{" "}
                Accetto di ricevere newsletter con informazioni commerciali e
                promozionali relative al servizio (facoltativa)
              </label>

              {/* Privacy Policy */}
              <label htmlFor="privacy" className="checkbox-label">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  required
                  className="transform scale-125"
                />{" "}
                <span>
                  Ho preso visione dell'informativa dei dati personali
                  <a
                    href="https://www.iubenda.com/privacy-policy/27038141"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline ml-1"
                  >
                    Privacy & Cookies Policy
                  </a>{" "}
                  *
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="cta-button mt-4 w-full bg-[rgb(8,55,122)] py-3 px-6 gap-10 flex items-center justify-center" aria-label="Submit"
              >
                Richiedi informazioni
                <span className="flex items-center justify-center w-4 h-4 bg-white rounded-full ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 24"
                    strokeWidth="2.5"
                    stroke="#082453"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="#042453"
                      d="M9,12.5 2, 12.5 2,11.5 7,11.5 7,8 12,12 7,16 7,12.5"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </footer>
      <div className="w-full h-auto -mb-1 footer-bottom">
        <div className="column-gap"></div>
      </div>
      {showThankYou && (
        <ThankYouContent onClose={() => setShowThankYou(false)} />
      )}
    </>
  );
};

export default TourismFormFooter;
