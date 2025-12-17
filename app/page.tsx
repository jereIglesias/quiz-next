import Link from 'next/link'

export default function Home(){
  return (
    <section className="card">
      <h1 className="text-4xl font-bold mb-4 text-center">Quiz Interactivo</h1>
      <p className="text-gray-600 mb-6 text-center">Pon a prueba tus conocimientos con preguntas de opción múltiple sobre tecnología, desarrollo web y JavaScript.</p>
      <div className="flex justify-center gap-3 flex-wrap">
        <Link href="/quiz" className="button-primary inline-block">▶ Comenzar Quiz</Link>
      </div>
    </section>
  )
}
