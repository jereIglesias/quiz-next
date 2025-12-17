"use client"
import React, { useEffect, useState } from 'react'
import preguntasData from '../../data/preguntas.json'
import TarjetaPregunta from '../../components/TarjetaPregunta'
import ResultadosFinales from '../../components/ResultadosFinales'

export default function QuizPage(){
  const [preguntas, setPreguntas] = useState<any[]>([])
  const [curIdx, setCurIdx] = useState(0)
  const [puntaje, setPuntaje] = useState(0)
  const [respuestasUsuario, setRespuestasUsuario] = useState<any[]>([])
  const [terminado, setTerminado] = useState(false)

  useEffect(()=>{
    // cargar 10 preguntas por defecto
    setPreguntas(preguntasData.preguntas.slice(0,10))
  },[])

  function manejarRespuesta(selectedIndex:number){
    const pregunta = preguntas[curIdx]
    // selectedIndex === -1 significa timeout
    if (selectedIndex === -1){
      // tiempo agotado: registrar respuesta no respondida y decrementar puntaje
      setRespuestasUsuario((r)=>[...r, { preguntaId: pregunta.id, seleccion: null, correcta: false }])
      setPuntaje((p)=>p-1)
      return
    }
    const correcta = selectedIndex === pregunta.respuestaCorrecta
    if (correcta) setPuntaje((p)=>p+1)
    setRespuestasUsuario((r)=>[...r, { preguntaId: pregunta.id, seleccion:selectedIndex, correcta }])
  }

  function siguiente(){
    if (curIdx + 1 >= preguntas.length){
      setTerminado(true)
    } else {
      setCurIdx((i)=>i+1)
    }
  }

  if (!preguntas.length) return <div>Cargando...</div>
  if (terminado) return <ResultadosFinales puntaje={puntaje} total={preguntas.length} respuestas={respuestasUsuario} preguntas={preguntas} />

  return (
    <section>
      <div className="mb-4">
        <div className="text-sm text-gray-600">Pregunta <strong>{curIdx+1}</strong> de <strong>{preguntas.length}</strong></div>
        <div className="text-sm text-gray-600">Puntaje: <strong>{puntaje}</strong></div>
      </div>

      <TarjetaPregunta
        pregunta={preguntas[curIdx]}
        onAnswer={(idx:number)=>{ manejarRespuesta(idx) }}
        onNext={()=>{ siguiente() }}
      />
    </section>
  )
}
