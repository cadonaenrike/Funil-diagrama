/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { TfiTimer } from "react-icons/tfi";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import { DropDown } from "../dropdawn/DropDawn";
import { FaRegCalendar, FaRegClock } from "react-icons/fa";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";
import { RiBarcodeBoxLine } from "react-icons/ri";

Modal.setAppElement("#root");

interface SequenciaTimeProps {
  id: string;
  onRemove: (nodeId: string) => void;
}

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
export function Timer({ id, onRemove }: SequenciaTimeProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isDrowOpen, setDrowOpen] = useState(false);
  const [active, setActive] = useState<number | 0>(0);
  const [isSelected, setSelected] = useState(false);
  const [toggle, setToggle] = useState<ToggleSwitch>(initialToggle);

  const handleNodeClickContext = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isRemoved) {
      // Abrir o modal quando o nó for clicado
      setDrowOpen(!isDrowOpen);
    }
  };

  const handleNodeClick = () => {
    if (!isRemoved) {
      // Abrir o modal quando o nó for clicado
      setModalOpen(!isModalOpen);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSave = () => {
    closeModal();
  };

  const handleRemoveFromScreen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (onRemove) onRemove(id);
    setIsRemoved(true);
    closeModal();
  };

  const handleSelectScreen = (i: number) => {
    setActive((prevI) => (prevI === i ? 0 : i));
    setSelected(!isSelected);
  };

  const handleToggleChange = (toggleName: string) => {
    setToggle((prevToggles: any) => ({
      ...prevToggles,
      [toggleName]: !prevToggles[toggleName],
    }));
  };
  return (
    <>
      {!isRemoved && (
        <div
          className="h-50 p-2 flex flex-col items-center text-white"
          onClick={handleNodeClick}
          onContextMenu={handleNodeClickContext}
        >
          <section className="bg-black rounded-lg w-16 h-14 flex items-center justify-center bg-opacity-90">
            <TfiTimer size={32} className="text-white" />
          </section>

          <span className="font-bold text-center text-white">
            Configurar Timer
          </span>
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
          <Handle
            id="right"
            position={Position.Right}
            type="source"
            className="right-3 w-3 h-3 top-9"
          />
          <Handle
            id="left"
            position={Position.Left}
            type="source"
            className="left-3 w-3 h-3 top-9"
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
        <div className="rounded-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Configurar Timer</h2>
            <section className="flex flex-col w-full">
              <nav className="flex w-full gap-5">
                <ul className="flex  gap-3">
                  <li
                    onClick={() => handleSelectScreen(0)}
                    className={`cursor-pointer text-sm ${
                      active === 0
                        ? "border-b-2 pb-2 border-purple-700 text-purple-700"
                        : ""
                    }`}
                  >
                    Tempo contínuo
                  </li>
                  <li
                    onClick={() => handleSelectScreen(1)}
                    className={`cursor-pointer text-sm ${
                      active === 1
                        ? "border-b-2 pb-2 border-purple-700 text-purple-700"
                        : ""
                    }`}
                  >
                    Data específica
                  </li>
                </ul>
              </nav>
              {active === 0 && (
                <>
                  <section className="bg-[#071318] rounded-lg flex px-3 py-3 gap-3 mt-7 w-full">
                    <div className="bg-cyan-600 rounded-full flex items-end justify-center w-5 h-5">
                      <p className="text-lg font-bold">...</p>
                    </div>
                    <section className="w-full">
                      <h2>Slecionar um tempo de espera?</h2>
                      <span className="text-xs">
                        O lead irá aguardar um determinado tempo para ser
                        liberado pelo timer
                      </span>
                      <section className="flex gap-3 w-full">
                        <input
                          type="text"
                          className="rounded-lg bg-transparent w-1/3"
                        />
                        <select
                          name="tempo"
                          id="tempo"
                          className="rounded-lg w-2/3 bg-transparent appearance-none py-2 pl-4 pr-8 shadow-sm focus:outline-none transition ease-in-out duration-150"
                        >
                          <option value="minutos" className="bg-[#010110]">
                            Minutos
                          </option>
                          <option value="horas" className="bg-[#010110]">
                            Horas
                          </option>
                          <option value="dias" className="bg-[#010110]">
                            Dias
                          </option>
                        </select>
                      </section>
                    </section>
                  </section>

                  <section className="bg-[#071318] rounded-lg flex flex-col px-3 py-3 gap-3 mt-7">
                    <section className="flex gap-3 relative">
                      <FaRegClock className="text-cyan-600 text-xl" />
                      <section>
                        <h2>Agendar data e hora limite?</h2>
                        <span className="text-xs">
                          A etapa vai enviar as mensagens aos leads até uma data
                          e hora determinada.
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
                      <FaRegCalendar className="text-cyan-600 text-xl" />
                      <section>
                        <h2>Determinar um intervalo de tempo?</h2>
                        <span className="text-xs">
                          O timer vai liberar os leads entre os horários de
                          início e fim.
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

                  <section className="bg-[#071318] rounded-lg flex flex-col px-3 py-3 gap-3 mt-7">
                    <section className="flex gap-3 w-full relative">
                      <RiBarcodeBoxLine className="text-cyan-600 text-xl" />
                      <section>
                        <h2>Selecionar os dias da semana específico?</h2>
                        <p className="text-xs w-2/3">
                          Determine quais dias da semana o timer vai ser
                          acionado, por padrão o timer funciona todos os dias.
                        </p>
                      </section>
                      <section className="absolute right-0">
                        <ToggleSwitch
                          toggle={toggle.toggle3}
                          setToggle={() => handleToggleChange("toggle3")}
                        />
                      </section>
                    </section>
                    {toggle.toggle3 && (
                      <section className="flex ml-8 gap-5">
                        <section className="flex flex-col gap-2 text-sm">
                          <section className="flex gap-3 items-center">
                            <input
                              type="checkbox"
                              name="segundaFeira"
                              id="segundaFeira"
                              className="rounded-lg checked:bg-green-600 focus:ring-0 focus:border-0"
                            />
                            <label htmlFor="segundaFeira">Segunda-Feira</label>
                          </section>
                          <section className="flex gap-3 items-center">
                            <input
                              type="checkbox"
                              name="tercaFeira"
                              id="tercaFeira"
                              className="rounded-lg checked:bg-green-600 focus:ring-0 focus:border-0"
                            />
                            <label htmlFor="tercaFeira">Terça-Feira</label>
                          </section>
                          <section className="flex gap-3 items-center">
                            <input
                              type="checkbox"
                              name="quartaFeira"
                              id="quartaFeira"
                              className="rounded-lg checked:bg-green-600 focus:ring-0 focus:border-0"
                            />
                            <label htmlFor="quartaFeira">Quarta-Feira</label>
                          </section>
                          <section className="flex gap-3 items-center">
                            <input
                              type="checkbox"
                              name="quintaFeira"
                              id="quintaFeira"
                              className="rounded-lg checked:bg-green-600 focus:ring-0 focus:border-0"
                            />
                            <label htmlFor="quintaFeira">Quinta-Feira</label>
                          </section>
                          <section className="flex gap-3 items-center">
                            <input
                              type="checkbox"
                              name="sextaFeira"
                              id="sextaFeira"
                              className="rounded-lg checked:bg-green-600 focus:ring-0 focus:border-0"
                            />
                            <label htmlFor="sextaFeira">Sexta-Feira</label>
                          </section>
                          <section className="flex gap-3 items-center">
                            <input
                              type="checkbox"
                              name="sabado"
                              id="sabado"
                              className="rounded-lg checked:bg-green-600 focus:ring-0 focus:border-0"
                            />
                            <label htmlFor="sabado">Sabado</label>
                          </section>
                          <section className="flex gap-3 items-center">
                            <input
                              type="checkbox"
                              name="domingo"
                              id="domingo"
                              className="rounded-lg checked:bg-green-600 focus:ring-0 focus:border-0"
                            />
                            <label htmlFor="domingo">Domingo</label>
                          </section>
                        </section>
                      </section>
                    )}
                  </section>
                </>
              )}
              {active === 1 && (
                <>
                  <section className="bg-[#071318] rounded-lg flex px-3 py-3 gap-3 mt-7">
                    <FaRegCalendar className="text-cyan-600 text-xl" />

                    <section>
                      <h2>Agendar a liberação para um momento específico?</h2>
                      <span className="text-xs">
                        O timer vai liberar os leads apenas na data e hora
                        determinada.
                      </span>
                      <section className="flex gap-3 w-full">
                        <input
                          type="datetime-local"
                          name=""
                          id=""
                          className="bg-transparent w-full rounded-lg"
                        />
                      </section>
                    </section>
                  </section>

                  <section className="bg-[#071318] rounded-lg flex flex-col px-3 py-3 gap-3 mt-7">
                    <section className="flex gap-3 w-full relative">
                      <FaRegClock className="text-cyan-600 text-xl" />
                      <section>
                        <h2>Agendar data e hora limite?</h2>
                        <p className="text-xs w-3/4">
                          A etapa vai enviar as mensagens aos leads até uma data
                          e hora determinada.
                        </p>
                      </section>
                      <section className="absolute right-0">
                        <ToggleSwitch
                          toggle={toggle.toggle4}
                          setToggle={() => handleToggleChange("toggle4")}
                        />
                      </section>
                    </section>
                    {toggle.toggle4 && (
                      <section className="flex ml-8 flex-col">
                        <input
                          type="datetime-local"
                          className="bg-transparent rounded-lg w-full"
                        />
                        <span className="text-sm">Horário de Brasília:</span>
                      </section>
                    )}
                  </section>

                  <section className="bg-[#071318] rounded-lg flex flex-col px-3 py-3 gap-3 mt-7">
                    <section className="flex gap-3 w-full relative">
                      <FaRegCalendar className="text-cyan-600 text-xl" />
                      <section>
                        <h2>Determinar um intervalo de tempo?</h2>
                        <span className="text-xs">
                          O timer vai liberar os leads entre os horários de
                          início e fim.
                        </span>
                      </section>
                      <section className="absolute right-0">
                        <ToggleSwitch
                          toggle={toggle.toggle5}
                          setToggle={() => handleToggleChange("toggle5")}
                        />
                      </section>
                    </section>
                    {toggle.toggle5 && (
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
                </>
              )}
            </section>
            <div className="flex mt-4 justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#046A04] text-white rounded-md hover:bg-[#379233] focus:outline-none focus:ring focus:border-blue-300 mr-2"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
