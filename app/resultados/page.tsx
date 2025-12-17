import Link from 'next/link'

export default function ResultadosPage(){
  return (
    <section className="card">
      <h2 className="text-2xl font-bold mb-4">Resultados</h2>
      <p className="text-gray-600 mb-4">Los resultados aparecerán aquí cuando completes un quiz.</p>
      <Link href="/" className="button-primary inline-block">← Volver al Inicio</Link>
    </section>
  )
}
