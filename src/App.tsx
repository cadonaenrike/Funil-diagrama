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
import { zinc } from "tailwindcss/colors";

import { useCallback } from "react";

import Navbar from "./components/navbar/Navbar";
import { Square } from "./components/nodes/Campanhas";
import { Create } from "./components/nodes/Leads";
import { Funnel } from "./components/nodes/Funil";
import { WhatsApp } from "./components/nodes/WhatsApp";
import { Timer } from "./components/nodes/Timer";
import { Tag } from "./components/nodes/Tags";
import { NodeType } from "./configs/types/NodeType";
import * as React from "react";

const node_type = {
  square: Square,
  create: Create,
  funnel: Funnel,
  whatsApp: WhatsApp,
  timer: Timer,
  tag: Tag,
};

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

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
      className="w-screen h-screen"
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
        <Background color={zinc[500]} />
        <Controls />
      </ReactFlow>

      <Navbar onMenuItemClick={onMenuItemClick} />
    </div>
  );
}

export default App;
