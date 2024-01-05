/* eslint-disable @typescript-eslint/no-explicit-any */
export interface NodeType {
  id: string;
  type: "square" | "funnel" | "create" | "whatsApp" | "timer" | "tag";
  position: { x: number; y: number };
  data: any;
}
