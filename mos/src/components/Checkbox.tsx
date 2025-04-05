import Checkmark from "@/svg/checkmark";

function Checkbox({ id, active }: { id: string; active: boolean }) {
  return (
    <label
      className="w-[30px] h-[30px] rounded-[8px] border-color-[var(--primary-text)] border-[1px] border-solid duration-250 cursor-pointer p-[1px]!"
      style={{
        backgroundColor: active ? "var(--primary-text)" : "rgba(0,0,0,0)",
        stroke: active ? "var(--primary-bg)" : "rgba(0,0,0,0)",
      }}
    >
      <Checkmark />
      <input id={id} type="checkbox" className="hidden" disabled />
    </label>
  );
}

export default Checkbox;
