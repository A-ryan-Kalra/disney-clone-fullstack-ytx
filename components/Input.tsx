import React from "react";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

function Input({ id, onChange, label, value, type }: InputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        required
        onChange={onChange}
        className="block rounded-md px-6 pt-6 text-[15px] pb-1 w-full appearance-none bg-neutral-700 text-white focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      {/* label tag is connected to input tag via peer that makes any changes in input tag would trigger label tag to behave as per the command.
       */}
      <label
        htmlFor={id}
        className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 "
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
