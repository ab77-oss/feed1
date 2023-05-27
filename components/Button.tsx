import React from 'react';
import {IconType} from 'react-icons'

interface ButtonProps {
    label:string;
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
    disabled?:boolean;
    outline?:boolean;
    small?:boolean;
    icon?:IconType;
    reduce?:boolean;
    width?:boolean;
    jasper?:boolean;
    royal?:boolean;
    padding?:boolean;
    venetian?:boolean;
    font13?:boolean;
    font14?:boolean
}

const Button:React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    reduce,
    icon:Icon,
    width,
    jasper,
    royal,
    padding,
    venetian,
    font13,
    font14
}) => {
  return (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            colStart
            
            ${outline? 'bg-white':'bg-rose-500'}
            ${outline? 'border-black':'border-rose-500'}
            ${outline? 'text-black':'text-white'}
            ${small? 'text-sm':'text-md'}
            ${small? 'py-1':'py-3'}
            ${small? 'font-light':'font-semibold'}
            ${small? 'border-[1px]':'border-2'}
            ${reduce? 'bg-jewel_cave':''}
            ${width?  'w-full':''}
            ${jasper?'bg-jasper':''}
            ${royal?'bg-royal_blue':''}
            ${padding?'p-2':''}
            ${venetian?'bg-venetian_red':''}
            ${font13?'font-[13px]':''}
            ${font14?'font-[14px]':''}
           
        `}
    >
        {
            Icon && (
                <Icon 
                    size={24}
                    className='
                        absolute
                        left-4
                        top-3
                    '
                />
            )}
            {label}
    </button>
  );
}

export default Button;