import React from 'react'

export function BSIcons({ icon, className = "" }: any) {
    return <i className={`bi bi-${icon} ${className}`}></i>
}
