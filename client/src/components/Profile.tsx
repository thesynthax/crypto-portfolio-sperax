import React, { useState } from "react";
import { Button } from "./Button";
import { Textbox } from "./Textbox"
import { TextboxLabel } from "./TextboxLabel";

type ProfileProps = {
  accountAddress: string;
}

export const Profile = (props : ProfileProps) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = [name, email, props.accountAddress]
    fetch('/profile', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div className="content">
      <h1 className="text-[#F9FAFA] text-6xl font-bold leading-tight tracking-[-0.015em] px-4 pt-4">Profile</h1>
      <form onSubmit={handleSubmit} style={{display: 'block'}}>
        <TextboxLabel label={"Name"} />
        <Textbox handleChange={handleNameChange} placeholder="Enter your full name" canEdit={true}/> 
        <TextboxLabel label={"Email"} />
        <Textbox handleChange={handleEmailChange} placeholder="Enter your email address" canEdit={true}/> 
        <TextboxLabel label={"Wallet Address (cannot be edited)"} />
        <Textbox placeholder="" canEdit={false} value={props.accountAddress}/>
        <Button label={"Save changes"} />
      </form>
    </div>
  )
}
