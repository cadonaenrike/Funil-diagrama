import { useEffect, useRef } from "react";
import { FaCopy, FaFileExport, FaTrash } from "react-icons/fa";

interface DropDownProps {
  isOpen: boolean;
  onClickButton: (e: React.MouseEvent<HTMLElement>) => void;
  onClickButtonCopy: (e: React.MouseEvent<HTMLElement>) => void;
  onClickButtonExport: (e: React.MouseEvent<HTMLElement>) => void;
  toggleDropDown: () => void;
}

export function DropDown({
  isOpen,
  toggleDropDown,
  onClickButton,
  onClickButtonCopy,
  onClickButtonExport,
}: DropDownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verifica se o clique ocorreu fora do dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleDropDown();
      }
    };

    // Adiciona o ouvinte de evento ao documento quando o dropdown é aberto
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    // Remove o ouvinte de evento ao desmontar o componente
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, toggleDropDown]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {isOpen && (
        <div
          className="origin-top-right w-44 shadow-lg bg-[#00000036] rounded-lg"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {/* Conteúdo do dropdown aqui */}
          <div className="py-1 flex items-center justify-center" role="none">
            <button
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-[#00000021] rounded-lg"
              onClick={onClickButtonExport}
              role="menuitem"
            >
              <FaFileExport className="text-blue-700" />
            </button>
            <button
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-[#00000021] rounded-lg"
              onClick={onClickButtonCopy}
              role="menuitem"
            >
              <FaCopy />
            </button>
            <button
              onClick={onClickButton}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-[#00000021] rounded-lg"
              role="menuitem"
            >
              <FaTrash className="text-red-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
