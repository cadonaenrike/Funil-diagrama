import { useState } from "react";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import sucesso from "../../../public/images/Check.svg";
import {
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaRegClock,
} from "react-icons/fa";

Modal.setAppElement("#root"); // Defina o elemento raiz do seu aplicativo

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Sucesso() {
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
            <img src={sucesso} width={32} height={32} className="text-white" />
          </section>
          <span className="font-bold text-center">
            {modalTitle || "Sucesso"}
          </span>

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
        <h2 className="text-2xl font-bold mb-4">Sucesso</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            A etapa Sucessos filtra para dar continuidade no fluxo apenas os
            leads que obtiveram o status de sucesso na etapa anterior.
          </label>
        </div>
        <div className="mb-4 flex justify-center gap-9">
          <FaPhone className="rotate-90" />
          <FaArrowRight />
          <FaCheckCircle className="text-blue-600" />
          <FaArrowRight />
          <FaEnvelope />
        </div>
        <div className="bg-blue-300 rounded-md flex gap-2 px-1 py-3 mb-4">
          <FaRegClock size={25} className="text-blue-800" />
          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold">
              Agendar data e hora limite?
            </h2>
            <p className="text-xs ">
              A etapa vai enviar as mensagens aos leads até uma data e hora
              determinada.
            </p>
          </section>
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
          />
        </div>
        <div className="flex space-x-4 justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Salvar
          </button>
        </div>
      </Modal>
    </>
  );
}
