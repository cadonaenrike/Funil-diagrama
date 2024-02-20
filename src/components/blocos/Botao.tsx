interface BotaoProps {
  label: string;
  backgroundColor: string;
  // color: string;
  // link: string;
}

export function Botao({ label, backgroundColor }: BotaoProps) {
  return (
    <button
      className={`rounded-md py-2 px-8 ${
        backgroundColor ? `bg-[${backgroundColor}]` : "bg-[#15a22d]"
      }`}
    >
      {label || "CLIQUE AQUI PARA CONFIGURAR O BOTÃO"}
    </button>
  );
}
