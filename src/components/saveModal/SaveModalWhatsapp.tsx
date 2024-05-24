// src/pages/WhatsAppFlux.tsx

import { useState, useEffect } from "react";
import { getAllPastas } from "../../services/PastaService";

import { Pasta } from "../../types/PastaType";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";

const WhatsAppFlux: React.FC = () => {
  const [pastas, setPastas] = useState<Pasta[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [fluxoName, setFluxoName] = useState("");
  const [selectedPasta, setSelectedPasta] = useState<string>("");

  useEffect(() => {
    const fetchPastas = async () => {
      try {
        const data = await getAllPastas();
        setPastas(data);
      } catch (error) {
        console.error("Erro ao carregar pastas:", error);
      }
    };

    fetchPastas();
  }, []);

  const handleSave = () => {
    // Lógica para salvar o fluxo
    console.log("Salvar fluxo:", { fluxoName, selectedPasta });
    setShowModal(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Salvar
      </button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogTrigger asChild>
          <button className="hidden"></button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salvar Fluxo</DialogTitle>
            <DialogDescription>
              Preencha os detalhes abaixo para salvar o fluxo.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fluxoName"
                className="block text-sm font-medium text-gray-700"
              >
                Nome do Fluxo
              </label>
              <input
                type="text"
                id="fluxoName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                value={fluxoName}
                onChange={(e) => setFluxoName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="pasta"
                className="block text-sm font-medium text-gray-700"
              >
                Pasta
              </label>
              <select
                id="pasta"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
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
          <DialogFooter>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Salvar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WhatsAppFlux;
