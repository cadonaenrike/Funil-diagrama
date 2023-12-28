import { useState } from "react";
import { IoMdPricetag } from "react-icons/io";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";

Modal.setAppElement("#root");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Tag() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTagName, setSelectedTagName] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);

  const tagsOptions = ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"];

  const handleNodeClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedTags([selectedOption]);
    setSelectedTagName(selectedOption);
  };

  const handleSave = () => {
    console.log("Tags Selecionadas:", selectedTags);
    console.log("Nome da Tag Selecionada:", selectedTagName);

    // Atualize o nome da tag no seu estado ou faça outras ações necessárias

    closeModal();
  };

  const handleRemoveFromScreen = () => {
    setIsRemoved(true);
  };

  return (
    <>
      {!isRemoved && (
        <div
          className="h-50 border border-solid border-cyan-300 p-2 rounded flex flex-col items-center shadow-md bg-cyan-200"
          onClick={handleNodeClick}
        >
          <IoMdPricetag size={32} className="mb-2" />
          <span className="font-bold text-center">
            {selectedTagName || "Adicionar Tag"}
          </span>
          <Handle
            id="right"
            position={Position.Right}
            type="source"
            className="-right-1 w-3 h-3"
          />
          <Handle
            id="left"
            position={Position.Left}
            type="source"
            className="-right-1 w-3 h-3"
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
            <h2 className="text-2xl font-bold mb-2">Adicionar</h2>
            <p className="text-gray-700 mb-4">
              Ao passar nessa etapa do fluxograma, as tags apresentadas abaixo
              serão ADICIONADAS ao lead.
            </p>
            <h3 className="text-lg font-bold mb-2">
              Tag(s) para ser adicionada(s) no lead
            </h3>
            <select
              value={selectedTags[0]}
              onChange={handleTagChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              {tagsOptions.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mr-2"
              >
                Salvar
              </button>
              <button
                onClick={handleRemoveFromScreen}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 mr-2"
              >
                Remover da Tela
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-500"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
