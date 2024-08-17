import { ChangeEventHandler } from "react";

type TextboxProps = {
  placeholder: string;
  canEdit: boolean;
  handleChange?: Function;
  icon?: string;
  value?: string;
}

export const Textbox = (props: TextboxProps) => {
  return (
    <div className="px-4 py-3">
      <label className="flex flex-col min-w-40 h-12 w-full">
        <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
          <div className="text-[#D5D6DD] flex border-none bg-[#3C3F4A] items-center justify-center pl-4 rounded-l-lg border-r-0">
          </div>
          <input onChange={(e) => {if (props.handleChange) props.handleChange(e)}} placeholder={props.placeholder} style={!props.canEdit ? {color: 'black'} : {color: 'white'}} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border-none bg-[#3C3F4A] focus:border-none h-full placeholder:text-[#808080] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" value={props.value}/>
        </div>
      </label>
    </div>
  )
}
