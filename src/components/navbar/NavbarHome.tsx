import { TfiTimer } from "react-icons/tfi";
import { NodeType } from "../../configs/types/NodeType";
import { MenuItem } from "./Menu";

interface NavbarProps {
  onMenuItemClick: (
    type: NodeType["type"],
    position: { x: number; y: number }
  ) => void;
}

const NavbarHome: React.FC<NavbarProps> = ({ onMenuItemClick }) => {
  const menuItems = [
    {
      label: "Sequencia Mista",
      type: "seqmista",
      border: "#aa3333",
      icon: "../../../public/sequenciamista.svg",
    },
    {
      label: "Sequencia WhatsApp",
      type: "seqwhatsapp",
      border: "#24af3b",
      icon: "../../../public/sequenciawhatsapp.svg",
    },
    {
      label: "Sequencia SMS",
      type: "seqsms",
      border: "#393970",
      icon: "../../../public/sequenciasms.png",
    },
    {
      label: "Sequencia Email",
      type: "seqemail",
      border: "#774E30",
      icon: "../../../public/sequenciaemail.png",
    },
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
      className="whitespace-nowrap overflow-hidden text-ellipsis fixed top-1/2 transform -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 w-52 pt-4 h-4/6 flex flex-col justify-evenly"
    >
      <h2 className="text-lg font-bold mb-4 text-center">Clique nos ícones</h2>
      <div className="grid grid-cols-1 items-center justify-center">
        <section className="flex items-center justify-center border-b border-gray-600 mb-3">
          <button
            draggable
            className="focus:outline-none w-20 hover:bg-[#000000d3] rounded-lg hover:text-white mb-4 flex flex-col items-center"
          >
            <TfiTimer />
            <span className="mt-2">Timer</span>
          </button>
        </section>
        {menuItems.map((menuItem) => (
          <button
            draggable
            style={{ borderColor: menuItem.border }}
            onDragStart={(e) => handleDragStart(e, menuItem)}
            key={menuItem.type}
            onClick={() => handleMenuItemClick(menuItem)}
            className="focus:outline-none mb-1 flex flex-col items-center border-2 rounded-lg py-2 px-6 border-dotted whitespace-nowrap overflow-hidden text-ellipsis"
          >
            <img src={menuItem.icon} />
            <span className="text-xs">{menuItem.label}</span>
          </button>
        ))}
      </div>
      <hr />
      <img
        src="../../../public/funnelads 3. hrzt_Prancheta 1 cópia 7_Prancheta 1 cópia 8.png"
        alt=""
      />
    </div>
  );
};

export default NavbarHome;
