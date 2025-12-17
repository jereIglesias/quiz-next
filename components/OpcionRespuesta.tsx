"use client"
import React from 'react'

type Props = {
  index: number
  texto: string
  disabled?: boolean
  estado?: 'normal' | 'correcto' | 'incorrecto'
  onClick: (i:number)=>void
}

export default function OpcionRespuesta({ index, texto, disabled=false, estado='normal', onClick }: Props){
  const base = "option-btn border-gray-200"
  const classes = estado === 'correcto' ? `${base} option-correct border` : estado === 'incorrecto' ? `${base} option-wrong border` : base

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={()=>onClick(index)}
    >
      {texto}
    </button>
  )
}
