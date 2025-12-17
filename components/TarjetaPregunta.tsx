"use client"
import React, { useState } from 'react'
import OpcionRespuesta from './OpcionRespuesta'
import Temporizador from './Temporizador'

type Pregunta = {
  id: number
  pregunta: string
  opciones: string[]
  respuestaCorrecta: number
  explicacion?: string
}

type Props = {
  pregunta: Pregunta
  onAnswer: (selectedIndex:number)=>void
  onNext: ()=>void
}

export default function TarjetaPregunta({ pregunta, onAnswer, onNext }: Props){
  const [seleccionada, setSeleccionada] = useState<number | null>(null)
  const [mostradoFeedback, setMostradoFeedback] = useState(false)

  function handleClick(idx:number){
    if (mostradoFeedback) return
    setSeleccionada(idx)
    setMostradoFeedback(true)
    onAnswer(idx)
  }

  function handleTimeout(){
    if (mostradoFeedback) return
    setSeleccionada(null)
    setMostradoFeedback(true)
    onAnswer(-1) // señal de timeout
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-3">{pregunta.pregunta}</h3>

      <div>
        {pregunta.opciones.map((opt, i)=>{
          let estado: 'normal'|'correcto'|'incorrecto' = 'normal'
          if (mostradoFeedback){
            if (i === pregunta.respuestaCorrecta) estado = 'correcto'
            else if (i === seleccionada && i !== pregunta.respuestaCorrecta) estado = 'incorrecto'
          }
          return (
            <OpcionRespuesta
              key={i}
              index={i}
              texto={opt}
              disabled={mostradoFeedback}
              estado={estado}
              onClick={handleClick}
            />
          )
        })}
      </div>

      {!mostradoFeedback && (
        <Temporizador duracionSegundos={60} onExpire={handleTimeout} />
      )}

      {mostradoFeedback && (
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">
            {seleccionada === pregunta.respuestaCorrecta ? (
              <span className="text-green-700">¡Correcto!</span>
            ) : seleccionada === null ? (
              <span className="text-red-700">Tiempo agotado</span>
            ) : (
              <span className="text-red-700">Incorrecto</span>
            )}
          </div>

          {pregunta.explicacion && (
            <div className="text-sm text-gray-600 mb-3">{pregunta.explicacion}</div>
          )}

          <div className="flex justify-end">
            <button className="px-4 py-2 bg-gray-100 rounded-md" onClick={()=>{ setMostradoFeedback(false); setSeleccionada(null); onNext() }}>
              Siguiente →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
