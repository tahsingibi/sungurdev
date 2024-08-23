import React from 'react'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="flex my-8 items-center text-white/25">sungur.dev &copy; {year}</footer>
    )
}
