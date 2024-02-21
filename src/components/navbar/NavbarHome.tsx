import { TfiTimer } from "react-icons/tfi";
import { NodeType } from "../../configs/types/NodeType";
import { MenuItem } from "./Menu";
import fluxwhatsapp from "../../../public/images/sequenciawhatsapp.svg";
import fluxmista from "../../../public/images/sequenciamista.svg";
import fluxwsms from "../../../public/images/sequenciasms.png";
import fluxemail from "../../../public/images/sequenciaemail.png";
import logoFunnel from "../../../public/images/funnelads 3. hrzt_Prancheta 1 cópia 7_Prancheta 1 cópia 8.png";

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
      icon: fluxmista,
    },
    {
      label: "Sequencia WhatsApp",
      type: "seqwhatsapp",
      border: "#24af3b",
      icon: fluxwhatsapp,
    },
    {
      label: "Sequencia SMS",
      type: "seqsms",
      border: "#393970",
      icon: fluxwsms,
    },
    {
      label: "Sequencia Email",
      type: "seqemail",
      border: "#774E30",
      icon: fluxemail,
    },
  ];

  const timer = [
    {
      label: "Timer",
      type: "timer",
      border: "rgb(82 82 91 )",
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

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="whitespace-nowrap text-white overflow-hidden text-ellipsis fixed top-1/2 transform -translate-y-1/2 bg-black opacity-80 rounded-2xl shadow-lg border border-zinc-300 px-8 w-52 pt-4 h-auto flex flex-col justify-evenly"
    >
      <h2 className="text-lg  mb-2 text-center" draggable="false">
        Arraste os ícones
      </h2>
      <div className="grid grid-cols-1 items-center justify-center">
        <section className="flex items-start justify-center ">
          {timer.map((item) => (
            <button
              key={item.type}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="border-zinc-600 w-20 hover:bg-[#0b0b0f] py-3 rounded-lg  mb-2 flex flex-col items-center"
            >
              <TfiTimer size={25} />
              <span className="">{item.label}</span>
            </button>
          ))}
        </section>

        <div className="flex items-center my-2" draggable="false">
          <div className="w-14 border-t border-zinc-500"></div>
          <span className="text-center text-xs px-1">Agendamento</span>
          <div className="w-14 border-t border-zinc-500"></div>
        </div>

        {menuItems.map((menuItem) => (
          <button
            draggable
            style={{ borderColor: menuItem.border }}
            onDragStart={(e) => handleDragStart(e, menuItem)}
            key={menuItem.type}
            className="focus:outline-none mb-1 flex flex-col items-center border-2 rounded-lg py-2 px-6 border-dotted whitespace-nowrap overflow-hidden text-ellipsis"
          >
            <img className="invert" src={menuItem.icon} />
            <span className="text-xs">{menuItem.label}</span>
          </button>
        ))}
      </div>
      <hr />
      <img src={logoFunnel} alt="" draggable={false} />
    </div>
  );
};

export default NavbarHome;
