import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  Connection,
  ConnectionMode,
  Controls,
  NodeProps,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import { useParams } from "react-router-dom";

import { Square } from "../components/nodes/Campanhas";
import { Aquecimento } from "../components/nodes/Aquecimento";
import { WhatsApp } from "../components/nodes/WhatsApp";
import { Timer } from "../components/nodes/Timer";
import { NodeType } from "../configs/types/NodeType";
import { FaWhatsapp } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import NavbarProps from "../components/navbar/NavbarProps";
import { Sucesso } from "../components/nodes/Sucesso";
import { Start } from "../components/nodes/Start";
import { AddTag } from "../components/nodes/AddTag";
import check from "../../public/images/Check.svg";
import start from "../../public/images/Start.svg";
import aquecimento from "../../public/images/aquecimento.svg";
import removerTag from "../../public/images/removeTag.svg";
import tag from "../../public/images/tag.svg";
import falha from "../../public/images/falha.svg";
import { Falha } from "../components/nodes/Falha";
import { RemoverTag } from "../components/nodes/RemoverTag";
import { Tag } from "../components/nodes/Tags";
import addTag from "../../public/images/addTag.svg";
import { Pasta } from "../types/PastaType";
import { getPastaByIdUser } from "../services/PastaService";
import { saveFluxo } from "../services/FluxoService";

const node_type = {
  square: Square,
  aquecimento: Aquecimento,
  whatsApp: WhatsApp,
  timer: Timer,
  success: Sucesso,
  inicio: Start,
  addTag: AddTag,
  falha: Falha,
  removerTag: RemoverTag,
  tag: Tag,
};

const WhatsAppFlux: React.FC = () => {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [showModal, setShowModal] = useState(false);
  const [fluxoName, setFluxoName] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedPasta, setSelectedPasta] = useState<string>("");
  const [pasta, setPasta] = useState<Pasta | null>(null);

  const { userId: userIdFromParams } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userIdFromParams) {
      setUserId(userIdFromParams);

      const fetchPasta = async () => {
        try {
          const data = await getPastaByIdUser(userIdFromParams);
          setPasta(data);
        } catch (error) {
          console.error("Erro ao carregar pasta:", error);
        }
      };

      fetchPasta();
    }
  }, [userIdFromParams]);

  const handleSave = async () => {
    const fluxoData = {
      name: fluxoName,
      pastaId: selectedPasta,
      nodes,
      edges,
      userId,
    };

    try {
      await saveFluxo(fluxoData);
      console.log("Fluxo salvo com sucesso:", fluxoData);
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar fluxo:", error);
    }
  };

  const removeNode = useCallback(
    (nodeId: string) => {
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
      setEdges((prevEdges) =>
        prevEdges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId
        )
      );
    },
    [setNodes, setEdges]
  );

  const menuItems = [
    {
      label: "Start",
      type: "inicio",
      icon: <img src={start} className="invert" width={25} height={25} />,
    },
    { label: "Timer", type: "timer", icon: <TfiTimer size={25} /> },
    {
      label: "Aquecimento",
      type: "aquecimento",
      icon: <img src={aquecimento} height={25} width={25} />,
    },
    { label: "WhatsApp", type: "whatsApp", icon: <FaWhatsapp size={25} /> },
    {
      label: "Add Tag",
      type: "addTag",
      icon: <img src={addTag} height={25} width={25} />,
    },
    {
      label: "Remover Tag",
      type: "removerTag",
      icon: <img src={removerTag} height={25} width={25} />,
    },
    {
      label: "Sucesso",
      type: "success",
      icon: <img src={check} height={25} width={25} />,
    },
    {
      label: "Falha",
      type: "falha",
      icon: <img src={falha} height={25} width={25} />,
    },
    {
      label: "Tag",
      type: "tag",
      icon: <img src={tag} height={25} width={25} />,
    },
  ];

  const memoizedNodeTypes = React.useMemo(
    () => ({
      ...node_type,
      timer: (props: NodeProps) => <Timer {...props} onRemove={removeNode} />,
      tag: (props: NodeProps) => <Tag {...props} onRemove={removeNode} />,
      whatsApp: (props: NodeProps) => (
        <WhatsApp {...props} onRemove={removeNode} />
      ),
      addTag: (props: NodeProps) => <AddTag {...props} onRemove={removeNode} />,
      removerTag: (props: NodeProps) => (
        <RemoverTag {...props} onRemove={removeNode} />
      ),
      success: (props: NodeProps) => (
        <Sucesso {...props} onRemove={removeNode} />
      ),
      falha: (props: NodeProps) => <Falha {...props} onRemove={removeNode} />,
      aquecimento: (props: NodeProps) => (
        <Aquecimento {...props} onRemove={removeNode} />
      ),
    }),
    [removeNode]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, animated: true };
      setEdges((currentEdges) => addEdge(edge, currentEdges));
    },
    [setEdges]
  );

  const onMenuItemClick = (
    type: NodeType["type"],
    position: { x: number; y: number }
  ) => {
    const newNode: NodeType = {
      id: crypto.randomUUID(),
      type,
      position,
      data: {},
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const handleNodeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleNodeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("text");
    const newPosition = {
      x: e.clientX,
      y: e.clientY,
    };
    onMenuItemClick(type as NodeType["type"], newPosition);
  };

  return (
    <div
      className="w-screen h-screen overflow-auto"
      onDrop={handleNodeDrop}
      onDragOver={handleNodeDragOver}
    >
      <ReactFlow
        nodeTypes={memoizedNodeTypes}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
      >
        <Background
          style={{ backgroundColor: "#000", opacity: "0.85" }}
          className="overflow-auto"
        />
        <Controls
          style={{ backgroundColor: "#646060" }}
          position="bottom-right"
        />
      </ReactFlow>

      <button
        onClick={() => setShowModal(true)}
        className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Salvar
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Salvar Fluxo
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Preencha os detalhes abaixo para salvar o fluxo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="fluxoName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome do Fluxo
                </label>
                <input
                  type="text"
                  id="fluxoName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={fluxoName}
                  onChange={(e) => setFluxoName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="pasta"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pasta
                </label>
                <select
                  id="pasta"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={selectedPasta}
                  onChange={(e) => setSelectedPasta(e.target.value)}
                >
                  <option value="">Selecione uma pasta</option>
                  {pasta && <option value={pasta.id}>{pasta.name}</option>}
                </select>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleSave}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Salvar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <NavbarProps menuItems={menuItems} onMenuItemClick={onMenuItemClick} />
    </div>
  );
};

export default WhatsAppFlux;
