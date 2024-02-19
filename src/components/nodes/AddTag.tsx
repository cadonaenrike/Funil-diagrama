import { useState } from "react";
import { Handle, Position } from "reactflow";
import addTag from "../../../public/images/addTag.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa6";
import { GoX } from "react-icons/go";
import { DropDown } from "../dropdawn/DropDawn";

Modal.setAppElement("#root");
interface AddTagProps {
  id: string;
  onRemove: (nodeId: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AddTag({ id, onRemove }: AddTagProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalTag, setModalTag] = useState(false);
  const [isDropDown, setDropDown] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTagName, setSelectedTagName] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);

  const tagsOptions = ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"];

  const handleNodeClick = () => {
    setModalOpen(true);
  };

  const handleNodeClickContext = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isRemoved) setDropDown(!isDropDown);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleTag = () => {
    setModalTag(!isModalTag);
  };

  const closeModalTag = () => {
    setModalTag(!isModalTag);
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
          className="h-50 p-2 rounded flex flex-col items-center text-white"
          onClick={handleNodeClick}
          onContextMenu={handleNodeClickContext}
        >
          <section className="w-16 h-14 bg-[#113668] rounded-lg flex items-center justify-center">
            <img src={addTag} width={32} height={32} className="text-white" />
          </section>
          <section>
            <Handle
              id="right"
              position={Position.Right}
              type="source"
              className="w-3 h-3 top-9"
            />
            <Handle
              id="left"
              position={Position.Left}
              type="source"
              className="w-3 h-3 top-9"
            />
          </section>
          <span className="font-bold text-center">
            {selectedTagName || "Adicionar Tag"}
          </span>
          <DropDown
            isOpen={isDropDown}
            onClickButton={handleRemoveFromScreen}
            onClickButtonCopy={() => {
              console.log("clicou");
            }}
            onClickButtonExport={() => {
              console.log("clicou");
            }}
            toggleDropDown={() => setDropDown(!isDropDown)}
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
            <h2 className="text-2xl font-bold mb-2">Adicionar</h2>
            <p className="text-gray-700 mb-4">
              Ao passar nessa etapa do fluxograma, as tags apresentadas abaixo
              serão ADICIONADAS ao lead.
            </p>
            <h3 className="text-lg font-bold mb-2">
              Tag(s) para ser adicionada(s) no lead
            </h3>
            <section className="w-full flex items-center gap-2 justify-center">
              <select
                value={selectedTags[0]}
                onChange={handleTagChange}
                className="mt-1 p-2 w-full border rounded-md hover:border-purple-600 focus:outline-none bg-transparent"
              >
                {tagsOptions.map((tag, index) => (
                  <option
                    style={{ background: "black" }}
                    key={index}
                    value={tag}
                  >
                    {tag}
                  </option>
                ))}
              </select>
              <button
                onClick={handleTag}
                className="border rounded-md mt-1 py-3 px-7 hover:border-purple-600 hover:bg-purple-700 hover:bg-opacity-5"
              >
                <FaPlus />
              </button>
            </section>
            <div className="flex justify-end -mr-2 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#046a04] text-white rounded-md hover:bg-[#227422] focus:outline-none focus:ring focus:border-blue-300 mr-2"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isModalTag}
        onRequestClose={closeModalTag}
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
            background: "#070606",
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
        <div className="rounded-md gap-7 flex flex-col min-w-[440px] p-2">
          <section className="flex justify-between items-center w-full">
            <h2 className="text-xl text-[#a8a8a8]">Criar tag:</h2>
            <GoX
              className="cursor-pointer text-2xl hover:bg-[#4b4a4a] rounded-full"
              onClick={closeModalTag}
            />
          </section>
          <input
            type="text"
            placeholder="Nome"
            className="bg-transparent rounded-md"
          />
          <section className="flex justify-end">
            <button className="bg-[#625cf3] rounded-md py-1 px-4">
              Salvar
            </button>
          </section>
        </div>
      </Modal>
    </>
  );
}
