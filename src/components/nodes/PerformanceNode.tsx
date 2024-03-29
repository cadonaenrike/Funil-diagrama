/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { FaPlusCircle, FaRegClock } from "react-icons/fa";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import { IoIosInformationCircleOutline } from "react-icons/io";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";
import { DropDown } from "../dropdawn/DropDawn";
import email from "../../../public/images/email.svg";
import { MdRoomPreferences } from "react-icons/md";
import { FaX } from "react-icons/fa6";
import { Arquivos } from "../blocos/Arquivos";
import { DropDownBloco } from "../dropdawn/DropDawnBloco";
import { Botao } from "../blocos/Botao";

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

const typeDominio = [
  {
    id: "1",
    dominio: "dominio.online",
    tipo: "site",
    email: "E-mail 10/900.000",
  },
  {
    id: "2",
    dominio: "dominio2.online",
    tipo: "site",
    email: "E-mail 150.000/900.000",
  },
  { id: "3", dominio: "dominio.offline", tipo: "site", email: "email" },
  { id: "4", dominio: "dominio2.offline", tipo: "site", email: "email" },
];

const initialToggle = {
  toggle1: false,
  toggle2: false,
  toggle3: false,
  toggle4: false,
  toggle5: false,
};

interface PerformanceProps {
  id: string;
  onRemove: (nodeId: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PerformanceNode({ id, onRemove }: PerformanceProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenDominio, setModalOpenDominio] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isDropdown, setDropdown] = useState(false);
  const [isBlock, setIsBlock] = useState<JSX.Element[]>([]);
  const [drop, setDrop] = useState(false);
  const textoCopiar = useRef<HTMLParagraphElement>(null);
  const [toggle, setToggle] = useState<ToggleSwitch>(initialToggle);

  const handleAddButton = () => {
    setIsBlock((prevBlocks) => [
      ...prevBlocks,
      <Botao label={""} backgroundColor={""} />,
    ]);
  };

  const handleAddArquivo = () => {
    setIsBlock((prevBlocks) => [
      ...prevBlocks,
      <Arquivos
        index={prevBlocks.length}
        moveBlock={moveBlock}
        blocksLength={prevBlocks.length}
      />,
    ]);
    setDrop(!drop);
  };

  const handleAddBlock = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setDrop(!drop);
  };

  const moveBlock = (direction: "up" | "down", index: number) => {
    setIsBlock((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index + (direction === "up" ? -1 : 1)];
      newBlocks[index + (direction === "up" ? -1 : 1)] = temp;
      return newBlocks;
    });
  };

  const handleNodeClick = () => {
    if (!isRemoved) {
      setModalOpen(true);
    }
  };

  const handleDominio = () => {
    setModalOpenDominio(!isModalOpenDominio);
  };

  const closeDominio = () => {
    setModalOpenDominio(!isModalOpenDominio);
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
          <section className="bg-[#9a633b] rounded-lg w-16 flex items-center h-14 justify-center">
            <img src={email} width={32} height={32} className="text-white" />
          </section>
          <section>
            <Handle
              id="right"
              position={Position.Right}
              type="source"
              className="right-5 w-3 h-3 top-9"
            />
            <Handle
              id="left"
              position={Position.Left}
              type="source"
              className="left-5 w-3 h-3 top-9"
            />
          </section>
          <span className="font-bold text-center">Email Performance</span>
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
        <h2 className="text-2xl font-bold mb-2">
          Configurar E-mail Performance
        </h2>

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

          <button
            onClick={handleDominio}
            className="bg-[#625cf3] flex items-center justify-center gap-2 w-full py-2 rounded-lg mb-5 font-bold hover:bg-[#6a65f7]"
          >
            <MdRoomPreferences size={19} /> GERENCIAR CAIXAS POSTAIS
          </button>

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

          <section className="flex flex-col">
            <p>Mensagem</p>
            <div className="w-full flex flex-col gap-2 items-center justify-center border py-9 rounded-lg">
              {isBlock.map((block, index) => (
                <div
                  className="w-full flex justify-center items-center flex-col"
                  key={index}
                >
                  {block}
                </div>
              ))}
              <button
                onClick={handleAddBlock}
                className="border bg-transparent rounded-md flex px-7 items-center py-1 gap-2 text-sm"
              >
                <FaPlusCircle className="" /> Adicionar bloco
              </button>
            </div>
            <DropDownBloco
              isOpen={drop}
              onClickButtonText={handleAddButton}
              onClickButtonArchiver={handleAddArquivo}
              toggleDropDown={() => setDrop(false)}
            />
          </section>
        </section>

        {/* <button className="bg-[#625cf3] w-full py-2 rounded-lg mt-5 font-bold hover:bg-[#6a65f7]">
          CLIQUE AQUI PARA EDITAR SEU E-MAIL
        </button> */}

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

      {/* Modal dominios de email(caixa-postal) */}
      <Modal
        isOpen={isModalOpenDominio}
        onRequestClose={closeDominio}
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
        <div className="w-[440px] rounded-lg">
          <section className="flex items-center justify-between">
            <h2>Selecione um domínio</h2>{" "}
            <FaX
              onClick={closeDominio}
              className="cursor-pointer hover:bg-gray-800 hover:border-gray-800 hover:border-2 rounded-full"
            />
          </section>
          <section className="flex flex-wrap gap-4 mt-5">
            {typeDominio.map((d) => (
              <section
                key={d.id}
                className="flex flex-col border rounded-md w-[200px] p-2 cursor-pointer hover:bg-[#262626]"
              >
                <p>{d.dominio}</p>
                <section className="flex items-center gap-2 ">
                  <span
                    className={`text-xs rounded-md px-1 ${
                      d.email === "email" ? "bg-gray-600" : "bg-[#b04b1d]"
                    }`}
                  >
                    {d.email}
                  </span>
                  <span className="text-xs bg-gray-600 rounded-md px-1">
                    {d.tipo}
                  </span>
                </section>
              </section>
            ))}
          </section>
        </div>
      </Modal>

      {/* Modal caixas postais*/}

      <Modal
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
      ></Modal>

      {/* MOdal nova caixa postal */}

      <Modal
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
      ></Modal>
    </>
  );
}
