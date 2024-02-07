import { useState } from "react";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import { DropDown } from "../dropdawn/DropDawn";

Modal.setAppElement("#root");

interface SequenciaWhatsAppProps {
  id: string;
  onRemove: (nodeId: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Start({ id, onRemove }: SequenciaWhatsAppProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDropdown, setDropdown] = useState(false);

  const handleNodeClickContext = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isRemoved) {
      // Abrir o modal quando o nó for clicado
      setDropdown(!isDropdown);
    }
  };

  const handleRemoveFromScreen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsRemoved(true);
    if (onRemove) onRemove(id);
    closeModal();
  };

  const handleItemClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleNodeClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSave = () => {
    // Atualize o nome da tag no seu estado ou faça outras ações necessárias

    closeModal();
  };

  return (
    <>
      {!isRemoved && (
        <div
          className="h-50 p-2 rounded flex flex-col items-center"
          onClick={handleNodeClick}
          onContextMenu={handleNodeClickContext}
        >
          <section className="w-16 h-14 bg-[#FFFF00] rounded-lg flex items-center justify-center">
            <img
              src="../../../public/images/Start.svg"
              width={35}
              height={35}
            />
          </section>
          <section>
            <Handle
              id="right"
              position={Position.Right}
              type="source"
              className="right-3 w-3 h-3 top-9"
            />
          </section>
          <span className="font-bold text-center text-white">
            {"Start | 0 leads"}
          </span>
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
          },
        }}
      >
        <div className="rounded-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">Start</h2>
            <p className="mb-4">
              O start é responsável por começar o fluxo da sua sequência,
              portanto é obrigatório colocá-lo como primeira etapa.
            </p>

            <div className="w-full bg-[#1F1F1F] rounded-lg">
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
                      <button className="bg-[#D20606] w-full py-2 rounded-md">
                        Remover
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="px-7 py-1 bg-[#046A04] text-white rounded-md hover:bg-[#379233] focus:outline-none focus:ring focus:border-blue-300 mr-2"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
