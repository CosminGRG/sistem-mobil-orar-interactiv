import React, { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import API from "../../api/WebService";

import Link from "next/link";

import GenericDeleteModal from "../../components/GenericDeleteModal";
import ErrorModal from "../../components/ErrorModal";

import { FiChevronDown } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function GroupsPage() {
  const [groupData, setGroupData] = useState([{}]);

  const [groupId, setGroupId] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  useEffect(() => {
    setDeleteMessage("Esti sigur ca vrei sa stergi grupa?");
    API.get("/groups")
      .then((response) => {
        setGroupData(response.data);
      })
      .catch((error) => {
        setErrorMessage(
          "Oops! Ceva nu a mers bine. Incearca din nou sau contacteaza suport"
        );
        setErrorModalOpen(true);
      });
  }, []);

  const onDeleteConfirm = () => {
    API.delete(`/group/${groupId}`)
      .then((response) => {
        //setDeleteMessage("Grupa a fost stearsa");
        //setDeleteModalOpen(true);
      })
      .catch((error) => {
        setErrorMessage(
          "Oops! Ceva nu a mers bine. Incearca din nou sau contacteaza suport"
        );
        setErrorModalOpen(true);
      });
  };

  return (
    <div className="w-2/4 m-auto">
      <div>
        <ErrorModal
          message={errorMessage}
          setErrorModalOpen={setErrorModalOpen}
          errorModalOpen={errorModalOpen}
        ></ErrorModal>
        <GenericDeleteModal
          message={deleteMessage}
          setDeleteModalOpen={setDeleteModalOpen}
          deleteModalOpen={deleteModalOpen}
          action={onDeleteConfirm}
        ></GenericDeleteModal>
        <Link href={"/groups/new"}>
          <button className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded mb-4">
            <AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>
            Adauga grupa nou
          </button>
        </Link>
      </div>
      <div className="card-header font-semibold bg-gray-900 text-white">
        <h4>Lista grupe</h4>
      </div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nume</th>
            <th scope="col">Descriere</th>
            <th scope="col">Orar Tag</th>
            <th scope="col">Administreaza</th>
          </tr>
        </thead>
        <tbody>
          <>
            {groupData.map((object, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{object.name}</td>
                <td>{object.description}</td>
                <td>{object.orar?.shorttag ? object.orar?.shorttag : "?"}</td>
                <td>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                        Optiuni
                        <FiChevronDown
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="z-20 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                        <div className="py-1">
                          <Link href={`/groups/edit/` + object._id}>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Editeaza
                                </a>
                              )}
                            </Menu.Item>
                          </Link>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Detalii
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-red-600",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() => {
                                  setGroupId(object._id);
                                  setDeleteModalOpen(true);
                                }}
                              >
                                Sterge
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item disabled">
            <a
              className="page-link hover:bg-gray-900 text-gray-600 font-semibold hover:text-white"
              href="#"
              aria-disabled="true"
            >
              Previous
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link hover:bg-gray-900 text-gray-600 font-semibold hover:text-white"
              href="#"
            >
              1
            </a>
          </li>
          <li className="page-item active" aria-current="page">
            <a
              className="page-link hover:bg-gray-900 text-gray-600 font-semibold hover:text-white"
              href="#"
            >
              2
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link hover:bg-gray-900 text-gray-600 font-semibold hover:text-white"
              href="#"
            >
              3
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link hover:bg-gray-900 text-gray-600 font-semibold hover:text-white"
              href="#"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default GroupsPage;
