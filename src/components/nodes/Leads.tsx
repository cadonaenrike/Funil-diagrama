/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import { FaUsers } from "react-icons/fa";

Modal.setAppElement("#root");

export function Create() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [leadsCount] = useState(0);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleNodeClick = () => {
    if (!isRemoved) {
      // Abrir o modal quando o nó for clicado
      setModalOpen(true);
    }
  };

  const handleRemoveFromScreen = () => {
    setIsRemoved(true);
    closeModal();
  };

  const closeModal = () => {
    // Fechar o modal quando necessário
    setModalOpen(false);
  };

  return (
    <>
      {!isRemoved && (
        <div
          className="h-50 p-2 rounded flex flex-col"
          onClick={handleNodeClick}
        >
          <section className="bg-amber-800 rounded-br-3xl rounded-tl-3xl h-14 w-16 flex items-center justify-center">
            <FaUsers size={32} className="text-white" />
          </section>

          <section>
            <Handle
              id="right"
              position={Position.Right}
              type="source"
              className="-right-1.5 w-3 h-3 top-9"
            />
          </section>
          <span className="font-bold text-center">Leads</span>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            background: "#fff",
            padding: "20px",
            maxWidth: "400px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            overflow: "auto",
          },
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Leads</h2>
        <p className="text-lg font-semibold mb-4">
          Número de Leads: {leadsCount} leads
        </p>

        <div className="flex space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-500"
          >
            Fechar
          </button>
          <button
            onClick={handleRemoveFromScreen}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          >
            Remover da Tela
          </button>
        </div>
      </Modal>
    </>
  );
}
