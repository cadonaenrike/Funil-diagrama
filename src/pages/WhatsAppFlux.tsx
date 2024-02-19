/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactFlow, {
  Background,
  Connection,
  ConnectionMode,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import { useCallback } from "react";

import { Square } from "../components/nodes/Campanhas";
import { Aquecimento } from "../components/nodes/Aquecimento";
import { WhatsApp } from "../components/nodes/WhatsApp";
import { Timer } from "../components/nodes/Timer";
import { NodeType } from "../configs/types/NodeType";
import * as React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import NavbarProps from "../components/navbar/NavbarProps";
import { Sucesso } from "../components/nodes/Sucesso";
import { Start } from "../components/nodes/Start";
import { AddTag } from "../components/nodes/AddTag";
import check from "../../public/images/Check.svg";
import start from "../../public/images/Start.svg";
import aquecimento from "../../public/images/aquecimento.svg";
import addtag from "../../public/images/addtag.svg";
import falha from "../../public/images/falha.svg";
import { Falha } from "../components/nodes/Falha";

const node_type = {
  square: Square,
  aquecimento: Aquecimento,
  whatsApp: WhatsApp,
  timer: Timer,
  success: Sucesso,
  inicio: Start,
  addTag: AddTag,
  falha: Falha,
};

function WhatsAppFlux() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

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
      icon: <img src={addtag} height={25} width={25} />,
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
  ];

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, animated: true };
      setEdges((currentEdges) => addEdge(edge, currentEdges));
    },
    [setEdges]
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment

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
        nodeTypes={node_type}
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

      <NavbarProps menuItems={menuItems} onMenuItemClick={onMenuItemClick} />
    </div>
  );
}

export default WhatsAppFlux;
