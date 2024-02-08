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
import { Create } from "../components/nodes/Leads";
import { Aquecimento } from "../components/nodes/Aquecimento";
import { WhatsApp } from "../components/nodes/WhatsApp";
import { Timer } from "../components/nodes/Timer";
import { Tag } from "../components/nodes/Tags";
import { NodeType } from "../configs/types/NodeType";
import * as React from "react";
import { FaTag, FaUser, FaWhatsapp } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import NavbarProps from "../components/navbar/NavbarProps";
import { Sucesso } from "../components/nodes/Sucesso";
import { Start } from "../components/nodes/Start";
import check from "../../public/images/Check.svg";
import start from "../../public/images/Start.svg";
import aquecimento from "../../public/images/aquecimento.svg";

const node_type = {
  square: Square,
  create: Create,
  aquecimento: Aquecimento,
  whatsApp: WhatsApp,
  timer: Timer,
  tag: Tag,
  success: Sucesso,
  inicio: Start,
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
    {
      label: "Aquecimento",
      type: "aquecimento",
      icon: <img src={aquecimento} height={25} width={25} />,
    },
    { label: "Leads", type: "create", icon: <FaUser /> },
    { label: "WhatsApp", type: "whatsApp", icon: <FaWhatsapp /> },
    { label: "Timer", type: "timer", icon: <TfiTimer /> },
    { label: "Tag", type: "tag", icon: <FaTag /> },
    {
      label: "Sucesso",
      type: "success",
      icon: <img src={check} height={25} width={25} />,
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
        <Background style={{ backgroundColor: "#000", opacity: "0.85" }} />
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
