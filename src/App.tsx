import { useMemo, useRef, useState } from 'react';
import { SECTIONS, getAllTopicIds, getTopicById } from './data/roadmap.ts';
import { globalProgress, type ProgressStatus } from './lib/progress.ts';
import { clearFilters, filterSections } from './lib/filters.ts';
import { useProgress } from './hooks/useProgress.ts';
import { useTheme } from './hooks/useTheme.ts';
import { RoadmapHeader } from './components/RoadmapHeader.tsx';
import { SectionNode } from './components/SectionNode.tsx';
import { TopicPanel } from './components/TopicPanel.tsx';
import { RemovedTable } from './components/RemovedTable.tsx';
import { Footer } from './components/Footer.tsx';
import './styles.css';

const TOTAL_COUNT = getAllTopicIds().length;

export function App() {
  const { statuses, setStatus } = useProgress();
  const theme = useTheme();
  const [filter, setFilter] = useState(clearFilters);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const filteredSections = useMemo(
    () => filterSections(SECTIONS, statuses, filter),
    [statuses, filter]
  );

  const resultCount = useMemo(
    () => filteredSections.reduce((sum, section) => sum + section.topics.length, 0),
    [filteredSections]
  );

  const globalPercent = globalProgress(SECTIONS, statuses).percent;
  const selectedTopic = selectedTopicId ? getTopicById(selectedTopicId) : undefined;

  const handleSelectTopic = (topicId: string) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setSelectedTopicId(topicId);
  };

  const handleClosePanel = () => {
    setSelectedTopicId(null);
  };

  const handleStatusChange = (status: ProgressStatus) => {
    if (selectedTopicId) {
      setStatus(selectedTopicId, status);
    }
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>

      <RoadmapHeader
        title="AI Engineer Roadmap"
        globalPercent={globalPercent}
        filter={filter}
        onFilterChange={setFilter}
        resultCount={resultCount}
        totalCount={TOTAL_COUNT}
        theme={theme}
      />

      <main id="main" className="container" tabIndex={-1}>
        <section className="journey" aria-label="Roadmap">
          {filteredSections.map((section) => (
            <SectionNode
              key={section.id}
              section={section}
              statuses={statuses}
              onSelectTopic={handleSelectTopic}
            />
          ))}
        </section>

        <section aria-labelledby="removed-heading">
          <h2 id="removed-heading" className="section-node__title">
            Ajustes respecto al roadmap original
          </h2>
          <RemovedTable />
        </section>

        <Footer />
      </main>

      {selectedTopic && (
        <TopicPanel
          topic={selectedTopic}
          status={statuses[selectedTopic.id] ?? 'pending'}
          onStatusChange={handleStatusChange}
          onClose={handleClosePanel}
          triggerRef={triggerRef}
        />
      )}
    </>
  );
}
