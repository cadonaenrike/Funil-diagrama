/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import { IoIosInformationCircleOutline } from "react-icons/io";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";
import { DropDown } from "../dropdawn/DropDawn";
import email from "../../../public/images/email.svg";

Modal.setAppElement("#root");

interface ToggleSwitch {
  toggle1: boolean;
  toggle2: boolean;
  toggle3: boolean;
  toggle4: boolean;
  toggle5: boolean;
}

const emailOption = [
  { id: "1", email: "test@example.com" },
  { id: "2", email: "test2@example.com" },
];

const initialToggle = {
  toggle1: false,
  toggle2: false,
  toggle3: false,
  toggle4: false,
  toggle5: false,
};

interface EmailMarketingProps {
  id: string;
  onRemove: (nodeId: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EmailMarketing({ id, onRemove }: EmailMarketingProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isDropdown, setDropdown] = useState(false);
  const textoCopiar = useRef<HTMLParagraphElement>(null);
  const [toggle, setToggle] = useState<ToggleSwitch>(initialToggle);

  const handleNodeClick = () => {
    if (!isRemoved) {
      setModalOpen(true);
    }
  };

  const copyText = (texto: string) => {
    navigator.clipboard
      .writeText(texto)
      .then(() => {
        console.log("Texto copiado", texto);
      })
      .catch((error) => {
        console.error("Erro ao copiar", error);
      });
  };

  const handleNomeClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const texto = e.currentTarget.textContent || "";
    copyText(texto);
  };

  const handleOtherClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isRemoved) {
      // Abrir o modal quando o nó for clicado
      setDropdown(!isDropdown);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleToggleChange = (toggleName: string) => {
    setToggle((prevToggles: any) => ({
      ...prevToggles,
      [toggleName]: !prevToggles[toggleName],
    }));
  };

  const handleSend = () => {
    closeModal();
  };

  const handleRemoveFromScreen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsRemoved(true);
    if (onRemove) onRemove(id);
    closeModal();
  };

  return (
    <>
      {!isRemoved && (
        <div
          className="h-50 p-2 flex flex-col items-center text-white"
          onClick={handleNodeClick}
          onContextMenu={handleOtherClick}
        >
          <section className="bg-[#5a3115] rounded-lg w-16 flex items-center h-14 justify-center">
            <img src={email} width={32} height={32} className="text-white" />
          </section>
          <section>
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
          </section>
          <span className="font-bold text-center">Email Marketing</span>
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
        <h2 className="text-2xl font-bold mb-2">Configurar E-mail Marketing</h2>

        <section className="flex flex-col">
          <p className="text-lg font-bold">Caixa Postal</p>
          <span className="text-sm text-gray-600 font-normal">
            O campo abaixo será responsável pelo endereço da caixa postal que
            irá enviar o e-mail para os leads. O domínio precisa estar
            ativo/verificado para que você possa escolher as caixas postais para
            envio
          </span>

          <select
            name="email"
            id="email"
            className="rounded-md bg-transparent my-4"
          >
            {emailOption.map((tag) => (
              <option
                style={{ background: "black" }}
                key={tag.id}
                value={tag.email}
              >
                {tag.email}
              </option>
            ))}
          </select>

          <p className="text-lg font-bold">Assunto do e-mail</p>
          <span className="text-sm text-gray-600 font-normal">
            O campo abaixo se refere ao assunto do e-mail que o lead receberá no
            seu e-mail.
          </span>
          <input
            type="text"
            placeholder="Assunto do e-mail"
            className="rounded-md bg-transparent mb-5"
          />

          <div className="bg-[#071318] p-4 rounded-lg flex gap-3">
            <IoIosInformationCircleOutline
              size={28}
              className="text-[#2293C7]"
            />
            <section>
              <h2>Escritas Automáticas</h2>
              <p className="text-sm mb-4">
                Em sua mensagem você pode utilizar as seguintes escritas
                automáticas, para utilizar as informações dos leads com
                preenchimento automático.
                <br />
                <span
                  className="bg-[#2F393D] px-2 py-1 rounded-xl cursor-pointer"
                  ref={textoCopiar}
                  onClick={handleNomeClick}
                >
                  &#123;&#123;nome&#125;&#125;
                </span>
                <span
                  className="bg-[#2F393D] px-2 py-1 rounded-xl cursor-pointer"
                  ref={textoCopiar}
                  onClick={handleNomeClick}
                >
                  &#123;&#123;pix&#125;&#125;
                </span>
                <span
                  className="bg-[#2F393D] px-2 py-1 rounded-xl cursor-pointer"
                  ref={textoCopiar}
                  onClick={handleNomeClick}
                >
                  &#123;&#123;boleto&#125;&#125;
                </span>
                <span
                  className="bg-[#2F393D] px-2 py-1 rounded-xl cursor-pointer"
                  ref={textoCopiar}
                  onClick={handleNomeClick}
                >
                  &#123;&#123;telefone&#125;&#125;
                </span>
                <span
                  className="bg-[#2F393D] px-2 py-1 rounded-xl cursor-pointer"
                  ref={textoCopiar}
                  onClick={handleNomeClick}
                >
                  &#123;&#123;email&#125;&#125;
                </span>
                <span
                  className="bg-[#2F393D] px-2 py-1 rounded-xl cursor-pointer"
                  ref={textoCopiar}
                  onClick={handleNomeClick}
                >
                  &#123;&#123;primero_nome&#125;&#125;
                </span>
                <span
                  className="bg-[#2F393D] px-2 py-1 rounded-xl cursor-pointer"
                  ref={textoCopiar}
                  onClick={handleNomeClick}
                >
                  &#123;&#123;rastreamento&#125;&#125;
                </span>
              </p>
            </section>
          </div>
        </section>

        <button className="bg-[#625cf3] w-full py-2 rounded-lg mt-5 font-bold hover:bg-[#6a65f7]">
          CLIQUE AQUI PARA EDITAR SEU E-MAIL
        </button>

        <section className="bg-[#071318] rounded-lg flex flex-col px-3 py-3 gap-3 mt-7">
          <section className="flex gap-3 relative">
            <FaRegClock className="text-cyan-600 text-xl" />
            <section>
              <h2>Agendar data e hora limite?</h2>
              <span className="text-xs">
                A etapa vai enviar as mensagens aos leads até uma data e hora
                determinada.
              </span>
            </section>
            <section className="absolute right-0">
              <ToggleSwitch
                toggle={toggle.toggle1}
                setToggle={() => handleToggleChange("toggle1")}
              />
            </section>
          </section>
          {toggle.toggle1 && (
            <input
              type="datetime-local"
              className="bg-transparent rounded-lg"
            />
          )}
        </section>

        <div className="flex space-x-4 mt-4 justify-end">
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-[#046a04] text-white rounded-md hover:bg-[#379737] focus:outline-none focus:ring focus:border-blue-300"
          >
            Salvar
          </button>
        </div>
      </Modal>
    </>
  );
}
