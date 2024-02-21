import { useState } from "react";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import lidos from "../../../public/images/openMail.svg";
import {
  FaArrowRight,
  FaEnvelope,
  FaEnvelopeOpen,
  FaRegClock,
  FaInbox,
} from "react-icons/fa6";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";
import { DropDown } from "../dropdawn/DropDawn";

Modal.setAppElement("#root");

interface SequenciaTimeProps {
  id: string;
  onRemove: (nodeId: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Lidos({ id, onRemove }: SequenciaTimeProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDropdown, setDropdown] = useState(false);

  const handleRemoveFromScreen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsRemoved(true);
    if (onRemove) onRemove(id);
    closeModal();
  };

  const handleAutoNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalTitle(e.target.value);
  };

  const handleNodeClickContext = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isRemoved) {
      // Abrir o modal quando o nó for clicado
      setDropdown(!isDropdown);
    }
  };

  const handleNodeClick = () => {
    if (!isRemoved) {
      // Abrir o modal quando o nó for clicado
      setModalOpen(true);
    }
  };

  const handleItemClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const closeModal = () => {
    // Fechar o modal quando necessário
    setModalOpen(false);
  };

  const removerNome = () => {
    setModalTitle("");
    handleItemClick(1);
  };

  const handleSave = () => {
    // Faça algo com os valores do título, descrição e opção selecionada
    console.log("Título:", modalTitle);

    // Feche o modal
    closeModal();
  };

  return (
    <>
      {!isRemoved && (
        <div
          className="h-50 p-2 flex flex-col items-center text-white"
          onClick={handleNodeClick}
          onContextMenu={handleNodeClickContext}
        >
          <section className="w-16 h-14 flex items-center justify-center bg-[#472509] rounded-lg">
            <img src={lidos} width={32} height={32} className="text-white" />
          </section>
          <span className="font-bold text-center">{modalTitle || "Lidos"}</span>
          <DropDown
            onClickButtonCopy={() => {
              console.log("clicou");
            }}
            onClickButtonExport={() => {
              console.log("clicou");
            }}
            onClickButton={handleRemoveFromScreen}
            isOpen={isDropdown}
            toggleDropDown={() => setDropdown(false)}
          />
          <Handle
            id="right"
            position={Position.Right}
            type="source"
            className="-right-3 w-3 h-3 top-9"
          />
          <Handle
            id="left"
            position={Position.Left}
            type="source"
            className="-left-3 w-3 h-3 top-9"
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
            border: "none",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            background: "#000000",
            padding: "20px",
            maxWidth: "700px",
            color: "#FFFFFF",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.767)",
            overflow: "auto",
          },
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Lidos</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            A etapa Lidos filtra para dar continuidade no fluxo apenas os leads
            que abriram a etapa de E-mail anterior, podendo ocorrer uma demora
            de alguns minutos para identificar a abertura.
          </label>
        </div>
        <div className="mb-4 flex justify-center gap-9 text-lg">
          <FaEnvelope />
          <FaArrowRight />
          <FaInbox />
          <FaArrowRight />
          <FaEnvelopeOpen className="text-purple-800" />
        </div>
        <div className="bg-[#071318] rounded-md flex gap-2 flex-col px-1 py-3 mb-4">
          <section className="flex gap-3 relative">
            <FaRegClock size={25} className="text-cyan-700" />
            <section className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold">
                Agendar data e hora limite?
              </h2>
              <p className="text-xs ">
                A etapa vai enviar as mensagens aos leads até uma data e hora
                determinada.
              </p>
            </section>
            <div className="absolute right-3">
              <ToggleSwitch toggle={toggle} setToggle={setToggle} />
            </div>
          </section>
          {toggle && (
            <div className="flex flex-col ml-9 mr-3">
              <input
                type="datetime-local"
                className="bg-transparent rounded-lg"
              />
              <span className="text-sm">Horario de Brasilia:</span>
            </div>
          )}
        </div>

        <div className="w-full bg-[#1F1F1F] rounded-lg mb-10">
          <div className="rounded-lg">
            <div className="rounded-lg">
              <button
                className="w-full text-left px-4 py-2 bg-[#1F1F1F] rounded-lg focus:outline-none"
                onClick={() => handleItemClick(1)}
              >
                Configurações avançadas
              </button>
              {activeIndex === 1 && (
                <div className="px-4 py-2">
                  <h2>Nome da Automoção</h2>
                  <span className="text-sm">
                    O campo abaixo se refere ao nome da automoção sucesso
                  </span>
                  <input
                    type="text"
                    className="bg-transparent rounded-lg w-full mb-3"
                    value={modalTitle}
                    onChange={handleAutoNameChange}
                  />
                  <button
                    className="bg-[#D20606] w-full py-2 rounded-md"
                    onClick={removerNome}
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-4 justify-end">
          <button
            onClick={handleSave}
            className="px-7 py-1 bg-[#046A04] text-white rounded-md hover:bg-[#379233] focus:outline-none focus:ring focus:border-blue-300 mr-2"
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
}
