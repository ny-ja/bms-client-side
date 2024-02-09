import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCertificationById } from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const PrintCertification = () => {
  const [certificationData, setCertificationData] = useState({
    residentID: "",
    certificationType: "",
    issueDate: "",
    validUntil: "",
    issuedBy: "",
    purpose: "",
    resident: { firstName: "", lastName: "", address: "" },
  });
  const { certificationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getCertificationById(certificationId, token)
      .then((response) => {
        setCertificationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching certification data:", error);
      });
  }, [certificationId]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="p-4 pt-16 sm:ml-64">
        <style>
          {`
            @media print {
              body * {
                visibility: hidden;
              }
              .printable, .printable * {
                visibility: visible;
              }
              .printable {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
            }
          `}
        </style>
        <div className="container mx-auto p-6">
          <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
            <div className="flex">
              <h1 className="text-2xl font-semibold whitespace-nowrap mr-6">
                Print Certification
              </h1>
              <button
                onClick={() => window.print()}
                class="
                inline-flex
                items-center
                justify-center
                px-4
                py-1
                space-x-1
                bg-gray-200
                rounded-md
                shadow
                hover:bg-opacity-20
              "
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <button
              onClick={() => navigate(`/certifications`)}
              class="
                inline-flex
                items-center
                justify-center
                px-4
                py-1
                space-x-1
                bg-gray-200
                rounded-md
                shadow
                hover:bg-opacity-20
              "
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span>Back</span>
            </button>
          </div>
          <div class="printable bg-white p-10 shadow-lg">
            <section class="text-gray-700 body-font overflow-hidden">
              <div class="container mx-auto">
                <div class="flex justify-start md:justify-start">
                  <img
                    src="/bms-logo.png"
                    alt="Barangay Logo"
                    class="h-40 w-auto object-cover"
                  />
                </div>
                <div class="text-center mb-12">
                  <h1 class="text-3xl font-serif font-medium text-gray-900 mb-4">
                    Barangay Certification
                  </h1>
                  <p class="text-base leading-relaxed">
                    This is to certify that
                  </p>
                </div>
                <div class="flex flex-col items-center text-center md:text-center">
                  <h2 class="text-lg font-medium text-gray-900 mb-1">
                    {`${certificationData.resident.firstName} ${certificationData.resident.lastName}`}
                  </h2>
                  <div class="text-base text-gray-500 mb-4">
                    Resident of {certificationData.resident.address}
                  </div>
                  <div class="text-lg text-gray-900 mb-4">
                    <span class="font-semibold">Certification Type:</span>{" "}
                    {certificationData.certificationType}
                  </div>
                  <div class="w-full md:w-3/4 border-t border-gray-300 py-2 flex justify-between">
                    <span class="text-gray-500">Issued By</span>
                    <span class="text-gray-900">
                      {certificationData.issuedBy}
                    </span>
                  </div>
                  <div class="w-full md:w-3/4 border-t border-gray-300 py-2 flex justify-between">
                    <span class="text-gray-500">Issue Date</span>
                    <span class="text-gray-900">
                      {certificationData.issueDate}
                    </span>
                  </div>
                  <div class="w-full md:w-3/4 border-t border-gray-300 py-2 flex justify-between">
                    <span class="text-gray-500">Valid Until</span>
                    <span class="text-gray-900">
                      {certificationData.validUntil}
                    </span>
                  </div>
                  <div class="w-full md:w-3/4 border-t border-b border-gray-300 py-2 mt-4">
                    <p class="text-base leading-relaxed text-gray-500">
                      This certification is issued upon the request of the
                      above-named person for the purpose of{" "}
                      {certificationData.purpose}.
                    </p>
                  </div>
                  <div class="mt-6 w-full md:w-3/4">
                    <p class="leading-relaxed text-gray-500">
                      Issued on {new Date().toLocaleDateString()}, at Barangay
                      Office.
                    </p>
                  </div>
                  <div class="mt-8 w-full md:w-3/4 flex justify-end">
                    <div class="text-right">
                      <div class="inline-block border-t border-gray-500">
                        <span class="text-sm text-gray-500">
                          Authorized Signature
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintCertification;
