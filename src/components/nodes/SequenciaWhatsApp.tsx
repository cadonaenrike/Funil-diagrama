// import { FaFlagCheckered } from "react-icons/fa";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fluxwhatsapp from "../../../public/images/sequenciawhatsapp.png";
import { DropDown } from "../dropdawn/DropDawn";

Modal.setAppElement("#root"); // Defina o elemento raiz do seu aplicativo

interface SequenciaWhatsAppProps {
  id: string;
  onRemove: (nodeId: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SequenciaWhatsApp({ id, onRemove }: SequenciaWhatsAppProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDrowOpen, setDrowOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);
  const navigate = useNavigate();

  const handleNodeClick = () => {
    navigate("/WhatsAppFlux");
    if (!isRemoved) {
      setModalOpen(true);
    }
  };

  const handleNodleClickDelet = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isRemoved) {
      setDrowOpen(!isDrowOpen);
    }
  };

  const handleRemoveFromScreen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsRemoved(true);
    if (onRemove) onRemove(id);
    closeModal();
  };

  const closeModal = () => {
    // Fechar o modal quando necessário
    setModalOpen(false);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSave = () => {
    // Faça algo com os valores do título e opção selecionada
    console.log("Título:", modalTitle);
    console.log("Opção Selecionada:", selectedOption);

    // Alterar o nome da Campanha para a opção escolhida
    setModalTitle(selectedOption);

    // Feche o modal
    closeModal();
  };

  return (
    <>
      {!isRemoved && (
        <div
          className="h-50 p-2 flex flex-col items-center relative"
          onContextMenu={handleNodleClickDelet}
          onClick={handleNodeClick}
        >
          <section className="h-10 w-32 flex  items-center justify-center bg-[#25a366b2] rounded-lg">
            <img
              src={fluxwhatsapp}
              alt="iconefluxwhtasapp"
              className="invert"
              height={10}
              width={100}
            />
          </section>

          <span className="font-bold text-center text-sm">
            {modalTitle || "Senquencia de WhatsApp | 0 Leads"}
          </span>

          <Handle
            id="left"
            position={Position.Left}
            type="target"
            className="left-5 w-3 h-3 top-7"
          />
          <Handle
            id="right"
            position={Position.Right}
            type="source"
            className="right-5 w-3 h-3 top-7"
          />
          <DropDown
            onClickButtonCopy={() => {
              console.log("clicou");
            }}
            onClickButtonExport={() => {
              console.log("clicou");
            }}
            onClickButton={handleRemoveFromScreen}
            isOpen={isDrowOpen}
            toggleDropDown={() => setDrowOpen(false)}
          />
          <div className="flex rounded-lg">
            <span className="bg-[#8D8D0B] h-6 w-10 flex justify-center rounded-l-lg">
              0
            </span>
            <span className="bg-[#087208]  h-6 w-10 flex justify-center">
              0
            </span>
            <span className="bg-[#662115] h-6 w-10 flex justify-center rounded-r-lg">
              0
            </span>
          </div>
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
        <h2 className="text-2xl font-bold mb-4">Campanha</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Escolha uma opção:
          </label>
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="Campanha time marketing">
              Campanha time marketing
            </option>
            <option value="Campanha time desenvolvimento">
              Campanha time desenvolvimento
            </option>
            <option value="Campanha P e D">Campanha P e D</option>
          </select>
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
