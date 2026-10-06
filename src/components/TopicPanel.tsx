import { useEffect, useRef, type RefObject } from 'react';
import type { Topic } from '../data/roadmap.ts';
import type { ProgressStatus } from '../lib/progress.ts';
import { SourceList } from './SourceList.tsx';

interface TopicPanelProps {
  topic: Topic;
  status: ProgressStatus;
  onStatusChange: (status: ProgressStatus) => void;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
}

const STATUS_LABELS: Record<ProgressStatus, string> = {
  pending: 'Pendiente',
  'in-progress': 'En curso',
  done: 'Hecho',
  skipped: 'Saltado',
};

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function TopicPanel({
  topic,
  status,
  onStatusChange,
  onClose,
  triggerRef,
}: TopicPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const onCloseRef = useRef(onClose);
  const triggerRefRef = useRef(triggerRef);

  onCloseRef.current = onClose;
  triggerRefRef.current = triggerRef;

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !contentRef.current) return;

      const focusables = Array.from(
        contentRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex >= 0);

      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      triggerRefRef.current.current?.focus();
    };
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCloseRef.current();
    }
  };

  return (
    <div
      className="side-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`panel-title-${topic.id}`}
      onClick={handleBackdropClick}
    >
      <div className="side-panel__backdrop" aria-hidden="true" />
      <div className="side-panel__content" ref={contentRef}>
        <header className="side-panel__header">
          <h2 id={`panel-title-${topic.id}`} className="side-panel__title">
            {topic.title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="button side-panel__close"
            onClick={onClose}
            aria-label="Cerrar panel"
          >
            Cerrar
          </button>
        </header>

        <div className="side-panel__body">
          {topic.orqModule && (
            <div>
              <p className="side-panel__section-title">Módulo orq</p>
              <span className="orq-module">{topic.orqModule}</span>
            </div>
          )}

          <div>
            <p className="side-panel__section-title">Resumen</p>
            <p className="side-panel__text">{topic.summary}</p>
          </div>

          <div>
            <p className="side-panel__section-title">Por qué me importa</p>
            <p className="side-panel__text">{topic.whyForMe}</p>
          </div>

          <div>
            <p className="side-panel__section-title">Ejercicio práctico</p>
            <p className="side-panel__text">{topic.exercise}</p>
          </div>

          <div className="status-control">
            <fieldset>
              <legend>Estado</legend>
              <div className="status-options">
                {(Object.keys(STATUS_LABELS) as ProgressStatus[]).map((value) => (
                  <label key={value} className="status-label">
                    <input
                      type="radio"
                      name="topic-status"
                      value={value}
                      checked={status === value}
                      onChange={() => {
                        onStatusChange(value);
                      }}
                    />
                    {STATUS_LABELS[value]}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div>
            <p className="side-panel__section-title">Fuentes verificadas</p>
            <SourceList sources={topic.sources} />
          </div>
        </div>
      </div>
    </div>
  );
}
