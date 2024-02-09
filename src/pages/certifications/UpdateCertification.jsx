import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCertificationById,
  updateCertification,
  fetchResidents,
} from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const UpdateCertification = () => {
  const [certificationData, setCertificationData] = useState({
    residentID: "",
    certificationType: "",
    issueDate: "",
    validUntil: "",
    issuedBy: "",
    purpose: "",
    status: "",
  });
  const [residents, setResidents] = useState([]);
  const { certificationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetchResidents(token)
      .then((response) => {
        setResidents(response.data);
      })
      .catch((error) => console.error("Error fetching residents:", error));

    getCertificationById(certificationId, token)
      .then((response) => {
        const { issueDate, validUntil, ...rest } = response.data;
        setCertificationData({
          ...rest,
          issueDate: issueDate.split("T")[0],
          validUntil: validUntil ? validUntil.split("T")[0] : "",
        });
      })
      .catch((error) =>
        console.error("Error fetching certification details:", error)
      );
  }, [certificationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await updateCertification(certificationId, certificationData, token);
      navigate("/certifications", {
        state: { successMessage: "Certificate updated successfully!" },
      });
    } catch (err) {
      console.error("Error updating certification:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setCertificationData({
      ...certificationData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div class="p-4 pt-16 sm:ml-64">
        <div className="container mx-auto p-6">
          <div
            class="
              flex flex-col
              items-start
              justify-between
              pb-6
              space-y-4
              border-b
              lg:items-center lg:space-y-0 lg:flex-row
            "
          >
            <h1 class="text-2xl font-semibold whitespace-nowrap">
              Update Certification
            </h1>
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
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                htmlFor="residentID"
              >
                Resident:
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="residentID"
                name="residentID"
                value={certificationData.residentID}
                onChange={handleChange}
                required
              >
                <option value="">Select Resident</option>
                {residents.map((resident) => (
                  <option
                    key={resident.id}
                    value={resident.id}
                  >{`${resident.firstName} ${resident.lastName}`}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                htmlFor="certificationType"
              >
                Certification Type:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="certificationType"
                type="text"
                name="certificationType"
                value={certificationData.certificationType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                htmlFor="issueDate"
              >
                Issue Date:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="issueDate"
                type="date"
                name="issueDate"
                value={certificationData.issueDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                htmlFor="validUntil"
              >
                Valid Until:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="validUntil"
                type="date"
                name="validUntil"
                value={certificationData.validUntil}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                htmlFor="issuedBy"
              >
                Issued By:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="issuedBy"
                type="text"
                name="issuedBy"
                value={certificationData.issuedBy}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                htmlFor="purpose"
              >
                Purpose:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="purpose"
                name="purpose"
                value={certificationData.purpose}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                htmlFor="status"
              >
                Status:
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="status"
                name="status"
                value={certificationData.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Revoked">Revoked</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
            <button
              type="submit"
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </span>
              <span>Update</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCertification;
