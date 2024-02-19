import { NodeType } from "../../configs/types/NodeType";
import { MenuItem } from "./Menu";
import logoFunnel from "../../../public/images/funnelads 3. hrzt_Prancheta 1 cópia 7_Prancheta 1 cópia 8.png";

interface NavbarProps {
  onMenuItemClick: (
    type: NodeType["type"],
    position: { x: number; y: number }
  ) => void;
  menuItems: MenuItem[];
}

interface ConfiguracaoLinha {
  itensPorLinha: number[];
  nomesLinhas: string[];
}

const NavbarProps: React.FC<NavbarProps> = ({
  onMenuItemClick,
  menuItems,
}: NavbarProps) => {
  const handleDragStart = (
    e: React.DragEvent<HTMLButtonElement>,
    menuItem: MenuItem
  ) => {
    e.dataTransfer.setData("text", menuItem.type);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("text");
    const newPosition = {
      x: e.clientX - e.currentTarget.getBoundingClientRect().left,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top,
    };

    onMenuItemClick(type as NodeType["type"], newPosition);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleMenuItemClick = (menuItem: MenuItem) => {
    const initialPosition = {
      y: 600,
      x: 400,
    };
    onMenuItemClick(menuItem.type as NodeType["type"], initialPosition);
  };

  const gerarPares = (configuracaoLinha: ConfiguracaoLinha): MenuItem[][] => {
    const { itensPorLinha } = configuracaoLinha;
    let indiceItem = 0;
    return itensPorLinha.map((numItens) => {
      const linha = [];
      for (let i = 0; i < numItens && indiceItem < menuItems.length; i++) {
        linha.push(menuItems[indiceItem]);
        indiceItem++;
      }
      return linha;
    });
  };

  const configuracaoLinha: ConfiguracaoLinha = {
    itensPorLinha: [1, 2, 1, 2, 3], // Definir o número de itens por linha
    nomesLinhas: [
      "início",
      "Controles",
      "Disparos",
      "Ações",
      "Condições",
      "Integrar",
      "Extras",
    ], // Definir os nomes para cada linha
  };

  const pares = gerarPares(configuracaoLinha);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="whitespace-nowrap h-11/12 text-white overflow-auto text-ellipsis fixed top-1/2 transform -translate-y-1/2 bg-black opacity-80 rounded-2xl shadow-lg border border-zinc-300 px-8 w-52 pt-4 flex flex-col justify-evenly"
    >
      <h2
        className="text-lg mb-4 text-center"
        draggable="false"
        aria-disabled="true"
      >
        Arraste os ícones
      </h2>
      {pares.map((pair, index) => (
        <div key={index}>
          <div className="flex items-center my-2" draggable="false">
            <div className="w-14 border-t border-zinc-500"></div>
            <p className="text-center text-xs px-1">
              {configuracaoLinha.nomesLinhas[index]}
            </p>
            <div className="w-14 border-t border-zinc-500"></div>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-5">
            {pair.map((menuItem) => (
              <button
                draggable
                onDragStart={(e) => handleDragStart(e, menuItem)}
                key={menuItem.type}
                onClick={() => handleMenuItemClick(menuItem)}
                className="focus:outline-none hover:text-sky-600 mb-4 flex w-14 flex-col items-center"
              >
                {menuItem.icon}
                <p className="mt-2 whitespace-normal w-auto">
                  {menuItem.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      ))}
      <hr />
      <img draggable={false} src={logoFunnel} alt="" />
    </div>
  );
};

export default NavbarProps;
