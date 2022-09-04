import Link from "next/link";

import { Dialog } from "@headlessui/react";

import { BiArrowBack, BiCheck } from "react-icons/bi";
import { ImSpinner8 } from "react-icons/im";
import { AiOutlineDelete, AiOutlineCloseCircle } from "react-icons/ai";

function GenericDeleteModal(props) {
  return (
    <Dialog
      open={props.deleteModalOpen}
      onClose={() => props.setDeleteModalOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-md px-4 py-4">
          <Dialog.Title className="text-grey-600">Atentie!</Dialog.Title>
          <Dialog.Description className="text-gray-500 mb-2">
            {props.message}
          </Dialog.Description>
          <div className="flex space-x-4">
            <button
              className=" hover:bg-red-600 text-gray-600 font-semibold hover:text-white py-1 px-2 border border-gray-600 hover:border-transparent rounded"
              onClick={() => {
                props.setDeleteModalOpen(false);
                if (props.actiune !== null) {
                  props.action();
                }
              }}
            >
              <div className="flex items-center">
                <AiOutlineDelete></AiOutlineDelete>
                <span>Sterge</span>
              </div>
            </button>
            <button
              className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-1 px-2 border border-gray-600 hover:border-transparent rounded"
              onClick={() => props.setDeleteModalOpen(false)}
            >
              <div className="flex items-center">
                <AiOutlineCloseCircle></AiOutlineCloseCircle>
                <span>Anuleaza</span>
              </div>
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default GenericDeleteModal;
