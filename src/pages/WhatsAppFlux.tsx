/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
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
import Modal from "../components/saveModal/SaveModal";
import * as React from "react";

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
  const [pastas, setPastas] = useState<Pasta[]>([]);
  const apiFront = import.meta.env.VITE_APY_FRONT;
  const { userId: userIdFromParams } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userIdFromParams) {
      setUserId(userIdFromParams);

      const fetchPastas = async () => {
        try {
          const data = await getPastaByIdUser(userIdFromParams);
          setPastas(data);
        } catch (error) {
          console.error("Erro ao carregar pastas:", error);
        }
      };

      fetchPastas();
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

  const updateNodeData = useCallback((id: string, data: any) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  }, []);

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
        <WhatsApp
          {...props}
          onRemove={removeNode}
          onUpdateNode={updateNodeData}
        />
      ),
      addTag: (props: NodeProps) => (
        <AddTag
          {...props}
          onRemove={removeNode}
          onUpdateNode={updateNodeData}
        />
      ),
      removerTag: (props: NodeProps) => (
        <RemoverTag
          {...props}
          onRemove={removeNode}
          onUpdateNode={updateNodeData}
        />
      ),
      success: (props: NodeProps) => (
        <Sucesso {...props} onRemove={removeNode} />
      ),
      falha: (props: NodeProps) => <Falha {...props} onRemove={removeNode} />,
      aquecimento: (props: NodeProps) => (
        <Aquecimento {...props} onRemove={removeNode} />
      ),
    }),
    [removeNode, updateNodeData]
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
      <div className="fixed top-4 right-4 px-4 flex justify-center items-center gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#046a04] text-white px-4 py-2 rounded-lg"
        >
          Salvar
        </button>
        <button className=" px-4 py-2 bg-red-900 text-white rounded-lg ">
          <a href={`${apiFront}/CLIENTE/RelacaoDePasta-Client`}>Sair</a>
        </button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        fluxoName={fluxoName}
        setFluxoName={setFluxoName}
        selectedPasta={selectedPasta}
        setSelectedPasta={setSelectedPasta}
        pastas={pastas}
      />

      <NavbarProps menuItems={menuItems} onMenuItemClick={onMenuItemClick} />
    </div>
  );
};

export default WhatsAppFlux;
