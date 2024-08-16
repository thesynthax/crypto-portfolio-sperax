import { Textbox } from "./Textbox"

type ProfileProps = {
  accountAddress: string;
}

export const Profile = (props : ProfileProps) => {
  return (
    <div className="content">
      <Textbox placeholder="hello" value={props.accountAddress}/> 
      <Textbox placeholder="testing" /> 
    </div>
  )
}
