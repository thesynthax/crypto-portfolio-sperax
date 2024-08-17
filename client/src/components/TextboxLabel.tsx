type TextboxLabelProps = {
  label: string;
}

export const TextboxLabel = (props : TextboxLabelProps) => {
  return (
    <div>
      <h3 className="text-[#F9FAFA] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pt-4">{props.label}</h3>
    </div>
  )
}
