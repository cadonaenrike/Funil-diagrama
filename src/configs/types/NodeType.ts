/* eslint-disable @typescript-eslint/no-explicit-any */
export interface NodeType {
  id: string;
  type:
    | "square"
    | "funnel"
    | "create"
    | "whatsApp"
    | "timer"
    | "tag"
    | "seqmista"
    | "seqwhatsapp"
    | "seqsms"
    | "seqemail"
    | "success";
  position: { x: number; y: number };
  data: any;
}
