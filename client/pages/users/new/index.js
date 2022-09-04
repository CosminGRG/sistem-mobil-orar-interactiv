import React, { useState } from "react";

import Link from "next/link";

import API from "../../../api/WebService";

import NewUserForm from "../../../components/NewUserForm";
import ErrorModal from "../../../components/ErrorModal";
import SuccessModal from "../../../components/SuccessModal";

import { BiArrowBack } from "react-icons/bi";

function NewUserPage() {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  async function addNewUserHandler(newUserData) {
    const response = await API.post("/signup", {
      firstname: newUserData.firstname,
      lastname: newUserData.lastname,
      email: newUserData.email,
      password: newUserData.password,
      faculty: newUserData.faculty,
      department: newUserData.department,
      uniyear: newUserData.uniyear,
      professor: newUserData.professor,
      administrator: newUserData.administrator,
      group: newUserData.group.value,
    })
      .then((response) => {
        setSuccessModalOpen(true);
      })
      .catch((error) => {
        if (error.response.status == 409) {
          setErrorMessage(error.response.data.message);
          setErrorModalOpen(true);
        } else {
          setErrorMessage(
            "Oops! Ceva n-a mers bine. Incarca iar sau contacteaza suport."
          );
          setErrorModalOpen(true);
        }
      });
  }

  return (
    <div className="w-3/4 m-auto">
      <ErrorModal
        message={errorMessage}
        setErrorModalOpen={setErrorModalOpen}
        errorModalOpen={errorModalOpen}
      ></ErrorModal>
      <SuccessModal
        message="Utilizator adaugat cu success."
        setSuccessModalOpen={setSuccessModalOpen}
        successModalOpen={successModalOpen}
      ></SuccessModal>
      <Link href={"/users"}>
        <button className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded mb-4">
          <BiArrowBack></BiArrowBack>
          Inapoi la lista
        </button>
      </Link>
      <div className="container-fluid text-center container-content">
        <div className="card mb-3">
          <div className="card-header bg-gray-900 text-white">
            Adauga utilizator nou
          </div>
          <NewUserForm onSubmitNewUser={addNewUserHandler} />
        </div>
      </div>
    </div>
  );
}

export default NewUserPage;
