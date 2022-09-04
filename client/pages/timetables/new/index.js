import React, { useState } from "react";

import Link from "next/link";

import API from "../../../api/WebService";

import NewTimetableForm from "../../../components/NewTimetableForm";
import ErrorModal from "../../../components/ErrorModal";
import SuccessModal from "../../../components/SuccessModal";

import { BiArrowBack } from "react-icons/bi";

function NewTimetablePage() {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  async function addNewTimetableHandler(groupData) {
    const response = await API.post("/timetable", {
      startDate: groupData.startDate,
      endDate: groupData.endDate,
      zile: groupData.zile,
      shorttag: groupData.shorttag,
      tag: groupData.tag,
    })
      .then((response) => {
        console.log("success");
        setSuccessModalOpen(true);
      })
      .catch((error) => {
        setErrorMessage(
          "Oops! Ceva n-a mers bine. Incarca iar sau contacteaza suport."
        );
        setErrorModalOpen(true);
      });
  }

  return (
    <div className="w-full m-auto">
      <ErrorModal
        message={errorMessage}
        setErrorModalOpen={setErrorModalOpen}
        errorModalOpen={errorModalOpen}
      ></ErrorModal>
      <SuccessModal
        goto="/timetables"
        message="Orar adaugat cu success."
        setSuccessModalOpen={setSuccessModalOpen}
        successModalOpen={successModalOpen}
      ></SuccessModal>
      <Link href={"/timetables"}>
        <button className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded mb-4">
          <BiArrowBack></BiArrowBack>
          Inapoi la lista
        </button>
      </Link>
      <div className="container-fluid text-center container-content">
        <div className="card mb-3">
          <div className="card-header bg-gray-900 text-white">
            Adauga orar nou
          </div>
          <NewTimetableForm onSubmitNewTimetable={addNewTimetableHandler} />
        </div>
      </div>
    </div>
  );
}

export default NewTimetablePage;
