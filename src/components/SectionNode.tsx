import type { Section } from '../data/roadmap.ts';
import type { ProgressStatus } from '../lib/progress.ts';
import { sectionProgress } from '../lib/progress.ts';
import { TopicNode } from './TopicNode.tsx';

interface SectionNodeProps {
  section: Section;
  statuses: Record<string, ProgressStatus>;
  onSelectTopic: (topicId: string) => void;
}

export function SectionNode({ section, statuses, onSelectTopic }: SectionNodeProps) {
  const progress = sectionProgress(section, statuses);

  return (
    <article className="section-node" aria-labelledby={`section-${section.id}`}>
      <header className="section-node__header">
        <h2 id={`section-${section.id}`} className="section-node__title">
          {section.title}
        </h2>
        <span className="section-node__progress">
          {progress.done}/{progress.counted} ({progress.percent}%)
        </span>
      </header>
      <p className="section-node__goal">{section.goal}</p>
      <ul className="topics-list" role="list">
        {section.topics.map((topic) => (
          <TopicNode
            key={topic.id}
            topic={topic}
            status={statuses[topic.id] ?? 'pending'}
            onClick={() => {
              onSelectTopic(topic.id);
            }}
          />
        ))}
      </ul>
    </article>
  );
}
