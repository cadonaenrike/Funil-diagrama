import { MdArrowDownward, MdArrowUpward, MdFileUpload } from "react-icons/md";

interface ArquivosProps {
  index: number;
  moveBlock: (direction: "up" | "down", index: number) => void;
  blocksLength: number;
}

export function Arquivos({ index, moveBlock, blocksLength }: ArquivosProps) {
  return (
    <div className="py-8 flex bg-[#242424] w-11/12 flex-col items-center rounded-lg">
      {index > 0 && <MdArrowUpward onClick={() => moveBlock("up", index)} />}
      <MdFileUpload className="text-5xl" />
      <h2>Anexar arquivo...</h2>
      {index < blocksLength - 1 && (
        <MdArrowDownward onClick={() => moveBlock("down", index)} />
      )}
    </div>
  );
}
