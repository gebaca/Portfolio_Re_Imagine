interface Props {
  index: number;
  title: string;
  year: string;
  stack: string[];
  url: string;
  dotColor: string;
  isLeft?: boolean;
}

export function ProjectItem({
  index,
  title,
  year,
  stack,
  url,
  dotColor,
  isLeft,
}: Props) {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener'
      onClick={(e) => e.stopPropagation()}
      className='group flex flex-col gap-1.5 py-3 no-underline'
      style={{
        paddingRight: isLeft ? '20px' : '0',
        paddingLeft: isLeft ? '0' : '20px',
      }}
    >
      {/* Punto Tullet + índice */}
      <div className='flex items-center gap-2'>
        <span
          className='w-2 h-2 rounded-full flex-shrink-0'
          style={{ background: dotColor }}
        />
        <span className='text-[10px] font-bold tracking-widest text-zinc-300'>
          {String(index).padStart(2, '0')}
        </span>
      </div>

      {/* Título */}
      <div
        className='text-[13px] font-semibold uppercase tracking-wider text-zinc-900 
                group-hover:opacity-50 transition-opacity leading-tight
                overflow-hidden text-ellipsis whitespace-nowrap'
      >
        {title}
      </div>

      {/* Año */}
      <div className='text-[11px] text-zinc-400 tabular-nums'>{year}</div>

      {/* Stack — debajo, en dos líneas si hace falta */}
      <div
        className='text-[10px] text-zinc-400 tracking-wide leading-relaxed
                overflow-hidden'
      >
        {stack.join(' · ')}
      </div>

      {/* Link */}
      <div className='text-[10px] uppercase tracking-widest text-zinc-300 group-hover:text-zinc-900 transition-colors mt-1'>
        ↗ Ver
      </div>
    </a>
  );
}
