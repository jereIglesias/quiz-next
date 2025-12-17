"use client"
import React, { useEffect, useState } from 'react'

export default function Temporizador({ duracionSegundos, onExpire }: { duracionSegundos:number, onExpire: ()=>void }){
  const [segundos, setSegundos] = useState(duracionSegundos)

  useEffect(()=>{
    setSegundos(duracionSegundos)
  },[duracionSegundos])

  useEffect(()=>{
    if (segundos <= 0){
      onExpire()
      return
    }
    const t = setTimeout(()=> setSegundos(s=>s-1), 1000)
    return ()=> clearTimeout(t)
  },[segundos, onExpire])

  const pct = Math.max(0, (segundos / duracionSegundos) * 100)

  return (
    <div className="mt-4">
      <div className="text-sm text-gray-600 mb-2">Tiempo restante: <strong>{segundos}s</strong></div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div style={{ width: `${pct}%` }} className="h-full bg-indigo-500"></div>
      </div>
    </div>
  )
}
