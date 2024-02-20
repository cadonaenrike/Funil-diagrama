import { useEffect, useRef } from "react";
import { BsChatRightTextFill } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";

interface DropDownProps {
  isOpen: boolean;
  onClickButtonArchiver?: (e: React.MouseEvent<HTMLElement>) => void;
  onClickButtonText?: (e: React.MouseEvent<HTMLElement>) => void;
  toggleDropDown: () => void;
}

export function DropDownBloco({
  isOpen,
  toggleDropDown,
  onClickButtonArchiver,
  onClickButtonText,
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
          className="origin-top-right z-20 w-32 shadow-lg bg-[#000000da] rounded-lg absolute -top-9 right-[266px]"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {/* Conteúdo do dropdown aqui */}
          <div
            className="py-1 flex items-center flex-col justify-center"
            role="none"
          >
            <button
              className=" py-2 gap-2 flex items-center text-sm hover:bg-[#00000021] rounded-lg"
              onClick={onClickButtonText}
              role="menuitem"
            >
              <BsChatRightTextFill /> Texto
            </button>
            <button
              onClick={onClickButtonArchiver}
              className="py-2 flex items-center gap-2 text-sm hover:bg-[#00000021] rounded-lg"
              role="menuitem"
            >
              <FaFileAlt /> Arquivo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
