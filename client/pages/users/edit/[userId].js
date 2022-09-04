import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import AsyncSelect from "react-select/async";

import API from "../../../api/WebService";

import NewUserForm from "../../../components/NewUserForm";
import ErrorModal from "../../../components/ErrorModal";
import SuccessModal from "../../../components/SuccessModal";

import { BiArrowBack } from "react-icons/bi";
import { AiOutlineSave } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

function EditUserPage() {
  const router = useRouter();

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [group, setGroup] = useState();
  const [groupSearchString, setGroupSearchString] = useState("");
  const [Id, setId] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [uniyear, setUniyear] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const Id = router.query.userId;
    setId(Id);

    API.get(`/users/${Id}`)
      .then((response) => {
        console.log(response.data);

        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setFaculty(response.data.faculty);
        setDepartment(response.data.department);
        setUniyear(response.data.uniyear);
        setIsProfessor(response.data.professor);
        setIsAdmin(response.data.admin);
        let group = {};
        group.value = response.data.group._id;
        group.label = response.data.group.name;
        setGroup(group);
      })
      .catch(() => {
        setErrorMessage(
          "Oops! Ceva n-a mers bine. Incarca iar sau contacteaza suport."
        );
      });
  }, []);

  async function editUserHandler(event) {
    event.preventDefault();

    const response = await API.put(`/user/${Id}`, {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      faculty: faculty,
      department: department,
      uniyear: uniyear,
      group: group?.value ? group.value : undefined,
      professor: isProfessor,
      administrator: isAdmin,
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

  const SearchGroups = () => {
    return API.post("groups/search", {
      groupSearchString,
    }).then(function (response) {
      let options = response.data.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      return options;
    });
  };

  const handleInputChange = (value) => {
    setGroupSearchString(value);
  };

  const handleChange = (value) => {
    setGroup(value);
  };

  return (
    <div className="w-3/4 m-auto">
      <ErrorModal
        message={errorMessage}
        setErrorModalOpen={setErrorModalOpen}
        errorModalOpen={errorModalOpen}
      ></ErrorModal>
      <SuccessModal
        message="Utilizator editat cu success."
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
            Modifica utilizator
          </div>
          <div className="card-body mx-auto">
            <h5 className="card-title"></h5>
            <form className="text-start" onSubmit={editUserHandler}>
              <div className="row mb-3">
                <div className="input-group">
                  <span className="input-group-text">Nume si prenume</span>
                  <input
                    value={firstName}
                    type="text"
                    aria-label="First name"
                    className="form-control"
                    placeholder="Nume"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                  <input
                    value={lastName}
                    type="text"
                    aria-label="Last name"
                    className="form-control"
                    placeholder="Prenume"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label" htmlFor="registerEmail">
                    Email
                  </label>
                  <input
                    value={email}
                    type="email"
                    className="form-control"
                    id="registerEmail"
                    placeholder="name@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="registerPassword">
                    Parola
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="registerPassword"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label" htmlFor="facultate">
                    Facultate
                  </label>
                  <input
                    value={faculty}
                    type="text"
                    id="facultate"
                    className="form-control"
                    placeholder="Automatica, Calculatoare si Electronica"
                    required
                    onChange={(e) => setFaculty(e.target.value)}
                  ></input>
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="departament">
                    Departament
                  </label>
                  <input
                    value={department}
                    type="text"
                    className="form-control"
                    id="departament"
                    placeholder="CTI"
                    required
                    onChange={(e) => setDepartment(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label className="form-label" htmlFor="anUniversitar">
                    An universitar
                  </label>
                  <input
                    value={uniyear}
                    type="text"
                    className="form-control"
                    id="anUniversitar"
                    pattern="[0-9]{1}"
                    placeholder="1"
                    onChange={(e) => setUniyear(e.target.value)}
                  ></input>
                </div>
                <div className="col-6">
                  {!isProfessor && (
                    <div className="row">
                      <label className="form-label">Grupa</label>
                      <div className="col-6">
                        <AsyncSelect
                          id="group-value-select"
                          instanceId="group-value-select"
                          cacheOptions
                          defaultOptions
                          value={group}
                          loadOptions={SearchGroups}
                          onInputChange={handleInputChange}
                          onChange={handleChange}
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
                      <div className="col-6 flex space-x-4">
                        <Link href={"/groups/new"}>
                          <button className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-1.5 px-2 border border-gray-600 hover:border-transparent rounded">
                            <div className="flex items-center">
                              <AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>
                              <span>Grupa noua</span>
                            </div>
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6 mt-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isProfessor}
                      id="profCheckChecked"
                      onChange={(e) => setIsProfessor(e.target.checked)}
                    ></input>
                    <label
                      className="form-check-label text-red-600"
                      htmlFor="profCheckChecked"
                    >
                      Desemneaza ca profesor
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isAdmin}
                      id="adminCheckChecked"
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    ></input>
                    <label
                      className="form-check-label text-red-600"
                      htmlFor="adminCheckChecked"
                    >
                      Desemneaza ca administrator
                    </label>
                  </div>
                </div>
              </div>

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

export default EditUserPage;
