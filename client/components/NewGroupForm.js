import React, { useRef, useState } from "react";
import Link from "next/link";
import AsyncSelect from "react-select/async";

import API from "../api/WebService";

import { AiOutlineSave } from "react-icons/ai";
import { MdMoreTime } from "react-icons/md";

function NewGroupForm(props) {
  const name = useRef();
  const description = useRef();

  const [orar, setOrar] = useState();
  const [orarSearchString, setOrarSearchString] = useState("");

  function submitHandler(event) {
    event.preventDefault();

    const inputName = name.current.value;
    const inputDescription = description.current.value;

    const groupData = {
      name: inputName,
      description: inputDescription,
      orar: orar.value,
    };

    props.onSubmitNewGroup(groupData);
  }

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

  const handleChange = (value) => {
    setOrar(value);
  };

  return (
    <div className="card-body mx-auto">
      <h5 className="card-title"></h5>
      <form className="text-start" onSubmit={submitHandler}>
        <div className="row mb-3">
          <div className="col-6">
            <label className="form-label" htmlFor="groupname">
              Nume grupa
            </label>
            <input
              type="text"
              className="form-control"
              id="groupname"
              placeholder="CR1.2B"
              ref={name}
              required
            ></input>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label className="form-label" htmlFor="textarea">
                Descriere
              </label>
              <textarea
                className="form-control"
                id="textarea"
                rows="3"
                placeholder="..."
                required
                ref={description}
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
  );
}

export default NewGroupForm;
