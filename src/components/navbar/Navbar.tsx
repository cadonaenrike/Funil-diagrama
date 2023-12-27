import {
  FaFunnelDollar,
  FaFlagCheckered,
  FaTag,
  FaWhatsapp,
  FaUser,
} from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";

interface NavbarProps {
  onMenuItemClick: (type: string) => void;
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleMenuItemClick = (menuItem) => {
    onMenuItemClick(menuItem.type);
  };

  return (
    <div className="fixed top-1/2 transform -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 w-64 pt-4">
      <h2 className="text-lg font-bold mb-4">Clique nos ícones</h2>
      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((menuItem) => (
          <button
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
  );
};

export default Navbar;
