export function Texto() {
  return (
   
      <div className="flex bg-[#242424] w-11/12 items-center justify-center pt-3 pb-8 rounded-lg">
        <textarea
          name=""
          id=""
          cols={34}
          rows={2}
          placeholder="Digite aqui..."
          className="rounded-lg bg-transparent focus:border-blue-500 w-10/12"
        ></textarea>
      </div>
   
  );
}
