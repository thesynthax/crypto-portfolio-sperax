import { FormEventHandler, MouseEventHandler } from "react";

type ButtonProps = {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props : ButtonProps) => {
  return (
    <div>
      <button onClick={props.onClick} style={{border: '1px solid #363943'}} className="flex ml-4 border min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 text-[#F9FAFA] text-lg font-bold leading-normal tracking-[0.015em]">
        <span className="truncate">{props.label}</span>
      </button>
    </div>
  )
}
