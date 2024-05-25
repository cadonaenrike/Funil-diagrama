/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

import { Handle, Position, NodeProps } from "reactflow";
import Modal from "react-modal";

import { DropDown } from "../dropdawn/DropDawn";

Modal.setAppElement("#root");

interface WhatsAppProps extends NodeProps {
  id: string;
  onRemove: (nodeId: string) => void;
  onUpdateNode: (id: string, data: any) => void;
}

export function WhatsApp({ id, data, onRemove, onUpdateNode }: WhatsAppProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "");
  const [message, setMessage] = useState(data.message || "");
  const [image, setImage] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isDropdown, setDropdown] = useState(false);

  const handleNodeClick = () => {
    if (!isRemoved) {
      setModalOpen(true);
    }
  };

  const handleOtherClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isRemoved) {
      setDropdown(!isDropdown);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudio(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const data = {
      phoneNumber,
      message,
      image,
      audio,
    };
    onUpdateNode(id, data);
    console.log(data);
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
        <h2 className="text-2xl font-bold mb-2">Configurar WhatsApp</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Número de Telefone:
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mensagem:
          </label>
          <textarea
            value={message}
            onChange={handleMessageChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Anexar Imagem:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Anexar Áudio:
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-black"
          />
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#046a04] text-white rounded-md hover:bg-[#379737] focus:outline-none focus:ring focus:border-blue-300"
          >
            Salvar
          </button>
        </div>
      </Modal>
    </>
  );
}
