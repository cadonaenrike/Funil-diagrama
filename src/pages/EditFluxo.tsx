// src/pages/FluxoPage.tsx
import React, { useState, useEffect, useCallback } from "react";
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

import { Square } from "../components/nodes/Campanhas";
import { Aquecimento } from "../components/nodes/Aquecimento";
import { WhatsApp } from "../components/nodes/WhatsApp";
import { Timer } from "../components/nodes/Timer";
import { Sucesso } from "../components/nodes/Sucesso";
import { Start } from "../components/nodes/Start";
import { AddTag } from "../components/nodes/AddTag";
import { Falha } from "../components/nodes/Falha";
import { RemoverTag } from "../components/nodes/RemoverTag";
import { Tag } from "../components/nodes/Tags";

const nodeType = {
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

const initialData = {
  name: "eveton e pika porra",
  pastaId: "",
  nodes: [
    {
      id: "31c6e185-9434-4a95-aac6-631ab211683c",
      type: "aquecimento",
      position: {
        x: 425,
        y: 248,
      },
      data: {},
      width: 117,
      height: 96,
      selected: false,
      positionAbsolute: {
        x: 425,
        y: 248,
      },
      dragging: false,
    },
    {
      id: "9a425ad5-8684-49a2-b6b0-c8894350c297",
      type: "inicio",
      position: {
        x: 301,
        y: 86,
      },
      data: {},
      width: 120,
      height: 96,
      selected: false,
      positionAbsolute: {
        x: 301,
        y: 86,
      },
      dragging: false,
    },
    {
      id: "2d317283-4a15-42fd-9755-2147e1816951",
      type: "whatsApp",
      position: {
        x: 634,
        y: 99,
      },
      data: {},
      width: 95,
      height: 96,
      selected: false,
      positionAbsolute: {
        x: 634,
        y: 99,
      },
      dragging: false,
    },
    {
      id: "f19bb3fc-2c22-4003-91ec-f71860a74b4f",
      type: "addTag",
      position: {
        x: 532,
        y: 398,
      },
      data: {},
      width: 80,
      height: 96,
      selected: false,
      positionAbsolute: {
        x: 532,
        y: 398,
      },
      dragging: false,
    },
    {
      id: "a299e821-0e6a-4da2-bb15-ff778b601714",
      type: "success",
      position: {
        x: 790,
        y: 263,
      },
      data: {},
      width: 119,
      height: 96,
      selected: true,
      positionAbsolute: {
        x: 790,
        y: 263,
      },
      dragging: false,
    },
  ],
  edges: [
    {
      source: "9a425ad5-8684-49a2-b6b0-c8894350c297",
      sourceHandle: "right",
      target: "31c6e185-9434-4a95-aac6-631ab211683c",
      targetHandle: "left",
      animated: true,
      id: "reactflow__edge-9a425ad5-8684-49a2-b6b0-c8894350c297right-31c6e185-9434-4a95-aac6-631ab211683cleft",
    },
    {
      source: "31c6e185-9434-4a95-aac6-631ab211683c",
      sourceHandle: "right",
      target: "f19bb3fc-2c22-4003-91ec-f71860a74b4f",
      targetHandle: "left",
      animated: true,
      id: "reactflow__edge-31c6e185-9434-4a95-aac6-631ab211683cright-f19bb3fc-2c22-4003-91ec-f71860a74b4fleft",
    },
    {
      source: "f19bb3fc-2c22-4003-91ec-f71860a74b4f",
      sourceHandle: "right",
      target: "2d317283-4a15-42fd-9755-2147e1816951",
      targetHandle: "left",
      animated: true,
      id: "reactflow__edge-f19bb3fc-2c22-4003-91ec-f71860a74b4fright-2d317283-4a15-42fd-9755-2147e1816951left",
    },
    {
      source: "a299e821-0e6a-4da2-bb15-ff778b601714",
      sourceHandle: "left",
      target: "2d317283-4a15-42fd-9755-2147e1816951",
      targetHandle: "right",
      animated: true,
      id: "reactflow__edge-a299e821-0e6a-4da2-bb15-ff778b601714left-2d317283-4a15-42fd-9755-2147e1816951right",
    },
  ],
  userId: "14",
};

const FluxoPage: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNodes(initialData.nodes);
    setEdges(initialData.edges);
    setLoading(false);
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((currentEdges) =>
        addEdge({ ...connection, animated: true }, currentEdges)
      );
    },
    [setEdges]
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-screen h-screen overflow-auto">
      <ReactFlow
        nodeTypes={nodeType}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        fitView
      >
        <Background style={{ backgroundColor: "#000", opacity: "0.85" }} />
        <Controls
          style={{ backgroundColor: "#646060" }}
          position="bottom-right"
        />
      </ReactFlow>
    </div>
  );
};

export default FluxoPage;
