import Atropos from "atropos/react"
import 'atropos/css'


export function AtroposCard({data, slug}) {
  return (
    <Atropos
      className={'my-atropos hover:saturate-[1.2] transition-all duration-150 aspect-auto'}
      rotateXMax={1}
      rotateYMax={1}
      activeOffset={10}
      highlight={true}
    >
      <a 
        className="rounded-2xl flex flex-col items-center p-4 bg-slate-100"
        href={`/plan/${slug}`}
      >
        {data.image && 
          <img 
            src={data.image} 
            className="w-full rounded-2xl aspect-auto object-cover transition-all" 
            transition:name={`img-${slug}`}
            data-atropos-offset="1" 
          />
        }
        <div className="p-4 flex flex-col items-center">
          <h3
            className="text-3xl text-primary font-bold"
            transition:name={`title-${slug}`}
          >
            {data.title}
          </h3>
          {/* <p>{subtitle}</p>
          <div className="prose">{body}</div> */}

          {/* Valores de ejemplo */}
          <p className="text-sm my-2">
            Ejemplo de cuota: $ {Number(data.cuotaEjemplo).toLocaleString()}
          </p>
          <p className="italic text-xs">
            Si tu compra es de $ {Number(data.valorEjemplo).toLocaleString()}
          </p>

          {/* Botón */}
          <span
            className="mt-4 text-primary underline hover:text-primary-dark transition"
          >
            Ver más
          </span>
        </div>
      </a>
    </Atropos>
  )
}

