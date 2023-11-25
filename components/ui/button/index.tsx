import React, { MouseEventHandler } from 'react'
import styles from './style.module.scss'
import { BSIcons, clsx } from '@/utils'

type ButtonType = {
    text?: string,
    icon?: string,
    theme?: string
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

export default function Button({ text, icon, theme, onClick, ...props }: Readonly<ButtonType>) {

    return (
        <button {...props} className={clsx([styles.button, !text && icon ? styles.onlyIcon : '', styles[`theme_${theme}`]])} onClick={onClick}>
            {icon && <BSIcons icon={icon} />}
            {text}
        </button>
    )
}
