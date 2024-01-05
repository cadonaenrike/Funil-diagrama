import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";

Modal.setAppElement("#root");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function WhatsApp() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [attachment, setAttachment] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);

  const handleNodeClick = () => {
    if (!isRemoved) {
      setModalOpen(true);
    }
  };

  const handleOtherClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("teste");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleScheduledTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setScheduledTime(e.target.value);
  };

  const handleScheduledDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setScheduledDate(e.target.value);
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachment(e.target.value);
  };

  const handleSend = () => {
    console.log("Mensagem enviada:", message);
    console.log("Data agendada:", scheduledDate);
    console.log("Hora agendada:", scheduledTime);
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
          className="h-50 p-2 flex flex-col items-center"
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
              className="right-0 w-3 h-3 top-9"
            />
            <Handle
              id="left"
              position={Position.Left}
              type="source"
              className="left-0 w-3 h-3 top-9"
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
        <h2 className="text-2xl font-bold mb-2">Configurar WhatsApp</h2>
        <p className="text-sm text-gray-600 mb-4">
          Escritas Automáticas: Em sua mensagem você pode utilizar as seguintes
          escritas automáticas, para utilizar as informações dos leads com
          preenchimento automático.
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Escreva uma mensagem:
          </label>
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Agendar data e hora limite?
          </label>
          <input
            type="date"
            value={scheduledDate}
            onChange={handleScheduledDateChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="time"
            value={scheduledTime}
            onChange={handleScheduledTimeChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
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
