/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactFlow, {
  Background,
  Connection,
  ConnectionMode,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  // Edge,
  Node,
  NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import { zinc } from "tailwindcss/colors";

import { useCallback } from "react";

import { Timer } from "../components/nodes/Timer";

import { NodeType } from "../configs/types/NodeType";
import * as React from "react";
import NavbarHome from "../components/navbar/NavbarHome";
import { SequenciaWhatsApp } from "../components/nodes/SequenciaWhatsApp";
import { SequenciaSMS } from "../components/nodes/SequenciaSMS";
import { SequenciaEmail } from "../components/nodes/SequenciaEmail";
import { SequenciaMista } from "../components/nodes/SequenciaMista";

const node_type = {
  timer: Timer,
  seqmista: SequenciaMista,
  seqwhatsapp: SequenciaWhatsApp,
  seqsms: SequenciaSMS,
  seqemail: SequenciaEmail,
};

function Home() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const onNodesDelete = useCallback(
    (nodesToDelete: Node[]) => {
      const idsToDelete = new Set(nodesToDelete.map((node) => node.id));
      setNodes((prevNodes) =>
        prevNodes.filter((node) => !idsToDelete.has(node.id))
      );
      setEdges((prevEdges) =>
        prevEdges.filter(
          (edge) =>
            !idsToDelete.has(edge.source) && !idsToDelete.has(edge.target)
        )
      );
    },
    [setEdges, setNodes]
  );

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

  const memoizedNodeTypes = React.useMemo(
    () => ({
      ...node_type,
      seqwhatsapp: (props: NodeProps) => (
        <SequenciaWhatsApp {...props} onRemove={removeNode} />
      ),
      seqmista: (props: NodeProps) => (
        <SequenciaMista {...props} onRemove={removeNode} />
      ),
      seqemail: (props: NodeProps) => (
        <SequenciaEmail {...props} onRemove={removeNode} />
      ),
      seqsms: (props: NodeProps) => (
        <SequenciaSMS {...props} onRemove={removeNode} />
      ),
      // Adicione outros tipos de nó conforme necessário
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
      className="w-screen h-screen"
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
        onNodesDelete={onNodesDelete}
        connectionMode={ConnectionMode.Loose}
      >
        <Background color={zinc[500]} />
        <Controls />
      </ReactFlow>

      <NavbarHome onMenuItemClick={onMenuItemClick} />
    </div>
  );
}

export default Home;
