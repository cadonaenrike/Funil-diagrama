import { useState } from "react";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import aquecimento from "../../../public/images/aquecimento.svg";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";
import { RiBarcodeBoxLine } from "react-icons/ri";
import { FaRegCalendar } from "react-icons/fa";

Modal.setAppElement("#root"); // Defina o elemento raiz do seu aplicativo

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
export function Aquecimento() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);
  const [toggle, setToggle] = useState<ToggleSwitch>(initialToggle);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAutoNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalTitle(e.target.value);
  };

  const handleToggleChange = (toggleName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setToggle((prevToggles: any) => ({
      ...prevToggles,
      [toggleName]: !prevToggles[toggleName],
    }));
  };

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

  const handleSave = () => {
    // Faça algo com os valores do título, descrição e opção selecionada
    console.log("Título:", modalTitle);
    console.log("Descrição:", modalDescription);

    setModalTitle("");

    // Feche o modal
    closeModal();
  };

  const removerNome = () => {
    setModalTitle("");
    handleItemClick(1);
  };

  return (
    <>
      {!isRemoved && (
        <div
          className="h-50 p-2 flex flex-col items-center text-white "
          onClick={handleNodeClick}
        >
          <section className="w-16 h-14 flex items-center justify-center bg-slate-700 rounded-lg bg-[#6F2C38] opacity-90">
            <img src={aquecimento} width={32} height={32} />
          </section>
          <span className="font-bold text-center">
            {modalTitle || "Aquecimento"}
          </span>

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
          },
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Aquecimento</h2>
        <div className="mb-4">
          <p>
            A etapa Aquecimento serve para limitar a quantidade de leads que
            passará para a próxima etapa a cada 1 minuto. Número máximo de
            liberações por minuto é 300 leads.
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-base font-medium text-white">
            Liberações por minutos
          </label>
          <span className="text-xs">
            A quantidade de leads que serão liberados por minuto para a próxima
            etapa
          </span>
          <input
            type="number"
            min={1}
            max={300}
            value={modalDescription}
            onChange={handleDescriptionChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-transparent"
          />

          <section className="bg-[#071318] rounded-lg flex flex-col px-3 py-3 gap-3 mt-7">
            <section className="flex gap-3 w-full relative">
              <FaRegCalendar className="text-cyan-600 text-xl" />
              <section>
                <h2>Determinar um intervalo de tempo?</h2>
                <span className="text-xs">
                  O timer vai liberar os leads entre os horários de início e
                  fim.
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
                  Determine quais dias da semana o timer vai ser acionado, por
                  padrão o timer funciona todos os dias.
                </p>
              </section>
              <section className="absolute right-0">
                <ToggleSwitch
                  toggle={toggle.toggle1}
                  setToggle={() => handleToggleChange("toggle1")}
                />
              </section>
            </section>
            {toggle.toggle1 && (
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

          <div className="w-full bg-[#1F1F1F] rounded-lg mb-10 mt-10">
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
