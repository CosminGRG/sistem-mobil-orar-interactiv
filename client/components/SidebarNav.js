import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineSettings,
  MdOutlineLogout,
  MdGroups,
} from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SideNavbar() {
  const router = useRouter();

  function logout() {
    console.log("APASAT");
    localStorage.removeItem("token");

    router.push({
      pathname: "/login",
      query: { returnUrl: router.asPath },
    });
  }

  return (
    <div>
      {/* className="fixed z-50" */}
      <Disclosure as="nav">
        <Disclosure.Button className="fixed right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen shadow-md bg-white z-20 flex flex-col justify-between top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <Link href={"/"}>
              <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
                Panou administrare
              </h1>
            </Link>
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href={"/"}>
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Tablou de bord
                  </h3>
                </Link>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <AiOutlineUser className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href={"/users"}>
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Utilizatori
                  </h3>
                </Link>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdGroups className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href={"/groups"}>
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Grupe
                  </h3>
                </Link>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href={"/timetables"}>
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Orare
                  </h3>
                </Link>
              </div>
            </div>
            {/* setting  */}
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Settings
                </h3>
              </div>
            </div>
            {/* logout */}
            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <button onClick={() => logout()}>
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Logout
                  </h3>
                </button>
              </div>
            </div>
          </div>
          <div className="text-center bottom-0 w-full">
            <hr className="m-0" />
            <p className="py-2 text-sm text-gray-400">
              Sistem mobile pentru orar interactiv. Grigore Cosmin - ACE 2022
            </p>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
