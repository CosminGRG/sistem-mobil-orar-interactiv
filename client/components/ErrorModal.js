import { Dialog } from "@headlessui/react";

import { BiCheck } from "react-icons/bi";

function ErrorModal(props) {
  return (
    <Dialog
      open={props.errorModalOpen}
      onClose={() => props.setErrorModalOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-md px-4 py-4">
          <Dialog.Title className="text-red-600">Eroare</Dialog.Title>
          <Dialog.Description className="text-gray-500 mb-2">
            {props.message}
          </Dialog.Description>
          <div className="flex space-x-4">
            <button
              className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-1 px-2 border border-gray-600 hover:border-transparent rounded"
              onClick={() => props.setErrorModalOpen(false)}
            >
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

export default ErrorModal;
