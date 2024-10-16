import React from "react";
import Link from "next/link"; // Link가 필요할 경우

interface ButtonProps {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary"; // 추가할 변형 정의
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, href, children, variant = "default", className }) => {
  // 각 변형에 대한 스타일 정의
  const variantStyles = {
    default: "bg-[#F6F6F6] text-black hover:bg-[#FFA500]",
    primary: "bg-[#003366] text-white hover:bg-[#012346]",
    secondary: "bg-[#9A9A9A] text-black hover:bg-[#888888]"
  };

  const baseStyles =
    "rounded-full w-40 h-12 flex items-center justify-center transition-colors duration-200 hover:font-semibold";
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return href ? (
    <Link href={href} className={combinedStyles}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
};

export default Button;
