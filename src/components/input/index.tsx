import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ type = "text", ...props }: InputProps) {
  return (
    <>
      <input
        type={type}
        className="bg-white border-0 h-9 rounded-md outline-none px-2 mb-3"
        {...props}
      />
    </>
  );
}
