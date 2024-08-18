type RadioOption = {
  name: string;
  label: string;
  value: string;
};

type RadioGroupProps = {
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
};

// Present while choosing between wallets to connect
export const RadioCarousel = (props: RadioGroupProps) => {
  return (
    <div className="shadow-3xl flex h-10 flex-1 items-center justify-center rounded-lg bg-[#3C3F4A] p-1">
      {props.options.map((option) => (
          <label className="coinSelectorButton flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-[#1C1D22] has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-[#F9FAFA] text-[#D5D6DD] text-sm font-medium leading-normal">
            <span className="truncate">{option.label}</span>
            <input type="radio" name={option.name} className="invisible w-0" value={option.value} checked={props.selectedValue === option.value} onChange={() => props.onChange(option.value)}/>
          </label>
      ))}
    </div>
  );
};
