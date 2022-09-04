import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import AsyncSelect from "react-select/async";

import API from "../../../api/WebService";

import ErrorModal from "../../../components/ErrorModal";
import SuccessModal from "../../../components/SuccessModal";

import { AiOutlineSave } from "react-icons/ai";
import { MdMoreTime } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

function EditGroupPage() {
  const router = useRouter();
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [nume, setNume] = useState("");
  const [descriere, setDescriere] = useState("");

  const [orar, setOrar] = useState();
  const [orarSearchString, setOrarSearchString] = useState("");
  const [selectOptions, setSelectOptions] = useState();
  const [Id, setId] = useState();

  useEffect(() => {
    const Id = router.query.groupId;
    setId(Id);

    API.get(`/group/${Id}`)
      .then((response) => {
        setNume(response.data.name);
        setDescriere(response.data.description);
        let orar = {};
        orar.value = response.data.orar._id;
        orar.label = response.data.orar.shorttag;
        setOrar(orar);
      })
      .catch((error) => {
        setErrorMessage(
          "Oops! Ceva n-a mers bine. Incarca iar sau contacteaza suport."
        );
        setErrorModalOpen(true);
      });
  }, []);

  const SearchOrars = () => {
    return API.post("timetables/search", {
      orarSearchString,
    }).then(function (response) {
      let options = response.data.map((item) => ({
        value: item._id,
        label: item.shorttag,
      }));
      return options;
    });
  };

  const handleInputChange = (value) => {
    setOrarSearchString(value);
  };

  const handleOrarChange = (value) => {
    setOrar(value);
  };

  const handleNameChange = (e) => {
    setNume(e.target.value);
  };

  const handleDescChange = (e) => {
    setDescriere(e.target.value);
  };

  async function editGroupHandler(event) {
    event.preventDefault();

    const response = await API.put(`/group/${Id}`, {
      name: nume,
      description: descriere,
      orar: orar.value,
    })
      .then((response) => {
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
    <div className="w-3/4 m-auto">
      <ErrorModal
        message={errorMessage}
        setErrorModalOpen={setErrorModalOpen}
        errorModalOpen={errorModalOpen}
      ></ErrorModal>
      <SuccessModal
        goto={"/groups"}
        message="Grupa editata cu success."
        setSuccessModalOpen={setSuccessModalOpen}
        successModalOpen={successModalOpen}
      ></SuccessModal>
      <Link href={"/groups"}>
        <button className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded mb-4">
          <BiArrowBack></BiArrowBack>
          Inapoi la lista
        </button>
      </Link>
      <div className="container-fluid text-center container-content">
        <div className="card mb-3">
          <div className="card-header bg-gray-900 text-white">
            Modifica grupa
          </div>
          <div className="card-body mx-auto">
            <h5 className="card-title"></h5>
            <form className="text-start" onSubmit={editGroupHandler}>
              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label" htmlFor="groupname">
                    Nume grupa
                  </label>
                  <input
                    value={nume}
                    type="text"
                    className="form-control"
                    id="groupname"
                    placeholder="CR1.2B"
                    required
                    onChange={handleNameChange}
                  ></input>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="textarea">
                      Descriere
                    </label>
                    <textarea
                      value={descriere}
                      className="form-control"
                      id="textarea"
                      rows="3"
                      placeholder="..."
                      required
                      onChange={handleDescChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <label className="form-label">Orar</label>
                <div className="col-6">
                  <AsyncSelect
                    id="orar-value-select"
                    instanceId="orar-value-select"
                    cacheOptions
                    defaultOptions
                    value={orar}
                    loadOptions={SearchOrars}
                    onInputChange={handleInputChange}
                    onChange={handleOrarChange}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: "grey",
                        primary: "black",
                      },
                    })}
                  ></AsyncSelect>
                </div>
                <div className="col-6">
                  <Link href={"/timetables/new"}>
                    <button className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-1.5 px-4 border border-gray-600 hover:border-transparent rounded">
                      <div className="flex items-center">
                        <MdMoreTime></MdMoreTime>
                        <span>Orar nou</span>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="row mb-3"></div>
              <div className="col-auto ">
                <button className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                  <AiOutlineSave></AiOutlineSave>
                  Salveaza
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditGroupPage;
