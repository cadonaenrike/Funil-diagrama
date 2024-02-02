import { useState } from "react";
import { TfiTimer } from "react-icons/tfi";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import { DropDown } from "../dropdawn/DropDawn";

Modal.setAppElement("#root");

interface SequenciaTimeProps {
  id: string;
  onRemove: (nodeId: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Timer({ id, onRemove }: SequenciaTimeProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [waitTime, setWaitTime] = useState(1);
  const [isScheduled, setIsScheduled] = useState(false);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("22:00");
  const [isSpecificDays, setIsSpecificDays] = useState(false);
  const [selectedDays, setSelectedDays] = useState([false]);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isDrowOpen, setDrowOpen] = useState(false);

  const handleNodeClickContext = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isRemoved) {
      // Abrir o modal quando o nó for clicado
      setDrowOpen(!isDrowOpen);
      setModalOpen(false);
    }
  };

  const handleNodeClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleWaitTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaitTime(parseInt(e.target.value, 10));
  };

  const handleIsScheduledChange = () => {
    setIsScheduled(!isScheduled);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleIsSpecificDaysChange = () => {
    setIsSpecificDays(!isSpecificDays);
  };

  const handleDayChange = (index: number) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index] = !newSelectedDays[index];
    setSelectedDays(newSelectedDays);
  };

  const handleSave = () => {
    console.log("Tempo de espera:", waitTime);
    console.log("Timer Agendado:", isScheduled);
    console.log("Hora de Início:", startTime);
    console.log("Hora de Fim:", endTime);
    console.log("Dias Específicos:", selectedDays);

    closeModal();
  };

  const handleRemoveFromScreen = () => {
    if (onRemove) onRemove(id);
    setIsRemoved(true);
    closeModal();
  };

  return (
    <>
      {!isRemoved && (
        <div
          className="h-50 p-2 flex flex-col items-center cursor-pointer"
          onContextMenu={handleNodeClickContext}
          onClick={handleNodeClick}
        >
          <section className="bg-black rounded-lg w-16 flex items-center h-14 justify-center bg-opacity-90">
            <TfiTimer size={32} className="text-white" />
          </section>
          <section>
            <Handle
              id="right"
              position={Position.Right}
              type="source"
              className="right-6 w-3 h-3 top-9"
            />
            <Handle
              id="left"
              position={Position.Left}
              type="source"
              className="left-6 w-3 h-3 top-9"
            />
          </section>
          <span className="font-bold text-center">Configurar Timer</span>
          <DropDown
            isOpen={isDrowOpen}
            onClickButton={handleRemoveFromScreen}
            onClickButtonCopy={() => {}}
            onClickButtonExport={() => {}}
            toggleDropDown={() => setDrowOpen(false)}
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
        <div className="bg-white rounded-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Configurar Timer</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Selecionar um tempo de espera (em minutos):
              </label>
              <input
                type="number"
                value={waitTime}
                onChange={handleWaitTimeChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Agendar data e hora limite?
              </label>
              <label className="inline-flex items-center ml-2">
                <input
                  type="checkbox"
                  checked={isScheduled}
                  onChange={handleIsScheduledChange}
                  className="form-checkbox h-5 w-5 text-cyan-500"
                />
                <span className="ml-2 text-gray-700">Sim</span>
              </label>
            </div>
            {isScheduled && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Hora de Início:
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Hora de Fim:
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Selecionar dias específicos:
                  </label>
                  <label className="inline-flex items-center ml-2">
                    <input
                      type="checkbox"
                      checked={isSpecificDays}
                      onChange={handleIsSpecificDaysChange}
                      className="form-checkbox h-5 w-5 text-cyan-500"
                    />
                    <span className="ml-2 text-gray-700">Sim</span>
                  </label>
                  {isSpecificDays && (
                    <div className="mt-2 flex space-x-4">
                      {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                        (day, index) => (
                          <label
                            key={index}
                            className="inline-flex items-center"
                          >
                            <input
                              type="checkbox"
                              checked={selectedDays[index]}
                              onChange={() => handleDayChange(index)}
                              className="form-checkbox h-5 w-5 text-cyan-500"
                            />
                            <span className="ml-2 text-gray-700">{day}</span>
                          </label>
                        )
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="flex mt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mr-2"
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
                className="ml-2 px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 mr-2"
              >
                Remover da Tela
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
