"use client"
import React from 'react'
import Link from 'next/link'

type Pregunta = {
  id: number
  pregunta: string
  opciones: string[]
  respuestaCorrecta: number
  explicacion?: string
}

type Props = {
  puntaje: number
  total: number
  respuestas: any[]
  preguntas: Pregunta[]
}

export default function ResultadosFinales({ puntaje, total, respuestas, preguntas }: Props){
  const porcentaje = Math.round((puntaje / total) * 100)

  return (
    <section>
      <div className="card mb-6 text-center">
        <h2 className="text-3xl font-bold mb-4">¡Cuestionario Completado!</h2>
        <div className="text-5xl font-bold text-indigo-600 mb-2">{puntaje}/{total}</div>
        <div className="text-2xl text-gray-700 mb-4">Porcentaje: <strong>{porcentaje}%</strong></div>
        {porcentaje >= 80 && <p className="text-lg text-green-600 mb-4">¡Excelente trabajo!</p>}
        {porcentaje >= 60 && porcentaje < 80 && <p className="text-lg text-blue-600 mb-4">¡Buen desempeño!</p>}
        {porcentaje < 60 && <p className="text-lg text-orange-600 mb-4">Intenta nuevamente.</p>}
        <div className="flex justify-center gap-3 flex-wrap">
          <button className="button-primary" onClick={()=>location.href='/quiz'}>🔄 Reiniciar Quiz</button>
          <Link href="/" className="px-4 py-2 border rounded-md inline-block">← Ir al Inicio</Link>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Resumen de Respuestas</h3>
        <div className="space-y-3">
          {respuestas.map((r, idx)=>{
            const p = preguntas.find(pp=>pp.id === r.preguntaId)
            if (!p) return null
            return (
              <div key={idx} className="p-3 border rounded-md bg-gray-50">
                <div className="text-sm font-semibold text-gray-700">Pregunta {idx + 1}: {p.pregunta}</div>
                <div className="text-sm mt-2">Tu respuesta: <strong>{r.seleccion !== null ? p.opciones[r.seleccion] : 'No respondida'}</strong></div>
                <div className="text-sm">Respuesta correcta: <strong>{p.opciones[p.respuestaCorrecta]}</strong></div>
                <div className="text-sm mt-2">
                  Estado: {r.correcta ? 
                    <span className="text-green-700 font-semibold">✓ Correcta</span> : 
                    <span className="text-red-700 font-semibold">✗ Incorrecta</span>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
