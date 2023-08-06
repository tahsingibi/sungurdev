import React from 'react'

export function Skeleton() {
  return (
    <div className="w-full flex flex-col gap-2">
        <div className="animate-pulse w-40 h-10 bg-zinc-100 rounded-lg mb-4"/>
        <div className="animate-pulse w-8/12 h-6 bg-zinc-100 rounded-lg"/>
        <div className="animate-pulse w-9/12 h-6 bg-zinc-100 rounded-lg"/>
        <div className="animate-pulse w-10/12 h-6 bg-zinc-100 rounded-lg"/>
        <div className="animate-pulse w-9/12 h-6 bg-zinc-100 rounded-lg"/>
        <div className="animate-pulse w-12/12 h-6 bg-zinc-100 rounded-lg"/>
    </div>
  )
}
