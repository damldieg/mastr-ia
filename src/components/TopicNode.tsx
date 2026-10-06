import type { Topic } from '../data/roadmap.ts';
import type { ProgressStatus } from '../lib/progress.ts';

interface TopicNodeProps {
  topic: Topic;
  status: ProgressStatus;
  onClick: () => void;
}

const PRIORITY_LABELS: Record<Topic['priority'], string> = {
  core: 'Core',
  recommended: 'Recomendado',
  optional: 'Optional',
};

const STATUS_LABELS: Record<ProgressStatus, string> = {
  pending: 'Pendiente',
  'in-progress': 'En curso',
  done: 'Hecho',
  skipped: 'Saltado',
};

export function TopicNode({ topic, status, onClick }: TopicNodeProps) {
  return (
    <li>
      <button
        type="button"
        className={`topic-node topic-node--${topic.priority}`}
        onClick={onClick}
        aria-label={`${topic.title}, ${PRIORITY_LABELS[topic.priority]}, ${STATUS_LABELS[status]}`}
      >
        <span className="topic-node__shape" aria-hidden="true" />
        <span className="topic-node__title">{topic.title}</span>
        <span className="topic-node__priority">{PRIORITY_LABELS[topic.priority]}</span>
        <span
          className={`topic-node__status topic-node__status--${status}`}
          aria-hidden="true"
        />
      </button>
    </li>
  );
}
