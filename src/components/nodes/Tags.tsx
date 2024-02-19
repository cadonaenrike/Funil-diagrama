/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Handle, Position } from "reactflow";
import tag from "../../../public/images/tag.svg";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Modal from "react-modal";
import { DropDown } from "../dropdawn/DropDawn";
import { FaPlus } from "react-icons/fa6";
import { GoX } from "react-icons/go";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";
import { BsThreeDots } from "react-icons/bs";

Modal.setAppElement("#root");
interface TagProps {
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
export function Tag({ id, onRemove }: TagProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isModalTag, setModalTag] = useState(false);
  const [isDropDown, setDropDown] = useState(false);
  const [selectedTagName, setSelectedTagName] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);
  const [toggle, setToggle] = useState<ToggleSwitch>(initialToggle);

  const tagsOptions = ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"];

  const handleNodeClick = () => {
    setModalOpen(true);
  };

  const handleToggleChange = (toggleName: string) => {
    setToggle((prevToggles: any) => ({
      ...prevToggles,
      [toggleName]: !prevToggles[toggleName],
    }));
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

    closeModal();
  };

  const handleNodeClickContext = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isRemoved) setDropDown(!isDropDown);
  };

  const handleTag = () => {
    setModalTag(!isModalTag);
  };

  const closeModalTag = () => {
    setModalTag(!isModalTag);
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
          <section className="w-16 h-14 bg-[#8d8d8d] rounded-lg flex items-center justify-center">
            <img src={tag} width={32} />
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
            onClickButton={handleRemoveFromScreen}
            onClickButtonExport={() => {
              console.log("Exportou");
            }}
            onClickButtonCopy={() => {
              console.log("Copiou");
            }}
            isOpen={isDropDown}
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
        <div className="rounded-md overflow-hidden ">
          <div className="p-4 ">
            <h2 className="text-2xl font-bold mb-2 text-white">
              Configurar Tag
            </h2>

            <section className="bg-[#071318] rounded-lg flex flex-col px-3 py-3 gap-3 my-7">
              <section className="flex gap-3 w-full relative">
                <BsThreeDots className="text-cyan-600 text-xl" />
                <section>
                  <h2>Agendar um intervalo de tempo?</h2>
                  <span className="text-xs">
                    A etapa vai enviar as mensagens aos leads somente no
                    intervalo de tempo definido abaixo.
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

            <h3 className="text-lg font-bold">Tag(s) de entrada dos leads</h3>
            <span className="font-normal text-xs text-gray-500">
              Para o lead entrar nesta tag, o mesmo deve possuir TODAS as tags
              abaixo, simultâneamente.
            </span>
            <section className="w-full flex items-center gap-2 justify-center my-3">
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

            <h3 className="text-lg font-bold mt-10">
              Tag(s) que impossibilitam a entrada dos leads
            </h3>
            <span className="font-normal text-xs text-gray-500">
              Se o lead possuir TODAS as tags abaixo, ele não entrará nesta
              etapa
            </span>
            <section className="w-full flex items-center gap-2 justify-center my-3">
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
