import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

import AsyncSelect from "react-select/async";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

import API from "../api/WebService";
import Select from "react-select";

import { AiOutlineSave } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";

const repeatsOptions = [
  { value: "weekly", label: "Saptamanal" },
  { value: "odd", label: "Impar" },
  { value: "even", label: "Par" },
];

const typeOptions = [
  { value: "Curs", label: "Curs" },
  { value: "Seminar", label: "Seminar" },
  { value: "Laborator", label: "Laborator" },
  { value: "Proiect", label: "Proiect" },
];

const locationOptions = [
  { value: "Onsite", label: "Onsite" },
  { value: "Online", label: "Online" },
];

function NewTimetableForm(props) {
  const [professorList, setProfessorList] = useState();
  const [professor, setProfessor] = useState();
  const [professorSearchString, setProfessorSearchString] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [tag, setTag] = useState("");
  const [shorttag, setShortTag] = useState("");
  const [days, setDays] = useState([
    {
      name: "Luni",
      orarItems: [
        {
          name: "",
          description: "",
          type: "",
          professor: "",
          location: "",
          locationtype: "",
          linkmeet: "",
          repeats: "",
          startDate: "10:00",
          endDate: "10:00",
        },
      ],
    },
    {
      name: "Marti",
      orarItems: [
        {
          name: "",
          description: "",
          type: "",
          professor: "",
          location: "",
          locationtype: "",
          linkmeet: "",
          repeats: "",
          startDate: "10:00",
          endDate: "10:00",
        },
      ],
    },
    {
      name: "Miercuri",
      orarItems: [
        {
          name: "",
          description: "",
          type: "",
          professor: "",
          location: "",
          locationtype: "",
          linkmeet: "",
          repeats: "",
          startDate: "10:00",
          endDate: "10:00",
        },
      ],
    },
    {
      name: "Joi",
      orarItems: [
        {
          name: "",
          description: "",
          type: "",
          professor: "",
          location: "",
          locationtype: "",
          linkmeet: "",
          repeats: "",
          startDate: "10:00",
          endDate: "10:00",
        },
      ],
    },
    {
      name: "Vineri",
      orarItems: [
        {
          name: "",
          description: "",
          type: "",
          professor: "",
          location: "",
          locationtype: "",
          linkmeet: "",
          repeats: "",
          startDate: "10:00",
          endDate: "10:00",
        },
      ],
    },
  ]);

  function submitHandler(event) {
    event.preventDefault();

    var newDays = days;

    newDays.forEach((day) => {
      day.orarItems.map((e) => {
        e.locationtype = e.locationtype.value;
        e.professor = e.professor.value;
        e.repeats = e.repeats.value;
        e.type = e.type.value;

        var fields = e.startDate.split(":");
        e.startDate = new Date();
        e.startDate.setHours(fields[0], fields[1], 0);

        fields = e.endDate.split(":");
        e.endDate = new Date();
        e.endDate.setHours(fields[0], fields[1], 0);
      });
    });

    const timetableData = {
      startDate: startDate,
      endDate: endDate,
      zile: newDays,
      shorttag: shorttag,
      tag: tag,
    };

    props.onSubmitNewTimetable(timetableData);
  }

  const SearchProfessors = () => {
    return API.post("/user/professors", {
      professorSearchString,
    }).then(function (response) {
      let options = response.data.map((item) => ({
        value: item._id,
        label: item.firstname + " " + item.lastname,
      }));
      return options;
    });
  };

  const handleItemAdd = (dayIndex) => {
    let newState = [...days];
    let newItem = {
      name: "",
      description: "",
      type: "",
      professor: "",
      location: "",
      locationtype: "",
      linkmeet: "",
      repeats: "",
      startDate: "10:00",
      endDate: "10:00",
    };
    newState[dayIndex].orarItems.push(newItem);
    console.log(newState);
    setDays(newState);
  };

  const handleItemRemove = (dayIndex, index) => {
    let newState = [...days];

    newState[dayIndex].orarItems.splice(index, 1);
    console.log(newState);
    setDays(newState);
  };

  const handleInputChange = (value) => {
    setProfessorSearchString(value);
  };

  const handleNameChange = (e, dayIndex, index) => {
    let newState = [...days];
    newState[dayIndex].orarItems[index].name = e.target.value;
    setDays(newState);
  };

  const handleDescriptionChange = (e, dayIndex, index) => {
    let newState = [...days];
    newState[dayIndex].orarItems[index].description = e.target.value;
    setDays(newState);
  };

  const handleLocationChange = (e, dayIndex, index) => {
    let newState = [...days];
    newState[dayIndex].orarItems[index].location = e.target.value;
    setDays(newState);
  };

  const handleTypeChange = (e, dayIndex, index) => {
    let newState = [...days];
    newState[dayIndex].orarItems[index].type = e;
    setDays(newState);
  };

  const handleRepeatsChange = (e, dayIndex, index) => {
    let newState = [...days];
    newState[dayIndex].orarItems[index].repeats = e;
    setDays(newState);
  };

  const handleStartChange = (e, dayIndex, index) => {
    let newState = [...days];
    newState[dayIndex].orarItems[index].startDate = e;
    setDays(newState);
  };

  const handleEndChange = (e, dayIndex, index) => {
    let newState = [...days];
    newState[dayIndex].orarItems[index].endDate = e;
    setDays(newState);
  };

  const handleProfessorChange = (value, dayIndex, index) => {
    let newState = [...days];
    newState[dayIndex].orarItems[index].professor = value;
    setDays(newState);
  };

  const handleLocTypeChange = (e, dayIndex, index) => {
    let newState = [...days];
    newState[dayIndex].orarItems[index].locationtype = e;
    setDays(newState);
  };

  const handleLinkChange = (e, dayIndex, index) => {
    let newState = [...days];
    newState[dayIndex].orarItems[index].linkmeet = e.target.value;
    setDays(newState);
  };

  function isOdd(num) {
    return num % 2;
  }

  return (
    <div className="w-full">
      <div className="card-body mx-auto">
        <h5 className="card-title"></h5>
        <form className="text-start" onSubmit={submitHandler}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Tag</label>
              <input
                type="text"
                className="form-control"
                placeholder="Eg. Calculatoare Romana An..."
                required
                onChange={(e) => setTag(e.target.value)}
              ></input>
            </div>
            <div className="col">
              <label className="form-label">Short tag</label>
              <input
                type="text"
                className="form-control"
                placeholder="Eg. CR3.2B"
                required
                onChange={(e) => setShortTag(e.target.value)}
              ></input>
            </div>
            <div className="col">
              <label className="form-label">Valabil din:</label>
              <DatePicker
                required
                className="bg-white border"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="col">
              <label className="form-label">Pana in:</label>
              <DatePicker
                required
                className="bg-white border"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
          <h3 className="text-base text-gray-800 group-hover:text-white font-bold">
            Luni
          </h3>
          {days[0].orarItems.map((obj, index) => (
            <div
              key={index}
              className={isOdd(index) ? "bg-gray-300 px-1" : "px-1"}
            >
              <div className="row mb-3 items-center">
                <div className="col">
                  <label className="form-label">Nume</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nume"
                    required
                    value={days[0].orarItems[index].name}
                    onChange={(e) => handleNameChange(e, 0, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Descriere</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Descriere"
                    required
                    value={days[0].orarItems[index].description}
                    onChange={(e) => handleDescriptionChange(e, 0, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Locatie</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Locatie"
                    required
                    value={days[0].orarItems[index].location}
                    onChange={(e) => handleLocationChange(e, 0, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Tip</label>
                  <Select
                    required
                    options={typeOptions}
                    value={days[0].orarItems[index].type}
                    onChange={(e) => handleTypeChange(e, 0, index)}
                  ></Select>
                </div>
                <div className="col">
                  <label className="form-label">Repetare</label>
                  <Select
                    required
                    options={repeatsOptions}
                    value={days[0].orarItems[index].repeats}
                    onChange={(e) => handleRepeatsChange(e, 0, index)}
                  ></Select>
                </div>
                {days[0].orarItems.length > 1 && (
                  <div className="col">
                    <button
                      className="hover:bg-red-700 bg-red-500 text-white font-semibold py-1.5 px-2 border border-gray-600 hover:border-transparent rounded"
                      onClick={() => handleItemRemove(0, index)}
                      type="button"
                    >
                      <div className="flex items-center">
                        <AiOutlineCloseCircle className="mr-1"></AiOutlineCloseCircle>
                      </div>
                    </button>
                  </div>
                )}
              </div>
              <div className="row mb-3 items-center">
                <div className="col">
                  <label className="form-label">Ora Inceput</label>
                  <TimePicker
                    required
                    className="react-time-picker form-control"
                    onChange={(e) => handleStartChange(e, 0, index)}
                    value={days[0].orarItems[index].startDate}
                    disableClock={true}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Ora Sfarsit</label>
                  <TimePicker
                    required
                    className="react-time-picker form-control"
                    onChange={(e) => handleEndChange(e, 0, index)}
                    value={days[0].orarItems[index].endDate}
                    disableClock={true}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Profesor</label>
                  <AsyncSelect
                    required
                    id={"prof-value-select" + 0 + index}
                    instanceId={"prof-value-select" + 0 + index}
                    cacheOptions
                    defaultOptions
                    value={days[0].orarItems[index].professor}
                    loadOptions={SearchProfessors}
                    onInputChange={handleInputChange}
                    onChange={(value) => handleProfessorChange(value, 0, index)}
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
                <div className="col">
                  <label className="form-label">Online/Onsite</label>
                  <Select
                    required
                    options={locationOptions}
                    onChange={(e) => handleLocTypeChange(e, 0, index)}
                    value={days[0].orarItems[index].locationtype}
                  ></Select>
                </div>
                {days[0].orarItems[index].locationtype.value == "Online" && (
                  <div className="col">
                    <label className="form-label">Link meet</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Link"
                      required
                      onChange={(e) => handleLinkChange(e, 0, index)}
                      value={days[0].orarItems[index].meetlink}
                    ></input>
                  </div>
                )}
              </div>
              <hr className="mb-4 mt-4"></hr>
            </div>
          ))}
          {days[0].orarItems.length < 6 && (
            <div>
              <button
                className="hover:bg-gray-900 bg-gray-100 text-gray-600 font-semibold hover:text-white py-1.5 px-2 border border-gray-600 hover:border-transparent rounded"
                onClick={() => {
                  handleItemAdd(0);
                }}
                type="button"
              >
                <div className="flex items-center">
                  <BiAddToQueue className="mr-1"></BiAddToQueue>
                  <span>Adauga camp</span>
                </div>
              </button>
            </div>
          )}
          <h3 className="text-base text-gray-800 group-hover:text-white font-bold ">
            Marti
          </h3>
          {days[1].orarItems.map((obj, index) => (
            <div
              key={index}
              className={isOdd(index) ? "bg-gray-300 px-1" : "px-1"}
            >
              <div className="row mb-3 items-center">
                <div className="col">
                  <label className="form-label">Nume</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nume"
                    required
                    value={days[1].orarItems[index].name}
                    onChange={(e) => handleNameChange(e, 1, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Descriere</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Descriere"
                    required
                    value={days[1].orarItems[index].description}
                    onChange={(e) => handleDescriptionChange(e, 1, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Locatie</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Locatie"
                    required
                    value={days[1].orarItems[index].location}
                    onChange={(e) => handleLocationChange(e, 1, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Tip</label>
                  <Select
                    required
                    options={typeOptions}
                    value={days[1].orarItems[index].type}
                    onChange={(e) => handleTypeChange(e, 1, index)}
                  ></Select>
                </div>
                <div className="col">
                  <label className="form-label">Repetare</label>
                  <Select
                    required
                    options={repeatsOptions}
                    value={days[1].orarItems[index].repeats}
                    onChange={(e) => handleRepeatsChange(e, 1, index)}
                  ></Select>
                </div>
                {days[1].orarItems.length > 1 && (
                  <div className="col">
                    <button
                      className="hover:bg-red-700 bg-red-500 text-white font-semibold py-1.5 px-2 border border-gray-600 hover:border-transparent rounded"
                      onClick={() => handleItemRemove(1, index)}
                      type="button"
                    >
                      <div className="flex items-center">
                        <AiOutlineCloseCircle className="mr-1"></AiOutlineCloseCircle>
                      </div>
                    </button>
                  </div>
                )}
              </div>
              <div className="row mb-3 items-center">
                <div className="col">
                  <label className="form-label">Ora Inceput</label>
                  <TimePicker
                    required
                    className="react-time-picker form-control"
                    onChange={(e) => handleStartChange(e, 1, index)}
                    value={days[1].orarItems[index].startDate}
                    disableClock={true}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Ora Sfarsit</label>
                  <TimePicker
                    required
                    className="react-time-picker form-control"
                    onChange={(e) => handleEndChange(e, 1, index)}
                    value={days[1].orarItems[index].endDate}
                    disableClock={true}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Profesor</label>
                  <AsyncSelect
                    required
                    id={"prof-value-select" + 1 + index}
                    instanceId={"prof-value-select" + 1 + index}
                    cacheOptions
                    defaultOptions
                    value={days[1].orarItems[index].professor}
                    loadOptions={SearchProfessors}
                    onInputChange={handleInputChange}
                    onChange={(value) => handleProfessorChange(value, 1, index)}
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
                <div className="col">
                  <label className="form-label">Online/Onsite</label>
                  <Select
                    required
                    options={locationOptions}
                    value={days[1].orarItems[index].locationtype}
                    onChange={(e) => handleLocTypeChange(e, 1, index)}
                  ></Select>
                </div>
                {days[1].orarItems[index].locationtype.value == "Online" && (
                  <div className="col">
                    <label className="form-label">Link meet</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Link"
                      required
                      value={days[1].orarItems[index].meetlink}
                      onChange={(e) => handleLinkChange(e, 1, index)}
                    ></input>
                  </div>
                )}
              </div>
              <hr className="mb-4 mt-4"></hr>
            </div>
          ))}
          {days[1].orarItems.length < 6 && (
            <div>
              <button
                className="hover:bg-gray-900 bg-gray-100 text-gray-600 font-semibold hover:text-white py-1.5 px-2 border border-gray-600 hover:border-transparent rounded"
                onClick={() => {
                  handleItemAdd(1);
                }}
                type="button"
              >
                <div className="flex items-center">
                  <BiAddToQueue className="mr-1"></BiAddToQueue>
                  <span>Adauga camp</span>
                </div>
              </button>
            </div>
          )}
          <h3 className="text-base text-gray-800 group-hover:text-white font-bold ">
            Miercuri
          </h3>
          {days[2].orarItems.map((obj, index) => (
            <div
              key={index}
              className={isOdd(index) ? "bg-gray-300 px-1" : "px-1"}
            >
              <div className="row mb-3 items-center">
                <div className="col">
                  <label className="form-label">Nume</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nume"
                    required
                    value={days[2].orarItems[index].name}
                    onChange={(e) => handleNameChange(e, 2, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Descriere</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Descriere"
                    required
                    value={days[2].orarItems[index].description}
                    onChange={(e) => handleDescriptionChange(e, 2, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Locatie</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Locatie"
                    required
                    value={days[2].orarItems[index].location}
                    onChange={(e) => handleLocationChange(e, 2, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Tip</label>
                  <Select
                    required
                    options={typeOptions}
                    value={days[2].orarItems[index].type}
                    onChange={(e) => handleTypeChange(e, 2, index)}
                  ></Select>
                </div>
                <div className="col">
                  <label className="form-label">Repetare</label>
                  <Select
                    required
                    options={repeatsOptions}
                    value={days[2].orarItems[index].repeats}
                    onChange={(e) => handleRepeatsChange(e, 2, index)}
                  ></Select>
                </div>

                {days[2].orarItems.length > 1 && (
                  <div className="col">
                    <button
                      className="hover:bg-red-700 bg-red-500 text-white font-semibold py-1.5 px-2 border border-gray-600 hover:border-transparent rounded"
                      onClick={() => handleItemRemove(2, index)}
                      type="button"
                    >
                      <div className="flex items-center">
                        <AiOutlineCloseCircle className="mr-1"></AiOutlineCloseCircle>
                      </div>
                    </button>
                  </div>
                )}
              </div>
              <div className="row mb-3 items-center">
                <div className="col">
                  <label className="form-label">Ora Inceput</label>
                  <TimePicker
                    required
                    className="react-time-picker form-control"
                    onChange={(e) => handleStartChange(e, 2, index)}
                    value={days[2].orarItems[index].startDate}
                    disableClock={true}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Ora Sfarsit</label>
                  <TimePicker
                    required
                    className="react-time-picker form-control"
                    onChange={(e) => handleEndChange(e, 2, index)}
                    value={days[2].orarItems[index].endDate}
                    disableClock={true}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Profesor</label>
                  <AsyncSelect
                    required
                    id={"prof-value-select" + 2 + index}
                    instanceId={"prof-value-select" + 2 + index}
                    cacheOptions
                    defaultOptions
                    value={days[2].orarItems[index].professor}
                    loadOptions={SearchProfessors}
                    onInputChange={handleInputChange}
                    onChange={(value) => handleProfessorChange(value, 2, index)}
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
                <div className="col">
                  <label className="form-label">Online/Onsite</label>
                  <Select
                    required
                    options={locationOptions}
                    value={days[2].orarItems[index].locationtype}
                    onChange={(e) => handleLocTypeChange(e, 2, index)}
                  ></Select>
                </div>
                {days[2].orarItems[index].locationtype.value == "Online" && (
                  <div className="col">
                    <label className="form-label">Link meet</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Link"
                      required
                      value={days[2].orarItems[index].meetlink}
                      onChange={(e) => handleLinkChange(e, 2, index)}
                    ></input>
                  </div>
                )}
              </div>
              <hr className="mb-4 mt-4"></hr>
            </div>
          ))}
          {days[2].orarItems.length < 6 && (
            <div>
              <button
                className="hover:bg-gray-900 bg-gray-100 text-gray-600 font-semibold hover:text-white py-1.5 px-2 border border-gray-600 hover:border-transparent rounded"
                onClick={() => {
                  handleItemAdd(2);
                }}
                type="button"
              >
                <div className="flex items-center">
                  <BiAddToQueue className="mr-1"></BiAddToQueue>
                  <span>Adauga camp</span>
                </div>
              </button>
            </div>
          )}
          <h3 className="text-base text-gray-800 group-hover:text-white font-bold ">
            Joi
          </h3>
          {days[3].orarItems.map((obj, index) => (
            <div
              key={index}
              className={isOdd(index) ? "bg-gray-300 px-1" : "px-1"}
            >
              <div className="row mb-3 items-center">
                <div className="col">
                  <label className="form-label">Nume</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nume"
                    required
                    value={days[3].orarItems[index].name}
                    onChange={(e) => handleNameChange(e, 3, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Descriere</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Descriere"
                    required
                    value={days[3].orarItems[index].description}
                    onChange={(e) => handleDescriptionChange(e, 3, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Locatie</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Locatie"
                    required
                    value={days[3].orarItems[index].location}
                    onChange={(e) => handleLocationChange(e, 3, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Tip</label>
                  <Select
                    required
                    options={typeOptions}
                    value={days[3].orarItems[index].type}
                    onChange={(e) => handleTypeChange(e, 3, index)}
                  ></Select>
                </div>
                <div className="col">
                  <label className="form-label">Repetare</label>
                  <Select
                    required
                    options={repeatsOptions}
                    value={days[3].orarItems[index].repeats}
                    onChange={(e) => handleRepeatsChange(e, 3, index)}
                  ></Select>
                </div>

                {days[3].orarItems.length > 1 && (
                  <div className="col">
                    <button
                      className="hover:bg-red-700 bg-red-500 text-white font-semibold py-1.5 px-2 border border-gray-600 hover:border-transparent rounded"
                      onClick={() => handleItemRemove(3, index)}
                      type="button"
                    >
                      <div className="flex items-center">
                        <AiOutlineCloseCircle className="mr-1"></AiOutlineCloseCircle>
                      </div>
                    </button>
                  </div>
                )}
              </div>
              <div className="row mb-3 items-center">
                <div className="col">
                  <label className="form-label">Ora Inceput</label>
                  <TimePicker
                    required
                    className="react-time-picker form-control"
                    onChange={(e) => handleStartChange(e, 3, index)}
                    value={days[3].orarItems[index].startDate}
                    disableClock={true}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Ora Sfarsit</label>
                  <TimePicker
                    required
                    className="react-time-picker form-control"
                    onChange={(e) => handleEndChange(e, 3, index)}
                    value={days[3].orarItems[index].endDate}
                    disableClock={true}
                  />
                </div>
                <div className="col">
                  <label className="form-label" htmlFor="registerPassword">
                    Profesor
                  </label>
                  <AsyncSelect
                    required
                    id={"prof-value-select" + 3 + index}
                    instanceId={"prof-value-select" + 3 + index}
                    cacheOptions
                    defaultOptions
                    value={days[3].orarItems[index].professor}
                    loadOptions={SearchProfessors}
                    onInputChange={handleInputChange}
                    onChange={(value) => handleProfessorChange(value, 3, index)}
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
                <div className="col">
                  <label className="form-label">Online/Onsite</label>
                  <Select
                    required
                    options={locationOptions}
                    value={days[3].orarItems[index].locationtype}
                    onChange={(e) => handleLocTypeChange(e, 3, index)}
                  ></Select>
                </div>
                {days[3].orarItems[index].locationtype.value == "Online" && (
                  <div className="col">
                    <label className="form-label">Link meet</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Link"
                      required
                      value={days[3].orarItems[index].meetlink}
                      onChange={(e) => handleLinkChange(e, 3, index)}
                    ></input>
                  </div>
                )}
              </div>
              <hr className="mb-4 mt-4"></hr>
            </div>
          ))}
          {days[3].orarItems.length < 6 && (
            <div>
              <button
                className="hover:bg-gray-900 bg-gray-100 text-gray-600 font-semibold hover:text-white py-1.5 px-2 border border-gray-600 hover:border-transparent rounded"
                onClick={() => {
                  handleItemAdd(3);
                }}
                type="button"
              >
                <div className="flex items-center">
                  <BiAddToQueue className="mr-1"></BiAddToQueue>
                  <span>Adauga camp</span>
                </div>
              </button>
            </div>
          )}
          <h3 className="text-base text-gray-800 group-hover:text-white font-bold ">
            Vineri
          </h3>
          {days[4].orarItems.map((obj, index) => (
            <div
              key={index}
              className={isOdd(index) ? "bg-gray-300 px-1" : "px-1"}
            >
              <div className="row mb-3 items-center">
                <div className="col">
                  <label className="form-label">Nume</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nume"
                    required
                    value={days[4].orarItems[index].name}
                    onChange={(e) => handleNameChange(e, 4, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Descriere</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Descriere"
                    required
                    value={days[4].orarItems[index].description}
                    onChange={(e) => handleDescriptionChange(e, 4, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Locatie</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Locatie"
                    required
                    value={days[4].orarItems[index].location}
                    onChange={(e) => handleLocationChange(e, 4, index)}
                  ></input>
                </div>
                <div className="col">
                  <label className="form-label">Tip</label>
                  <Select
                    required
                    options={typeOptions}
                    value={days[4].orarItems[index].type}
                    onChange={(e) => handleTypeChange(e, 4, index)}
                  ></Select>
                </div>
                <div className="col">
                  <label className="form-label">Repetare</label>
                  <Select
                    required
                    options={repeatsOptions}
                    value={days[4].orarItems[index].repeats}
                    onChange={(e) => handleRepeatsChange(e, 4, index)}
                  ></Select>
                </div>

                {days[4].orarItems.length > 1 && (
                  <div className="col">
                    <button
                      className="hover:bg-red-700 bg-red-500 text-white font-semibold py-1.5 px-2 border border-gray-600 hover:border-transparent rounded"
                      onClick={() => handleItemRemove(4, index)}
                      type="button"
                    >
                      <div className="flex items-center">
                        <AiOutlineCloseCircle className="mr-1"></AiOutlineCloseCircle>
                      </div>
                    </button>
                  </div>
                )}
              </div>
              <div className="row mb-3 items-center">
                <div className="col">
                  <label className="form-label">Ora Inceput</label>
                  <TimePicker
                    required
                    className="react-time-picker form-control"
                    onChange={(e) => handleStartChange(e, 4, index)}
                    value={days[4].orarItems[index].startDate}
                    disableClock={true}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Ora Sfarsit</label>
                  <TimePicker
                    required
                    className="react-time-picker form-control"
                    onChange={(e) => handleEndChange(e, 4, index)}
                    value={days[4].orarItems[index].endDate}
                    disableClock={true}
                  />
                </div>
                <div className="col">
                  <label className="form-label" htmlFor="registerPassword">
                    Profesor
                  </label>
                  <AsyncSelect
                    required
                    id={"prof-value-select" + 4 + index}
                    instanceId={"prof-value-select" + 4 + index}
                    cacheOptions
                    defaultOptions
                    value={days[4].orarItems[index].professor}
                    loadOptions={SearchProfessors}
                    onInputChange={handleInputChange}
                    onChange={(value) => handleProfessorChange(value, 4, index)}
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
                <div className="col">
                  <label className="form-label">Online/Onsite</label>
                  <Select
                    required
                    options={locationOptions}
                    value={days[4].orarItems[index].locationtype}
                    onChange={(e) => handleLocTypeChange(e, 4, index)}
                  ></Select>
                </div>
                {days[4].orarItems[index].locationtype.value == "Online" && (
                  <div className="col">
                    <label className="form-label">Link meet</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Link"
                      required
                      value={days[4].orarItems[index].meetlink}
                      onChange={(e) => handleLinkChange(e, 4, index)}
                    ></input>
                  </div>
                )}
              </div>
              <hr className="mb-4 mt-4"></hr>
            </div>
          ))}
          {days[4].orarItems.length < 6 && (
            <div className="mb-4">
              <button
                className="hover:bg-gray-900 bg-gray-100 text-gray-600 font-semibold hover:text-white py-1.5 px-2 border border-gray-600 hover:border-transparent rounded"
                onClick={() => {
                  handleItemAdd(4);
                }}
                type="button"
              >
                <div className="flex items-center">
                  <BiAddToQueue className="mr-1"></BiAddToQueue>
                  <span>Adauga camp</span>
                </div>
              </button>
            </div>
          )}
          <div className="col-auto ">
            <button className="hover:bg-gray-900 bg-gray-100 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
              <AiOutlineSave></AiOutlineSave>
              Salveaza
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTimetableForm;
