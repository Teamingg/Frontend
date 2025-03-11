'use client';
import {forwardRef, ReactNode, MouseEvent} from 'react';
import clsx from "clsx";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary';
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className,
  type = 'button',
  size = 'md',
  color = 'primary',
  disabled,
  icon,
  onClick,
  ariaLabel,
}, ref) => {
  // 접근성 개성 (아리아 라벨 자동으로 추가)
  const aria = ariaLabel
    ? ariaLabel
    : !children && icon
    ? 'Button with icon'
    : undefined
  
  // 버튼 스타일
  const buttonColor = clsx({
    'bg-primary text-white hover:bg-blue-600': color === 'primary',
    'bg-secondary border-1 border-gray-200 hover:bg-gray-50': color === 'secondary'
  })
  
  const buttonSize = clsx({
    "px-3 py-1 text-sm": size === "sm",   // 작은 버튼
    "px-4 py-2 text-base": size === "md", // 기본 크기
    "px-6 py-3 text-lg": size === "lg",   // 큰 버튼
    "px-8 py-4 text-xl": size === "xl",   // 가장 큰 버튼
  });
  
  const buttonClass = clsx(
    "cursor-pointer rounded-lg transition disabled:bg-gray-200 disabled:text-gray-400",
    buttonSize, buttonColor, className
  );
  
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled ?? false}
      aria-label={aria}>
      {icon && icon}
      {children}
    </button>
  )
})

Button.displayName = 'Button';
export default Button;