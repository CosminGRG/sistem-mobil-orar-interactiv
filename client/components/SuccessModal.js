import Link from "next/link";

import { Dialog } from "@headlessui/react";

import { BiArrowBack, BiCheck } from "react-icons/bi";
import { ImSpinner8 } from "react-icons/im";

function SuccessModal(props) {
  return (
    <Dialog
      open={props.successModalOpen}
      onClose={() => props.setSuccessModalOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-md px-4 py-4">
          <Dialog.Title className="text-green-600">Succes</Dialog.Title>
          <Dialog.Description className="text-gray-500 mb-2">
            {props.message}
          </Dialog.Description>
          <div className="flex space-x-4">
            <Link href={"/"}>
              <button
                className=" hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-1 px-2 border border-gray-600 hover:border-transparent rounded"
                onClick={() => props.setSuccessModalOpen(false)}
              >
                <div className="flex items-center">
                  <BiArrowBack></BiArrowBack>
                  <span>Mergi la lista</span>
                </div>
              </button>
            </Link>
            <button
              className=" hover:bg-green-400 text-gray-600 font-semibold hover:text-white py-1 px-2 border border-gray-600 hover:border-transparent rounded"
              onClick={() => props.setSuccessModalOpen(false)}
            >
              {/* <ImSpinner8 className="animate-spin"></ImSpinner8> */}
              <div className="flex items-center">
                <BiCheck></BiCheck>
                <span>Ok</span>
              </div>
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default SuccessModal;
