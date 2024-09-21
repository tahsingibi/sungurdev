import React, { MouseEventHandler } from 'react'
import { Icon } from '@/components/custom/icon'

type ButtonType = {
    text?: string,
    icon?: string,
    theme?: string
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

export default function Button({ text, icon, onClick, ...props }: Readonly<ButtonType>) {
    return (
        <button {...props} className={`text-zinc-400 rounded px-3 py-1 flex gap-3 items-center justify-center transition-all duration-100 hover:bg-red-900/60 active:translate-y-0.5 ${!text && icon ? "aspect-square" : ''}`} onClick={onClick}>
            {icon && <Icon icon={icon} />}
            {text}
        </button>
    )
}
