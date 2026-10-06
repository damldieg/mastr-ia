import { describe, expect, it } from 'vitest';
import { SECTIONS, REMOVED_ITEMS, getAllTopicIds } from './roadmap.ts';

const EXPECTED_SECTION_TITLES = [
  'Fundamentos de LLMs',
  'Usar un LLM por API',
  'Prompting y contexto',
  'Evals',
  'Tool calling y agentes',
  'MCP',
  'Embeddings y RAG',
  'Seguridad',
  'Producción',
  'Multimodal',
];

const EXPECTED_FROM_ROADMAPSH_FALSE: string[] = [
  'api-streaming-retries-rate-limits',
  'api-vercel-ai-sdk',
  'prompting-context-engineering',
  'prompting-structured-outputs',
  'prompting-caching',
  'evals-why-measure',
  'evals-test-cases',
  'evals-llm-as-judge',
  'evals-tools-promptfoo',
  'production-observability-traces',
  'production-cost-latency',
  'production-prompt-versioning',
];

const EXPECTED_TOPICS_BY_SECTION: Record<string, { id: string; priority: string }[]> = {
  'Fundamentos de LLMs': [
    { id: 'llm-tokens-context-window', priority: 'core' },
    { id: 'llm-inference-vs-training', priority: 'core' },
    { id: 'llm-sampling-params', priority: 'recommended' },
    { id: 'llm-open-vs-closed', priority: 'recommended' },
    { id: 'llm-transformer-intuition', priority: 'recommended' },
  ],
  'Usar un LLM por API': [
    { id: 'api-claude-typescript-sdk', priority: 'core' },
    { id: 'api-streaming-retries-rate-limits', priority: 'core' },
    { id: 'api-vercel-ai-sdk', priority: 'recommended' },
    { id: 'api-ollama-local', priority: 'optional' },
  ],
  'Prompting y contexto': [
    { id: 'prompting-zero-few-cot', priority: 'core' },
    { id: 'prompting-context-engineering', priority: 'core' },
    { id: 'prompting-structured-outputs', priority: 'core' },
    { id: 'prompting-caching', priority: 'recommended' },
  ],
  Evals: [
    { id: 'evals-why-measure', priority: 'core' },
    { id: 'evals-test-cases', priority: 'core' },
    { id: 'evals-llm-as-judge', priority: 'recommended' },
    { id: 'evals-tools-promptfoo', priority: 'recommended' },
  ],
  'Tool calling y agentes': [
    { id: 'tools-function-calling', priority: 'core' },
    { id: 'tools-react-loop', priority: 'core' },
    { id: 'tools-agent-patterns', priority: 'core' },
    { id: 'tools-claude-agent-sdk', priority: 'recommended' },
    { id: 'tools-openai-agents-sdk', priority: 'optional' },
  ],
  MCP: [
    { id: 'mcp-host-client-server', priority: 'core' },
    { id: 'mcp-data-transport', priority: 'recommended' },
    { id: 'mcp-build-server-typescript', priority: 'core' },
  ],
  'Embeddings y RAG': [
    { id: 'embeddings-what', priority: 'core' },
    { id: 'semantic-search', priority: 'core' },
    { id: 'vector-db', priority: 'core' },
    { id: 'rag-chunking-retrieval-generation', priority: 'core' },
    { id: 'rag-vs-finetuning-longcontext', priority: 'recommended' },
    { id: 'contextual-retrieval-reranking', priority: 'recommended' },
    { id: 'rag-frameworks', priority: 'optional' },
  ],
  Seguridad: [
    { id: 'security-prompt-injection', priority: 'core' },
    { id: 'security-owasp-top10', priority: 'core' },
    { id: 'security-input-output-tool-permissions', priority: 'core' },
    { id: 'security-personal-data-privacy', priority: 'recommended' },
    { id: 'security-adversarial-testing', priority: 'recommended' },
  ],
  Producción: [
    { id: 'production-observability-traces', priority: 'core' },
    { id: 'production-cost-latency', priority: 'core' },
    { id: 'production-prompt-versioning', priority: 'recommended' },
  ],
  Multimodal: [
    { id: 'multimodal-images', priority: 'optional' },
    { id: 'multimodal-speech', priority: 'optional' },
  ],
};

describe('roadmap data integrity', () => {
  it('has the exact sections in order', () => {
    expect(SECTIONS.map((s) => s.title)).toEqual(EXPECTED_SECTION_TITLES);
  });

  it('has the exact topic ids and priorities per section in order', () => {
    for (const section of SECTIONS) {
      const expected = EXPECTED_TOPICS_BY_SECTION[section.title];
      expect(expected, section.title).toBeDefined();
      expect(
        section.topics.map((t) => ({ id: t.id, priority: t.priority })),
        section.title
      ).toEqual(expected);
    }
  });

  it('has unique section ids', () => {
    const ids = SECTIONS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique topic ids globally', () => {
    const ids = getAllTopicIds();
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has non-empty required fields on every topic', () => {
    for (const section of SECTIONS) {
      for (const topic of section.topics) {
        expect(topic.id).toBeTruthy();
        expect(topic.title).toBeTruthy();
        expect(topic.summary).toBeTruthy();
        expect(topic.whyForMe).toBeTruthy();
        expect(topic.exercise).toBeTruthy();
        expect(topic.priority).toMatch(/^(core|recommended|optional)$/);
        expect(topic.sources).toBeInstanceOf(Array);
      }
    }
  });

  it('marks additions with fromRoadmapSh: false and everything else true', () => {
    const falseSet = new Set(EXPECTED_FROM_ROADMAPSH_FALSE);
    for (const section of SECTIONS) {
      for (const topic of section.topics) {
        const expected = !falseSet.has(topic.id);
        expect(topic.fromRoadmapSh).toBe(expected);
      }
    }
  });

  it('requires at least two sources for every core topic', () => {
    for (const section of SECTIONS) {
      for (const topic of section.topics) {
        if (topic.priority === 'core') {
          expect(topic.sources.length, `${topic.id} sources`).toBeGreaterThanOrEqual(2);
        }
      }
    }
  });

  it('uses https URLs and valid source kinds/languages', () => {
    const validKinds = new Set(['docs', 'article', 'video', 'course', 'book', 'repo']);
    const validLangs = new Set(['es', 'en']);
    for (const section of SECTIONS) {
      for (const topic of section.topics) {
        for (const source of topic.sources) {
          expect(source.url, `${topic.id} source url`).toMatch(/^https:\/\//);
          expect(source.title, `${topic.id} source title`).toBeTruthy();
          expect(source.why, `${topic.id} source why`).toBeTruthy();
          expect(validKinds.has(source.kind)).toBe(true);
          expect(validLangs.has(source.lang)).toBe(true);
        }
      }
    }
  });

  it('has the complete removed items table', () => {
    expect(REMOVED_ITEMS).toHaveLength(9);
    for (const item of REMOVED_ITEMS) {
      expect(item.original).toBeTruthy();
      expect(['removed', 'reduced', 'moved-to-end']).toContain(item.decision);
      expect(item.reason).toBeTruthy();
    }
  });
});
