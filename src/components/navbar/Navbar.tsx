import {
  FaFunnelDollar,
  FaFlagCheckered,
  FaTag,
  FaWhatsapp,
  FaUser,
} from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { NodeType } from "../../configs/types/NodeType";
import { MenuItem } from "./Menu";

interface NavbarProps {
  onMenuItemClick: (
    type: NodeType["type"],
    position: { x: number; y: number }
  ) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuItemClick }) => {
  const menuItems = [
    { label: "Campanha", type: "square", icon: <FaFlagCheckered /> },
    { label: "Funil", type: "funnel", icon: <FaFunnelDollar /> },
    { label: "Leads", type: "create", icon: <FaUser /> },
    { label: "WhatsApp", type: "whatsApp", icon: <FaWhatsapp /> },
    { label: "Timer", type: "timer", icon: <TfiTimer /> },
    { label: "Tag", type: "tag", icon: <FaTag /> },
  ];

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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleMenuItemClick = (menuItem: MenuItem) => {
    const initialPosition = {
      y: 600,
      x: 400,
    };
    onMenuItemClick(menuItem.type as NodeType["type"], initialPosition);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="fixed top-1/2 transform -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 w-52 pt-4 h-3/6 flex flex-col justify-evenly"
    >
      <h2 className="text-lg font-bold mb-4 text-center">Clique nos ícones</h2>
      <div className="grid grid-cols-2">
        {menuItems.map((menuItem) => (
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
      <hr />
      <img
        aria-disabled
        src="../../../public/funnelads 3. hrzt_Prancheta 1 cópia 7_Prancheta 1 cópia 8.png"
        alt=""
      />
    </div>
  );
};

export default Navbar;
