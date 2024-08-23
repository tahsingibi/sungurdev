import React from 'react'

export default function Placeholder() {
    return (
        <div className={"grid gap-4"}>
            <div className="block bg-white/5 rounded-md animate-pulse w-4/12 h-10 after:[animation:placeholder_4s_infinite_linear]" />
            <div className="block w-full bg-white/5 h-5 rounded-md animate-pulse after:[animation:placeholder_4s_infinite_linear]" />
            <div className="block w-full bg-white/5 h-5 rounded-md animate-pulse after:[animation:placeholder_4s_infinite_linear]" />
            <div className="block w-full bg-white/5 h-5 rounded-md animate-pulse after:[animation:placeholder_4s_infinite_linear]" />
            <div className="block w-full bg-white/5 h-5 rounded-md animate-pulse after:[animation:placeholder_4s_infinite_linear]" />
        </div>
    )
}
