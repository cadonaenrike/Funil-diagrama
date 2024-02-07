interface ToggleSwitchProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ toggle, setToggle }) => {
  const toggleClass = " transform translate-x-8";
  return (
    <div
      className={`md:w-12 md:h-5 w-10 h-5 flex items-center border-2 border-gray-200 rounded-full p-1 cursor-pointer shadow-lg ${
        toggle ? "bg-primary border-none" : ""
      }`}
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      <div
        className={
          "bg-white shadow-lg h-5 w-5 rounded-full -ml-2 transform duration-300 ease-in-out" +
          (!toggle ? null : toggleClass)
        }
      ></div>
    </div>
  );
};

export default ToggleSwitch;
