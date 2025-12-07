import React, { useState, useEffect, useRef } from "react";
import intlTelInput from "intl-tel-input/build/js/intlTelInputWithUtils";
import "intl-tel-input/build/css/intlTelInput.css";
import ThankYouContent from "./ThankyouPopup";

const TourismFormFooter = () => {
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);
  const formRef = useRef(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (!phoneInputRef.current) return;

    const iti = intlTelInput(phoneInputRef.current, {
      initialCountry: "it",
      separateDialCode: true,
      autoPlaceholder: "aggressive",
      placeholderNumberType: "MOBILE",
      nationalMode: false,
      strictMode: true,
    });

    itiRef.current = iti;

    return () => {
      iti.destroy();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    let fullPhoneNumber = formData.get("telephone2") || "";

    // try {
    //   if (itiRef.current.isValidNumber()) {
    //     fullPhoneNumber = itiRef.current.getNumber();
    //   } else if (itiRef.current.getNumber() === "") {
    //     const countryData = itiRef.current.getSelectedCountryData();
    //     const nationalNumber = phoneInputRef.current.value.trim();

    //     if (countryData && nationalNumber) {
    //       fullPhoneNumber = `+${countryData.dialCode}${nationalNumber.replace(
    //         /[^\d]/g,
    //         ""
    //       )}`;
    //     } else {
    //       fullPhoneNumber = nationalNumber;
    //     }
    //   }
    // } catch (error) {
    //   console.warn(
    //     "intlTelInput utilsScript may not have loaded, falling back to raw number.",
    //     error
    //   );
    // }

    // console.log("Full phone number:", fullPhoneNumber);

    try {
      
      if (!itiRef.current || !itiRef.current.getNumber) {
        console.warn("Utils script not loaded, falling back to raw input");
      } else {
        
        const isValid = itiRef.current.isValidNumber();
        console.log("Is phone number valid?", isValid);

        if (!isValid) {
          const errorCode = itiRef.current.getValidationError();
          const errorMap = {
            1: "Invalid country code",
            2: "The number is too short",
            3: "The number is too long",
            4: "Invalid number",
          };
          const msg = errorMap[errorCode] || "Invalid number";
          setErrorMessage(msg);
          return;
        }

        setErrorMessage("");

       
        fullPhoneNumber = itiRef.current.getNumber();
        console.log("Valid Full Number:", fullPhoneNumber);
      }
    } catch (error) {
      console.warn("Validation failed, using raw input", error);
    }
    
    if (!fullPhoneNumber.startsWith("+")) {
      const countryData = itiRef.current.getSelectedCountryData();
      fullPhoneNumber = `+${countryData.dialCode}${fullPhoneNumber.replace(
        /[^\d]/g,
        ""
      )}`;
    }

    formData.set("telephone2", fullPhoneNumber);

    let ipAddress = "";
    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipJson = await ipRes.json();
      ipAddress = ipJson.ip;
    } catch (err) {
      console.warn("Failed to fetch IP address", err);
    }
    

    formData.set("ip_address", ipAddress);

    const urlParams = new URLSearchParams(window.location.search);
    const campaignId = urlParams.get("campaignid") || "";

    const formFieldsPayload = {};

    const utmPayload = {
      new_utmsource: urlParams.get("new_utmsource") || "",
      new_utmmedium: urlParams.get("new_utmmedium") || "",
      new_utmcampaign: urlParams.get("new_utmcampaign") || "",
      new_utmcontent: urlParams.get("new_utmcontent") || "",
      new_utmterm: urlParams.get("new_utmterm") || "",
      new_utmmatchtype: urlParams.get("new_utmmatchtype") || "",
      new_utmadposition: urlParams.get("new_utmadpositio") || "",
      new_utmdevice: urlParams.get("new_utmdevice") || "",
      new_gclid: urlParams.get("gclid") || "",
    };

    const payload = {
      firstname: formData.get("firstname") || "",
      lastname: formData.get("lastname") || "",
      telephone2: fullPhoneNumber || "",
      emailaddress1: formData.get("emailaddress1") || "",
      new_master: formData.get("new_master") || "",
      new_sede: formData.get("new_sede") || "",
      ...utmPayload,
      new_invionewsletter: formData.get("new_invionewsletter") || "",
      field_7877b63: "form-informazioni",
    };

    formFieldsPayload.ip_address = ipAddress;
    formFieldsPayload.campaignid = campaignId;

    window.dataLayer = window.dataLayer || [];
    const formName = formRef.current.dataset.gtmFormName || "tourism_html5";
    const master = formRef.current.dataset.gtmMaster || "Tourism";

    const dataLayerPayload = {
      event: "form_submit_html5",
      form_name: formName,
      form_id: formRef.current.id,
      success: true,
      tag_owner: "rizwanamumu",

      source_page: location.pathname,
      page_url: window.location.href,
      new_refererurl: document.referrer || "",

      ...payload,
      ip_address: ipAddress,
      campaignid: campaignId,
      field_7877b63: "",
    };

    window.dataLayer.push(dataLayerPayload);

    const urlEncodedData = new URLSearchParams(payload);

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
        title: "Errore di rete. Riprova.",
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
            data-gtm-form-name="tourism_html5"
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

            <div className="mb-2.5 relative">
              <input
                type="tel"
                id="myCustomPhone"
                // placeholder="Cellulare *"
                name="telephone2"
                ref={phoneInputRef}
                required
                className="form-input-style pl-26"
              />
              {errorMessage && <p className="absolute left-0 top-full mt-1 text-white text-left text-sm">{errorMessage}</p>}
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
                className="cta-button mt-4 w-full bg-[rgb(8,55,122)] py-3 px-6 gap-10 flex items-center justify-center"
                aria-label="Submit"
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
