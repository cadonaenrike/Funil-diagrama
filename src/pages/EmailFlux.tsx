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
import { Timer } from "../components/nodes/Timer";
import { Tag } from "../components/nodes/Tags";
import { NodeType } from "../configs/types/NodeType";
import * as React from "react";
import check from "../../public/images/Check.svg";
import start from "../../public/images/Start.svg";
import email from "../../public/images/email.svg";
import aquecimento from "../../public/images/aquecimento.svg";
import addtag from "../../public/images/addTag.svg";
import removertag from "../../public/images/removeTag.svg";
import falha from "../../public/images/falha.svg";
import tag from "../../public/images/tag.svg";
import { TfiTimer } from "react-icons/tfi";
import { Start } from "../components/nodes/Start";
import { PerformanceNode } from "../components/nodes/PerformanceNode";
import { EmailMarketing } from "../components/nodes/EmailMarketing";
import lidos from "../../public/images/openMail.svg";
import NavbarPropsEmail from "../components/navbar/NavbarPropsEmail";
import { Lidos } from "../components/nodes/Lidos";
import { Falha } from "../components/nodes/Falha";
import { Sucesso } from "../components/nodes/Sucesso";
import { RemoverTag } from "../components/nodes/RemoverTag";
import { AddTag } from "../components/nodes/AddTag";

const node_type = {
  lidos: Lidos,
  inicio: Start,
  performance: PerformanceNode,
  emailmarketing: EmailMarketing,
  square: Square,
  create: Create,
  aquecimento: Aquecimento,
  addTag: AddTag,
  removerTag: RemoverTag,
  success: Sucesso,
  timer: Timer,
  tag: Tag,
  falha: Falha,
};

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
    label: "Performance",
    type: "emailmarketing",
    icon: <img src={email} width={25} height={25} />,
  },
  {
    label: "Marketing",
    type: "performance",
    icon: <img src={email} width={25} height={25} />,
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
    label: "Lidos",
    type: "lidos",
    icon: <img src={lidos} height={25} width={25} />,
  },
  {
    label: "Tag",
    type: "tag",
    icon: <img src={tag} height={25} width={25} />,
  },
];

function EmailFlux() {
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
      aquecimento: (props: NodeProps) => (
        <Aquecimento {...props} onRemove={removeNode} />
      ),
      emailmarketing: (props: NodeProps) => (
        <EmailMarketing {...props} onRemove={removeNode} />
      ),
      performance: (props: NodeProps) => (
        <PerformanceNode {...props} onRemove={removeNode} />
      ),
      addTag: (props: NodeProps) => <AddTag {...props} onRemove={removeNode} />,
      removerTag: (props: NodeProps) => (
        <RemoverTag {...props} onRemove={removeNode} />
      ),
      success: (props: NodeProps) => (
        <Sucesso {...props} onRemove={removeNode} />
      ),
      falha: (props: NodeProps) => <Falha {...props} onRemove={removeNode} />,
      lidos: (props: NodeProps) => <Lidos {...props} onRemove={removeNode} />,
      tag: (props: NodeProps) => <Tag {...props} onRemove={removeNode} />,
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

      <NavbarPropsEmail
        onMenuItemClick={onMenuItemClick}
        menuItems={menuItems}
      />
    </div>
  );
}

export default EmailFlux;
