import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode,
  className: string,
  onClick: () => Promise<void>
}
const Button = ({
  children,
  className,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <>
      <button className={clsx(className)} onClick={onClick} {...rest}>
        {children}
      </button>
    </>
  )
}

export default Button;