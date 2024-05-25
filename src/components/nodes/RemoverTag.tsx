/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import removerTag from "../../../public/images/removeTag.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import { DropDown } from "../dropdawn/DropDawn";
import { FaPlus } from "react-icons/fa6";
import { TagsType } from "../../types/TagsType";
import { getAllTags } from "../../services/TagsService";

Modal.setAppElement("#root");

interface RemoverTagProps {
  id: string;
  onRemove: (nodeId: string) => void;
  onUpdateNode: (id: string, data: any) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RemoverTag({ id, onRemove, onUpdateNode }: RemoverTagProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropDown, setDropDown] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTagName, setSelectedTagName] = useState("");
  const [tagsOptions, setTagsOptions] = useState<TagsType[]>([]);
  const [isRemoved, setIsRemoved] = useState(false);
  const apiFront = import.meta.env.VITE_APY_FRONT;
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allTags = await getAllTags();
        setTagsOptions(allTags);
      } catch (error) {
        console.error("Erro ao obter as tags:", error);
      }
    };

    fetchTags();
  }, []);

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

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedTags([selectedOption]);
    setSelectedTagName(selectedOption);
  };

  const handleSave = () => {
    onUpdateNode(id, { tags: selectedTags, tagName: selectedTagName });
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
          <section className="w-16 h-14 bg-[#7d0909] rounded-lg flex items-center justify-center">
            <img
              src={removerTag}
              width={32}
              height={32}
              className="text-white"
            />
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
            {selectedTagName || "Remover Tag"}
          </span>
          <DropDown
            isOpen={isDropDown}
            toggleDropDown={() => setDropDown(!isDropDown)}
            onClickButton={handleRemoveFromScreen}
            onClickButtonCopy={() => {
              console.log("Copiou");
            }}
            onClickButtonExport={() => {
              console.log("Copiou");
            }}
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
            <h2 className="text-2xl font-bold mb-2">Remover</h2>
            <p className="text-gray-700 mb-4">
              Ao passar nessa etapa do fluxograma, a(s) tag(s) apresentada(s)
              abaixo serão REMOVIDA(S) do lead.
            </p>
            <h3 className="text-lg font-bold mb-2">
              Tag(s) para ser removida(s) no lead
            </h3>
            <section className="w-full flex items-center gap-2 justify-center">
              <select
                value={selectedTags[0]}
                onChange={handleTagChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none bg-transparent"
              >
                {tagsOptions.map((tag, index) => (
                  <option
                    style={{ background: "black" }}
                    key={index}
                    value={tag.name}
                  >
                    {tag.name}
                  </option>
                ))}
              </select>
              <a href={`${apiFront}/CLIENTE/RelacaoDeTags-Client`}>
                <button className="border rounded-md mt-1 py-3 px-7 hover:border-purple-600 hover:bg-purple-700 hover:bg-opacity-5">
                  <FaPlus />
                </button>
              </a>
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
    </>
  );
}
