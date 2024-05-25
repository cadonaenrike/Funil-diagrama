interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  fluxoName: string;
  setFluxoName: (name: string) => void;
  selectedPasta: string;
  setSelectedPasta: (id: string) => void;
  pastas: { id: string; name: string }[];
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  fluxoName,
  setFluxoName,
  selectedPasta,
  setSelectedPasta,
  pastas,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-secondary-900 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 s sm:text-left">
              <h3 className="pl-32 text-xl text-center leading-6 font-medium text-white">
                Salvar Fluxo
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-300">
                  Preencha os detalhes abaixo para salvar o fluxo.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="fluxoName"
              className="block text-sm font-medium text-white"
            >
              Nome do Fluxo
            </label>
            <input
              type="text"
              id="fluxoName"
              className="mt-1 block w-full border border-gray-800 rounded-md shadow-sm"
              value={fluxoName}
              onChange={(e) => setFluxoName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="pasta"
              className="block text-sm font-medium text-white"
            >
              Pasta
            </label>
            <select
              id="pasta"
              className="mt-1 block w-full border border-gray-800 rounded-md shadow-sm"
              value={selectedPasta}
              onChange={(e) => setSelectedPasta(e.target.value)}
            >
              <option value="">Selecione uma pasta</option>
              {pastas.map((pasta) => (
                <option key={pasta.id} value={pasta.id}>
                  {pasta.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={onSave}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#046a04] text-base font-medium text-white hover:bg-success-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success-600 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Salvar
          </button>
          <button
            onClick={onClose}
            className="mt-3 w-full inline-flex justify-center rounded-md bg-red-800 border border-red-700 shadow-sm px-4 py-2  text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
