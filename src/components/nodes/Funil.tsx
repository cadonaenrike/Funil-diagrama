import { useState } from "react";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import { IoFunnelOutline } from "react-icons/io5";

Modal.setAppElement("#root"); // Defina o elemento raiz do seu aplicativo

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Funnel() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
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

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalDescription(e.target.value);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSave = () => {
    // Faça algo com os valores do título, descrição e opção selecionada
    console.log("Título:", modalTitle);
    console.log("Descrição:", modalDescription);
    console.log("Opção Selecionada:", selectedOption);

    setModalTitle(selectedOption);

    // Feche o modal
    closeModal();
  };

  return (
    <>
      {!isRemoved && (
        <div
          className="h-50 p-2 flex flex-col items-center"
          onClick={handleNodeClick}
        >
          <section className="w-16 h-14 flex items-center justify-center bg-slate-700 rounded-lg">
            <IoFunnelOutline size={32} className="text-white" />
          </section>
          <span className="font-bold text-center">{modalTitle || "Funil"}</span>

          <Handle
            id="right"
            position={Position.Right}
            type="source"
            className="-right-1 w-3 h-3 top-9"
          />
          <Handle
            id="left"
            position={Position.Left}
            type="source"
            className="-left-1 w-3 h-3 top-9"
          />
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
          },
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Funil</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Escolha uma opção:
          </label>
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="Região Sul">Região Sul</option>
            <option value="Região Norte">Região Norte</option>
            <option value="Região Sudeste">Região Sudeste</option>
            <option value="Região Centro-Oeste">Região Centro-Oeste</option>
            <option value="Região Nordeste">Região Nordeste</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Descrição:
          </label>
          <input
            type="text"
            value={modalDescription}
            onChange={handleDescriptionChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Salvar
          </button>
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
