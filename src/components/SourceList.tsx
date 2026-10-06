import type { Source } from '../data/roadmap.ts';

interface SourceListProps {
  sources: Source[];
}

const KIND_LABELS: Record<Source['kind'], string> = {
  docs: 'Docs',
  article: 'Artículo',
  video: 'Vídeo',
  course: 'Curso',
  book: 'Libro',
  repo: 'Repo',
};

export function SourceList({ sources }: SourceListProps) {
  return (
    <ul className="source-list">
      {sources.map((source) => (
        <li key={source.url} className="source-item">
          <a
            className="source-item__link"
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {source.title}
          </a>
          <div className="source-item__meta">
            <span className="badge">{KIND_LABELS[source.kind]}</span>
            <span className="badge">{source.lang.toUpperCase()}</span>
            <span>{source.why}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
