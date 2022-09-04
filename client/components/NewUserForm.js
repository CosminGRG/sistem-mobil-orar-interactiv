import React, { useRef, useState } from "react";
import Link from "next/link";
import AsyncSelect from "react-select/async";

import API from "../api/WebService";

import { AiOutlineSave } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

function NewUserForm(props) {
  const firstname = useRef();
  const lastname = useRef();
  const email = useRef();
  const password = useRef();
  const faculty = useRef();
  const department = useRef();
  const uniyear = useRef();
  const isProfessor = useRef();
  const isAdmin = useRef();
  const [group, setGroup] = useState();
  const [groupSearchString, setGroupSearchString] = useState("");
  const [selectOptions, setSelectOptions] = useState();

  function submitHandler(event) {
    event.preventDefault();

    const inputFirstname = firstname.current.value;
    const inputLastname = lastname.current.value;
    const inputEmail = email.current.value;
    const inputPassword = password.current.value;
    const inputFaculty = faculty.current.value;
    const inputDepartment = department.current.value;
    const inputUniyear = uniyear.current.value;
    const inputIsProfessor = isProfessor.current.checked;
    const inputIsAdmin = isAdmin.current.checked;

    const registerUserData = {
      firstname: inputFirstname,
      lastname: inputLastname,
      email: inputEmail,
      password: inputPassword,
      faculty: inputFaculty,
      department: inputDepartment,
      uniyear: inputUniyear,
      professor: inputIsProfessor,
      administrator: inputIsAdmin,
      group: group ? group : null,
    };

    props.onSubmitNewUser(registerUserData);
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
    <div className="card-body mx-auto">
      <h5 className="card-title"></h5>
      <form className="text-start" onSubmit={submitHandler}>
        <div className="row mb-3">
          <div className="input-group">
            <span className="input-group-text">Nume si prenume</span>
            <input
              type="text"
              aria-label="First name"
              className="form-control"
              placeholder="Nume"
              ref={firstname}
              required
            ></input>
            <input
              type="text"
              aria-label="Last name"
              className="form-control"
              placeholder="Prenume"
              ref={lastname}
              required
            ></input>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label className="form-label" htmlFor="registerEmail">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="registerEmail"
              placeholder="name@example.com"
              ref={email}
              required
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
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              placeholder="Password"
              ref={password}
              required
            ></input>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label className="form-label" htmlFor="facultate">
              Facultate
            </label>
            <input
              type="text"
              id="facultate"
              className="form-control"
              placeholder="Automatica, Calculatoare si Electronica"
              ref={faculty}
              required
            ></input>
          </div>
          <div className="col-6">
            <label className="form-label" htmlFor="departament">
              Departament
            </label>
            <input
              type="text"
              className="form-control"
              id="departament"
              placeholder="CTI"
              ref={department}
              required
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label className="form-label" htmlFor="anUniversitar">
              An universitar
            </label>
            <input
              type="text"
              className="form-control"
              id="anUniversitar"
              pattern="[0-9]{1}"
              placeholder="1"
              ref={uniyear}
            ></input>
          </div>
          <div className="col-6">
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
                      <AiOutlineUsergroupAdd className="mr-1"></AiOutlineUsergroupAdd>
                      <span>Grupa noua</span>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6 mt-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="profCheckChecked"
                ref={isProfessor}
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
                value=""
                id="adminCheckChecked"
                ref={isAdmin}
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
  );
}

export default NewUserForm;
