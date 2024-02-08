import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResidentById } from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ResidentDetails = () => {
  const [residentData, setResidentData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    contactNumber: "",
    email: "",
    occupation: "",
    gender: "",
    civilStatus: "",
  });
  const { residentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getResidentById(residentId, token)
      .then((response) => {
        setResidentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resident data:", error);
      });
  }, [residentId]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="p-4 pt-16 sm:ml-64">
        <div className="container mx-auto p-6">
          <div
            className="
              flex flex-col
              items-start
              justify-between
              pb-6
              space-y-4
              border-b
              lg:items-center lg:space-y-0 lg:flex-row
            "
          >
            <h1 className="text-2xl font-semibold whitespace-nowrap">
              Resident Details
            </h1>
            <button
              onClick={() => navigate(`/residents`)}
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

          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    FULL NAME
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                    {`${residentData.firstName} ${residentData.middleName} ${residentData.lastName}`}
                  </h1>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Date Of Birth</span>
                    <span className="ml-auto text-gray-900">
                      {residentData.dateOfBirth}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Address</span>
                    <span className="ml-auto text-gray-900">
                      {residentData.address}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Contact Number</span>
                    <span className="ml-auto text-gray-900">
                      {residentData.contactNumber}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Email</span>
                    <span className="ml-auto text-gray-900">
                      {residentData.email}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Occupation</span>
                    <span className="ml-auto text-gray-900">
                      {residentData.occupation}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Gender</span>
                    <span className="ml-auto text-gray-900">
                      {residentData.gender}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Civil Status</span>
                    <span className="ml-auto text-gray-900">
                      {residentData.civilStatus}
                    </span>
                  </div>
                </div>
                <img
                  alt="resident"
                  class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src="https://dummyimage.com/400x400"
                ></img>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResidentDetails;
