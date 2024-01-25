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

const Navbar: React.FC<NavbarProps> = ({
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

  // Agrupa os itens em pares
  const pairs = menuItems.reduce<MenuItem[][]>((acc, item, index) => {
    if (index % 2 === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }
    return acc;
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="fixed top-1/2 transform -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 w-52 pt-4 h-3/6 flex flex-col justify-evenly"
    >
      <h2 className="text-lg mb-4 text-center">Arraste os ícones</h2>
      {pairs.map((pair, index) => (
        <div key={index}>
          <div className="flex flex-col items-center my-2">
            <div className="w-full border-t border-zinc-500"></div>
            <span className="text-center text-xs transform -translate-y-1/2 bg-white px-4">
              {index === 0 ? "Controles" : "Disparos"}
            </span>
          </div>
          <div className="grid grid-cols-2">
            {pair.map((menuItem) => (
              <button
                draggable
                onDragStart={(e) => handleDragStart(e, menuItem)}
                key={menuItem.type}
                onClick={() => handleMenuItemClick(menuItem)}
                className="focus:outline-none hover:text-sky-600 mb-4 flex flex-col items-center"
              >
                {menuItem.icon}
                <span className="mt-2">{menuItem.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <hr />
      <img aria-disabled src={logoFunnel} alt="" />
    </div>
  );
};

export default Navbar;
