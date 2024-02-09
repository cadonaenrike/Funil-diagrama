/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { FaPlusCircle, FaRegClock, FaWhatsapp } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import { IoIosInformationCircleOutline } from "react-icons/io";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";

Modal.setAppElement("#root");

interface ToggleSwitch {
  toggle1: boolean;
  toggle2: boolean;
  toggle3: boolean;
  toggle4: boolean;
  toggle5: boolean;
}

const initialToggle = {
  toggle1: false,
  toggle2: false,
  toggle3: false,
  toggle4: false,
  toggle5: false,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function WhatsApp() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [attachment, setAttachment] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);
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

  const handleOtherClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("teste");
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

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachment(e.target.value);
  };

  const handleSend = () => {
    console.log("Anexo:", attachment);

    closeModal();
  };

  const handleRemoveFromScreen = () => {
    setIsRemoved(true);
    closeModal();
  };

  return (
    <>
      {!isRemoved && (
        <div
          className="h-50 p-2 flex flex-col items-center text-white"
          onClick={handleNodeClick}
          onAuxClick={handleOtherClick}
        >
          <section className="bg-green-600 rounded-lg w-16 flex items-center h-14 justify-center">
            <FaWhatsapp size={32} className="text-white" />
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
          <span className="font-bold text-center">WhatsApp</span>
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
          },
        }}
      >
        <h2 className="text-2xl font-bold mb-2">Configurar WhatsApp</h2>
        <div className="bg-[#071318] p-4 rounded-lg flex gap-3">
          <IoIosInformationCircleOutline size={28} className="text-[#2293C7]" />
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

        <section className="flex flex-col">
          <p>Mensagem</p>
          <div className="w-full flex items-center justify-center border py-9 rounded-lg">
            <button className="border bg-transparent rounded-md flex px-7 items-center py-1 gap-2 text-sm">
              <FaPlusCircle className="" /> Adicionar bloco
            </button>
          </div>
        </section>

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

        <section className="bg-[#071318] rounded-lg flex flex-col px-3 py-3 gap-3 mt-7">
          <section className="flex gap-3 w-full relative">
            <BsThreeDots className="text-cyan-600 text-xl" />
            <section>
              <h2>Agendar um intervalo de tempo?</h2>
              <span className="text-xs">
                A etapa vai enviar as mensagens aos leads somente no intervalo
                de tempo definido abaixo.
              </span>
            </section>
            <section className="absolute right-0">
              <ToggleSwitch
                toggle={toggle.toggle2}
                setToggle={() => handleToggleChange("toggle2")}
              />
            </section>
          </section>
          {toggle.toggle2 && (
            <section className="flex ml-8 gap-5">
              <section className="flex flex-col">
                <label htmlFor="inicia" className="text-base">
                  Inicar às:
                </label>
                <input
                  type="time"
                  name="inicia"
                  className="bg-transparent rounded-lg"
                />
              </section>
              <section className="flex flex-col">
                <label htmlFor="termina" className="text-base">
                  Terminar às:
                </label>
                <input
                  type="time"
                  name="termina"
                  className="bg-transparent rounded-lg"
                />
              </section>
            </section>
          )}
        </section>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Anexar arquivo:
          </label>
          <input
            type="file"
            value={attachment}
            onChange={handleAttachmentChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Enviar
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
