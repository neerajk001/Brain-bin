import React from "react";
import type { ReactElement } from "react";


type ButtonVariants = "primary" | "secondary" | "danger" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariants;
  onClick?: () => void;
  startIcons?: ReactElement;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  startIcons,
}) => {
  const baseStyles =
    "px-2 py-1.5 rounded-xl font-semibold backdrop-blur-lg bg-white/20 text-white shadow-[0_4px_30px_rgba(255,255,255,0.1)] border border-white/30 transition-all duration-300";

  const variants: Record<ButtonVariants, string> = {
    primary: "hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]",
    secondary: "hover:bg-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]",
    danger: "hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]",
    outline: "bg-transparent border border-white/20 hover:bg-white/10",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className} flex items-center gap-2`}
      disabled={disabled}
    >
      {startIcons && <span>{startIcons}</span>}
      {children}
    </button>
  );
};

export default Button;
