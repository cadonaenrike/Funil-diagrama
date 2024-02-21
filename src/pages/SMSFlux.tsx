/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { useCallback } from "react";
import { Square } from "../components/nodes/Campanhas";
import { Create } from "../components/nodes/Leads";
import { Aquecimento } from "../components/nodes/Aquecimento";
import { WhatsApp } from "../components/nodes/WhatsApp";
import { Timer } from "../components/nodes/Timer";
import { Tag } from "../components/nodes/Tags";
import { NodeType } from "../configs/types/NodeType";
import { Start } from "../components/nodes/Start";
import { Sucesso } from "../components/nodes/Sucesso";
import * as React from "react";
import NavbarProps from "../components/navbar/NavbarProps";
import { TfiTimer } from "react-icons/tfi";
import check from "../../public/images/Check.svg";
import start from "../../public/images/Start.svg";
import { SMS } from "../components/nodes/SMS";
import { AddTag } from "../components/nodes/AddTag";
import { RemoverTag } from "../components/nodes/RemoverTag";
import sms from "../../public/images/sms.svg";
import aquecimento from "../../public/images/aquecimento.svg";
import addtag from "../../public/images/addTag.svg";
import removertag from "../../public/images/removeTag.svg";
import falha from "../../public/images/falha.svg";
import tag from "../../public/images/tag.svg";
import { Falha } from "../components/nodes/Falha";

const node_type = {
  falha: Falha,
  sms: SMS,
  square: Square,
  create: Create,
  aquecimento: Aquecimento,
  whatsApp: WhatsApp,
  timer: Timer,
  tag: Tag,
  addTag: AddTag,
  removerTag: RemoverTag,
  inicio: Start,
  success: Sucesso,
};

function SMSFlux() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, animated: true };
      setEdges((currentEdges) => addEdge(edge, currentEdges));
    },
    [setEdges]
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
    {
      label: "SMS",
      type: "sms",
      icon: <img src={sms} width={25} height={25} />,
    },
    {
      label: "Add Tag",
      type: "addTag",
      icon: <img src={addtag} height={25} width={25} />,
    },
    {
      label: "Remover Tag",
      type: "removerTag",
      icon: <img src={removertag} height={25} width={25} />,
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
      sms: (props: NodeProps) => <SMS {...props} onRemove={removeNode} />,
      aquecimento: (props: NodeProps) => (
        <Aquecimento {...props} onRemove={removeNode} />
      ),
      inicio: (props: NodeProps) => <Start {...props} onRemove={removeNode} />,
    }),
    [removeNode]
  );

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

export default SMSFlux;
