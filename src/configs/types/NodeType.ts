/* eslint-disable @typescript-eslint/no-explicit-any */
export interface NodeType {
  id: string;
  type:
    | "square"
    | "aquecimento"
    | "create"
    | "whatsApp"
    | "timer"
    | "falha"
    | "tag"
    | "seqmista"
    | "seqwhatsapp"
    | "emailmarketing"
    | "seqsms"
    | "sms"
    | "seqemail"
    | "success"
    | "inicio"
    | "addTag"
    | "removerTag";
  position: { x: number; y: number };
  data: any;
}

export type PanelPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
