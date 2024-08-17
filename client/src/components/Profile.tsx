import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Textbox } from "./Textbox"
import { TextboxLabel } from "./TextboxLabel";

type ProfileProps = {
  accountAddress: string;
}

export const Profile = (props : ProfileProps) => {

  const [namePlaceholder, setNamePlaceholder] = useState<string | null>(null);
  const [emailPlaceholder, setEmailPlaceholder] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [buttonLabel, setButtonLabel] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = [name, email, props.accountAddress]
    fetch('/api/v1/profile', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then((res) => {
      setButtonLabel("Changes saved");
      setTimeout(() => {navigate('/')}, 100);
    });
  }


  const getProfileInfo = async () => {
    const res = await (await fetch(`/api/v1/profile/${props.accountAddress}`, {
        method: 'GET',
      })).json();
    setNamePlaceholder(res.name);
    setEmailPlaceholder(res.email);
    setButtonLabel("Save changes");
  }

  useEffect(() => {
    getProfileInfo();
  }, [])

  return (
    <div className="content">
      <h1 className="text-[#F9FAFA] text-6xl font-bold leading-tight tracking-[-0.015em] px-4 pt-4">Profile</h1>
      <form onSubmit={handleSubmit} style={{display: 'block'}}>
        <TextboxLabel label={"Name"} />
        <Textbox handleChange={handleNameChange} placeholder={namePlaceholder != null ? namePlaceholder : "Enter your full name"} canEdit={true}/> 
        <TextboxLabel label={"Email"} />
        <Textbox handleChange={handleEmailChange} placeholder={emailPlaceholder != null ? emailPlaceholder : "Enter your email address"} canEdit={true}/> 
        <TextboxLabel label={"Wallet Address (cannot be edited)"} />
        <Textbox placeholder="" canEdit={false} value={props.accountAddress}/>
        <Button label={buttonLabel} />
      </form>
    </div>
  )
}
