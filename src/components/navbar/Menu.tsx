// Em Menu.tsx

export interface MenuItem {
  label: string;
  type: string;
  border?: string;
  icon?: string | JSX.Element;
  icon2?: string | JSX.Element;
}

interface MenuProps {
  isOpen: boolean;
  items: MenuItem[];
  onItemClick: (menuItem: MenuItem) => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, items, onItemClick }) => {
  return (
    <div
      className={`bottom-full ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => onItemClick(item)}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
