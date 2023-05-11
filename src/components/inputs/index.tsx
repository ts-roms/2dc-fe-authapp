import clsx from 'clsx';
import { ChangeEvent } from 'react';
type InputFieldProps = {
  type: string,
  name: string,
  value?: string,
  className?: string,
  label?: string,
  placeholder?: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  type,
  name,
  value,
  className,
  label,
  placeholder,
  onChange,
  ...rest
}: InputFieldProps) => {
  return (
    <>
      {label ? (<label className='text-gray-500 capitalize font-light text-left text-sm'>{label}</label>) : null}
      <input type={type} name={name} value={value} placeholder={placeholder} className={clsx(className)} onChange={onChange} {...rest} />
    </>
  )
}

export default InputField;