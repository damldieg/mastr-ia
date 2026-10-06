export type Priority = 'core' | 'recommended' | 'optional';
export type SourceKind = 'docs' | 'article' | 'video' | 'course' | 'book' | 'repo';

export interface Source {
  title: string;
  url: string;
  kind: SourceKind;
  lang: 'es' | 'en';
  why: string;
}

export interface Topic {
  id: string;
  title: string;
  priority: Priority;
  summary: string;
  whyForMe: string;
  exercise: string;
  orqModule?: string;
  sources: Source[];
  fromRoadmapSh: boolean;
}

export interface Section {
  id: string;
  title: string;
  goal: string;
  topics: Topic[];
}

export interface RemovedItem {
  original: string;
  decision: 'removed' | 'reduced' | 'moved-to-end';
  reason: string;
}

const CLAUDE_DOCS: Source = {
  title: 'Claude documentation',
  url: 'https://platform.claude.com/docs/en/home',
  kind: 'docs',
  lang: 'en',
  why: 'Referencia oficial de la API, tool use, structured outputs y prompt caching.',
};

const ANTHROPIC_EFFECTIVE_AGENTS: Source = {
  title: 'Anthropic — Building effective agents',
  url: 'https://www.anthropic.com/engineering/building-effective-agents',
  kind: 'article',
  lang: 'en',
  why: 'Guía de Anthropic sobre patrones de agentes, evaluaciones y producción.',
};

const ANTHROPIC_CONTEXT_ENGINEERING: Source = {
  title: 'Anthropic — Effective context engineering',
  url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
  kind: 'article',
  lang: 'en',
  why: 'Cómo construir y mantener el contexto que recibe un agente.',
};

const ANTHROPIC_CONTEXTUAL_RETRIEVAL: Source = {
  title: 'Anthropic — Contextual Retrieval',
  url: 'https://www.anthropic.com/engineering/contextual-retrieval',
  kind: 'article',
  lang: 'en',
  why: 'Técnica de Anthropic para mejorar la recuperación en RAG.',
};

const MCP_DOCS: Source = {
  title: 'Model Context Protocol',
  url: 'https://modelcontextprotocol.io',
  kind: 'docs',
  lang: 'en',
  why: 'Especificación y guías oficiales de MCP.',
};

const VERCEL_AI_SDK: Source = {
  title: 'Vercel AI SDK',
  url: 'https://ai-sdk.dev',
  kind: 'docs',
  lang: 'en',
  why: 'Capa multi-proveedor con utilidades de streaming y structured outputs.',
};

const OWASP_LLM: Source = {
  title: 'OWASP Top 10 for LLM Applications',
  url: 'https://genai.owasp.org',
  kind: 'docs',
  lang: 'en',
  why: 'Listado de riesgos y recomendaciones de seguridad para aplicaciones con LLM.',
};

const WILLISON_PROMPT_INJECTION: Source = {
  title: 'Simon Willison — Prompt injection series',
  url: 'https://simonwillison.net/series/prompt-injection/',
  kind: 'article',
  lang: 'en',
  why: 'Serie práctica sobre inyección de prompts directa e indirecta.',
};

const HAMEL_EVALS: Source = {
  title: 'Hamel Husain — Your AI product needs evals',
  url: 'https://hamel.dev/blog/posts/evals/',
  kind: 'article',
  lang: 'en',
  why: 'Argumento y metodología para construir evaluaciones antes de optimizar.',
};

const EUGENE_PATTERNS: Source = {
  title: 'Eugene Yan — Patterns for building LLM-based systems',
  url: 'https://eugeneyan.com/writing/llm-patterns/',
  kind: 'article',
  lang: 'en',
  why: 'Catálogo de patrones de diseño, coste, latencia y agentes.',
};

const LILIAN_AGENTS: Source = {
  title: 'Lilian Weng — LLM Powered Autonomous Agents',
  url: 'https://lilianweng.github.io/posts/2023-06-23-agent/',
  kind: 'article',
  lang: 'en',
  why: 'Visión general de agentes, planificación, memoria y herramientas.',
};

const JAY_TRANSFORMER: Source = {
  title: 'Jay Alammar — The Illustrated Transformer',
  url: 'https://jalammar.github.io/illustrated-transformer/',
  kind: 'article',
  lang: 'en',
  why: 'Explicación visual e intuitiva de la arquitectura transformer.',
};

const THREEBLUEBROWN_NN: Source = {
  title: '3Blue1Brown — Neural networks and transformers',
  url: 'https://www.3blue1brown.com/topics/neural-networks?topic=neural-networks',
  kind: 'article',
  lang: 'en',
  why: 'Videos visuales sobre redes neuronales, embeddings y transformers.',
};

const KARPATHY_LLM: Source = {
  title: 'Andrej Karpathy — Intro to Large Language Models',
  url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
  kind: 'video',
  lang: 'en',
  why: 'Charla completa y accesible sobre cómo funcionan los LLM.',
};

const CHIP_HUYEN_BOOK: Source = {
  title: 'Chip Huyen — AI Engineering',
  url: 'https://huyenchip.com/books/',
  kind: 'book',
  lang: 'en',
  why: 'Libro de referencia sobre ingeniería de sistemas con LLM.',
};

const PROMPTFOO_DOCS: Source = {
  title: 'promptfoo',
  url: 'https://www.promptfoo.dev',
  kind: 'docs',
  lang: 'en',
  why: 'Herramienta para evaluar y versionar prompts.',
};

const LANGFUSE_DOCS: Source = {
  title: 'Langfuse',
  url: 'https://langfuse.com',
  kind: 'docs',
  lang: 'en',
  why: 'Observabilidad, trazas y métricas para LLM en producción.',
};

const PGVECTOR_REPO: Source = {
  title: 'pgvector',
  url: 'https://github.com/pgvector/pgvector',
  kind: 'repo',
  lang: 'en',
  why: 'Extensión de Postgres para vectores y búsqueda semántica.',
};

const CHROMA_DOCS: Source = {
  title: 'Chroma',
  url: 'https://docs.trychroma.com',
  kind: 'docs',
  lang: 'en',
  why: 'Base vectorial independiente con documentación oficial.',
};

const OLLAMA_DOCS: Source = {
  title: 'Ollama',
  url: 'https://ollama.com',
  kind: 'docs',
  lang: 'en',
  why: 'Ejecuta modelos abiertos localmente de forma sencilla.',
};

export const SECTIONS: Section[] = [
  {
    id: 'fundamentos-llm',
    title: 'Fundamentos de LLMs',
    goal: 'Entender qué son los LLMs y cómo se comportan antes de usarlos.',
    topics: [
      {
        id: 'llm-tokens-context-window',
        title: 'Tokens, contexto y ventana de contexto',
        priority: 'core',
        summary:
          'Los modelos procesan texto como tokens, no caracteres, y tienen una ventana de contexto que limita cuánto pueden "recordar" en una sola llamada. Entender esto es clave para diseñar prompts eficientes y estimar costes.',
        whyForMe:
          'En orq necesito decidir qué historial, documentos e instrucciones envío en cada llamada; si desbordo la ventana perderé información o pagaré de más.',
        exercise:
          'Usa un tokenizer online o la API de Claude para contar tokens de varios prompts de orq y comparar el coste según el modelo.',
        orqModule: 'M0',
        sources: [
          {
            ...KARPATHY_LLM,
            why:
              'Explica tokens, ventana de contexto y costes de forma visual y completa.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why:
              'Capítulos sobre tokenización y las implicaciones prácticas del tamaño de contexto.',
          },
          {
            ...CLAUDE_DOCS,
            why:
              'Documentación oficial sobre límites de contexto y conteo de tokens en Claude.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'llm-inference-vs-training',
        title: 'Inferencia frente a entrenamiento',
        priority: 'core',
        summary:
          'La mayoría de las aplicaciones de IA no entrenan modelos desde cero, sino que usan inferencia sobre modelos preentrenados. Saber cuándo basta con prompting, RAG o fine-tuning ahorra meses de trabajo innecesario.',
        whyForMe:
          'Como frontend engineer quiero construir sistemas, no entrenar modelos; debo saber cuándo cada estrategia es la adecuada para orq.',
        exercise:
          'Clasifica cinco tareas de orq como "inferencia", "RAG", "fine-tuning" o "cambiar de modelo" y justifica cada una.',
        orqModule: 'M1',
        sources: [
          {
            ...KARPATHY_LLM,
            why:
              'Diferencia clara entre pretraining, fine-tuning e inferencia.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why:
              'Cuándo usar cada enfoque desde la perspectiva de ingeniería.',
          },
          {
            ...EUGENE_PATTERNS,
            why:
              'Patrones prácticos para decidir entre prompt, RAG y fine-tuning.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'llm-sampling-params',
        title: 'Temperatura, top-k y top-p',
        priority: 'recommended',
        summary:
          'La temperatura escala la aleatoriedad de las respuestas, mientras que top-k y top-p restringen el conjunto de tokens candidatos. Juntos permiten balancear creatividad y determinismo.',
        whyForMe:
          'En orq necesito llamadas deterministas para tool calling y salidas creativas para generación de texto; saber ajustar estos parámetros me da control.',
        exercise:
          'Ejecuta el mismo prompt de orq con temperatura 0, 0.5 y 1, y compara la variabilidad de las respuestas.',
        sources: [
          {
            ...CLAUDE_DOCS,
            why:
              'Explica los parámetros de sampling disponibles en la API de Claude.',
          },
          {
            ...EUGENE_PATTERNS,
            why:
              'Recomendaciones sobre temperatura y sampling para tareas de producción.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'llm-open-vs-closed',
        title: 'Modelos abiertos frente a cerrados',
        priority: 'recommended',
        summary:
          'Los modelos cerrados ofrecen API gestionadas, mientras que los abiertos permiten ejecución local y mayor control. La elección depende de coste, latencia, privacidad y capacidad del equipo.',
        whyForMe:
          'Necesito decidir si orq usa Claude, un modelo local vía Ollama o ambos según el caso de uso.',
        exercise:
          'Compara latencia y calidad de respuesta entre un modelo local y una API cerrada para una tarea concreta de orq.',
        sources: [
          {
            ...OLLAMA_DOCS,
            why: 'Opción principal para ejecutar modelos abiertos localmente.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why: 'Análisis de trade-offs entre modelos propietarios y abiertos.',
          },
          {
            ...CLAUDE_DOCS,
            why: 'Documentación del modelo cerrado que usaré como referencia.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'llm-transformer-intuition',
        title: 'Cómo funciona un transformer a nivel intuitivo',
        priority: 'recommended',
        summary:
          'Un transformer predice el siguiente token usando embeddings, atención y capas feed-forward. No hace falta saber todas las matemáticas, pero sí entender por qué el contexto importa y de dónde vienen las alucinaciones.',
        whyForMe:
          'Entender la intuición del transformer me ayuda a depurar comportamientos extraños de orq y a diseñar mejores prompts.',
        exercise:
          'Explica con un diagrama cómo un transformer convierte el prompt de orq en una respuesta, sin entrar en ecuaciones.',
        sources: [
          {
            ...JAY_TRANSFORMER,
            why: 'La explicación visual más clara de la arquitectura transformer.',
          },
          {
            ...THREEBLUEBROWN_NN,
            why: 'Videos que desarrollan la intuición detrás de embeddings y atención.',
          },
          {
            ...KARPATHY_LLM,
            why: 'Contexto completo sobre cómo los LLM generan tokens.',
          },
        ],
        fromRoadmapSh: true,
      },
    ],
  },
  {
    id: 'usar-llm-api',
    title: 'Usar un LLM por API',
    goal: 'Integrar LLMs reales en código TypeScript.',
    topics: [
      {
        id: 'api-claude-typescript-sdk',
        title: 'Un proveedor a fondo: Claude con el SDK de TypeScript',
        priority: 'core',
        summary:
          'Profundizar en un solo proveedor es más útil que conocer siete superficialmente. Claude ofrece un SDK de TypeScript con tipos, streaming, tool use y structured outputs.',
        whyForMe:
          'orq probablemente use Claude como motor principal; dominar su SDK me permite moverme rápido y aprovechar funciones avanzadas.',
        exercise:
          'Crea un script en TypeScript que llame a Claude con system prompt, maneje la respuesta y muestre el uso de tokens.',
        orqModule: 'M2',
        sources: [
          {
            ...CLAUDE_DOCS,
            why: 'Referencia completa del SDK de TypeScript y la API de Claude.',
          },
          {
            ...ANTHROPIC_EFFECTIVE_AGENTS,
            why:
              'Buenas prácticas de Anthropic para integrar Claude en sistemas agenticos.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why: 'Consejos prácticos sobre uso de APIs de LLM en producción.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'api-streaming-retries-rate-limits',
        title: 'Streaming, reintentos y rate limits',
        priority: 'core',
        summary:
          'Las aplicaciones interactivas necesitan mostrar tokens en tiempo real, manejar errores transitorios y respetar límites de tasa. Sin esto, la experiencia de usuario se rompe rápidamente.',
        whyForMe:
          'La interfaz de orq debe sentirse fluida; también necesito tolerancia a fallos ante picos de uso.',
        exercise:
          'Añade streaming, reintentos exponenciales y manejo de rate limits al script anterior.',
        orqModule: 'M3',
        sources: [
          {
            ...CLAUDE_DOCS,
            why: 'Documentación sobre streaming y errores en la API de Claude.',
          },
          {
            ...VERCEL_AI_SDK,
            why: 'Abstracciones probadas para streaming y reintentos multi-proveedor.',
          },
          {
            ...EUGENE_PATTERNS,
            why: 'Patrones de resiliencia y gestión de latencia en sistemas con LLM.',
          },
        ],
        fromRoadmapSh: false,
      },
      {
        id: 'api-vercel-ai-sdk',
        title: 'Vercel AI SDK como capa multi-proveedor',
        priority: 'recommended',
        summary:
          'Vercel AI SDK unifica la interfaz de diferentes proveedores, facilita el streaming y simplifica el cambio de modelo. Es una capa de abstracción ligera sobre APIs concretas.',
        whyForMe:
          'Con orq puedo empezar con Claude y cambiar o combinar proveedores sin reescribir toda la lógica de llamadas.',
        exercise:
          'Reescribe el script de Claude usando Vercel AI SDK y prueba a cambiar de modelo en una sola línea.',
        sources: [
          {
            ...VERCEL_AI_SDK,
            why: 'Documentación oficial de la capa multi-proveedor.',
          },
          {
            ...CLAUDE_DOCS,
            why: 'Complementa con detalles específicos del proveedor que uso.',
          },
        ],
        fromRoadmapSh: false,
      },
      {
        id: 'api-ollama-local',
        title: 'Ollama para probar un modelo local',
        priority: 'optional',
        summary:
          'Ollama permite ejecutar modelos abiertos en local con poca fricción. Es ideal para prototipar sin coste de API y para escenarios con datos sensibles.',
        whyForMe:
          'Poder probar orq offline y sin claves de API acelera la iteración inicial.',
        exercise:
          'Instala Ollama, ejecuta un modelo ligero y hazle una tarea de orq para comparar con Claude.',
        sources: [
          {
            ...OLLAMA_DOCS,
            why: 'Guía oficial de instalación y uso de modelos locales.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why: 'Cuándo y por qué usar modelos abiertos locales.',
          },
        ],
        fromRoadmapSh: true,
      },
    ],
  },
  {
    id: 'prompting-contexto',
    title: 'Prompting y contexto',
    goal: 'Controlar lo que el modelo ve y produce.',
    topics: [
      {
        id: 'prompting-zero-few-cot',
        title: 'Zero-shot, few-shot y chain of thought',
        priority: 'core',
        summary:
          'El zero-shot pide directamente una tarea, el few-shot añade ejemplos y el chain of thought fuerza al modelo a razonar paso a paso. Combinarlos aumenta la fiabilidad en tareas complejas.',
        whyForMe:
          'orq necesita clasificaciones y decisiones fiables; los ejemplos y el razonamiento explícito reducen errores.',
        exercise:
          'Toma una tarea de clasificación de orq y compara zero-shot, few-shot y CoT; mide la precisión.',
        orqModule: 'M4',
        sources: [
          {
            ...CLAUDE_DOCS,
            why: 'Guías de prompting y ejemplos en la documentación oficial.',
          },
          {
            ...ANTHROPIC_CONTEXT_ENGINEERING,
            why: 'Cómo el contexto y los ejemplos afectan al rendimiento.',
          },
          {
            ...LILIAN_AGENTS,
            why: 'Uso de CoT y prompting en agentes autónomos.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'prompting-context-engineering',
        title: 'Context engineering: qué entra en el contexto y por qué',
        priority: 'core',
        summary:
          'No basta con escribir un buen prompt; hay que decidir qué información se incluye, en qué orden y cuánto. Un contexto mal construido desperdicia tokens y confunde al modelo.',
        whyForMe:
          'orq debe decidir dinámicamente qué resultados de tools, historial y documentos enviar a cada llamada.',
        exercise:
          'Audita una conversación de orq: lista todo lo que entra en contexto, elimina lo irrelevante y mide la mejora.',
        orqModule: 'M5',
        sources: [
          {
            ...ANTHROPIC_CONTEXT_ENGINEERING,
            why: 'Artículo principal sobre cómo construir contexto efectivo.',
          },
          {
            ...EUGENE_PATTERNS,
            why: 'Patrones de gestión de contexto y retrieval en sistemas reales.',
          },
          {
            ...CLAUDE_DOCS,
            why: 'Límites y recomendaciones de contexto de Claude.',
          },
        ],
        fromRoadmapSh: false,
      },
      {
        id: 'prompting-structured-outputs',
        title: 'Structured outputs con JSON Schema y Zod',
        priority: 'core',
        summary:
          'Forzar al modelo a devolver JSON válido y validarlo con Zod permite integrar respuestas de LLM en código tipado de TypeScript sin adivinar estructuras.',
        whyForMe:
          'orq necesita argumentos de tools, estados de UI y decisiones parseables; Zod me da seguridad de tipos.',
        exercise:
          'Define un esquema Zod para una decisión de orq, llama a Claude con structured output y valida el resultado.',
        orqModule: 'M6',
        sources: [
          {
            ...CLAUDE_DOCS,
            why: 'Documentación oficial de structured outputs en Claude.',
          },
          {
            ...VERCEL_AI_SDK,
            why: 'Soporte de schemas y streaming de objetos estructurados.',
          },
          {
            ...EUGENE_PATTERNS,
            why: 'Patrones para salidas estructuradas y parsing robusto.',
          },
        ],
        fromRoadmapSh: false,
      },
      {
        id: 'prompting-caching',
        title: 'Prompt caching',
        priority: 'recommended',
        summary:
          'El prompt caching permite reutilizar prefijos de contexto repetidos entre llamadas, reduciendo latencia y coste cuando el system prompt o el historial cambian poco.',
        whyForMe:
          'orq repite mucho el system prompt y la descripción de tools; el caching puede ahorrar costes significativos.',
        exercise:
          'Implementa prompt caching en una serie de llamadas de orq y compara el coste total.',
        sources: [
          {
            ...CLAUDE_DOCS,
            why: 'Explicación de prompt caching en Claude y casos de uso.',
          },
          {
            ...ANTHROPIC_CONTEXT_ENGINEERING,
            why: 'Cómo organizar el contexto para aprovechar el caching.',
          },
        ],
        fromRoadmapSh: false,
      },
    ],
  },
  {
    id: 'evals',
    title: 'Evals',
    goal: 'Medir antes de optimizar.',
    topics: [
      {
        id: 'evals-why-measure',
        title: 'Por qué medir antes de optimizar',
        priority: 'core',
        summary:
          'Sin evaluaciones, cada cambio de prompt o modelo es una apuesta. Una evaluación sencilla pero representativa evita optimizar por anecdótica y permite iterar con confianza.',
        whyForMe:
          'orq cambiará constantemente de prompts; necesito saber si un cambio mejora o empeora el comportamiento real.',
        exercise:
          'Elige una funcionalidad de orq y define una métrica simple de éxito, como "tool correcta en el 90 % de los casos".',
        orqModule: 'M7',
        sources: [
          {
            ...HAMEL_EVALS,
            why: 'Argumento principal sobre la necesidad de evals en productos de IA.',
          },
          {
            ...ANTHROPIC_EFFECTIVE_AGENTS,
            why: 'Cómo Anthropic recomienda construir evals antes de agentes complejos.',
          },
          {
            ...EUGENE_PATTERNS,
            why: 'Patrones de evaluación y benchmarking en sistemas con LLM.',
          },
        ],
        fromRoadmapSh: false,
      },
      {
        id: 'evals-test-cases',
        title: 'Conjunto de casos y criterios de éxito',
        priority: 'core',
        summary:
          'Un buen eval consta de un dataset representativo, criterios claros y la capacidad de ejecutar las pruebas automáticamente. La clave es cubrir casos límite y no solo el camino feliz.',
        whyForMe:
          'Necesito un banco de pruebas que me proteja de regresiones cuando ajuste prompts en orq.',
        exercise:
          'Escribe 10 casos de prueba para una tarea de orq, con entrada, salida esperada y criterio de éxito.',
        orqModule: 'M8',
        sources: [
          {
            ...HAMEL_EVALS,
            why: 'Metodología para definir casos de prueba y criterios.',
          },
          {
            ...PROMPTFOO_DOCS,
            why: 'Cómo estructurar y ejecutar suites de evaluación.',
          },
          {
            ...EUGENE_PATTERNS,
            why: 'Ejemplos de conjuntos de evaluación en producción.',
          },
        ],
        fromRoadmapSh: false,
      },
      {
        id: 'evals-llm-as-judge',
        title: 'LLM como juez y sus límites',
        priority: 'recommended',
        summary:
          'Usar un LLM para evaluar respuestas escala la evaluación, pero introduce sesgos y puede ser manipulado. Hay que calibrar los jueces contra etiquetas humanas y auditarlos periódicamente.',
        whyForMe:
          'No puedo revisar manualmente cientos de respuestas de orq; un juez bien calibrado acelera la iteración.',
        exercise:
          'Implementa un juez LLM para una métrica de orq y compara sus puntuaciones con 20 etiquetados manuales.',
        sources: [
          {
            ...ANTHROPIC_EFFECTIVE_AGENTS,
            why: 'Recomendaciones de Anthropic sobre evaluación y LLM como juez.',
          },
          {
            ...PROMPTFOO_DOCS,
            why: 'Soporte de evaluadores LLM y análisis de sesgos.',
          },
        ],
        fromRoadmapSh: false,
      },
      {
        id: 'evals-tools-promptfoo',
        title: 'Herramientas como promptfoo',
        priority: 'recommended',
        summary:
          'promptfoo permite ejecutar evaluaciones contra múltiples proveedores, versionar prompts e integrar los resultados en CI. Automatizar las evaluaciones es lo que las hace útiles a largo plazo.',
        whyForMe:
          'Quiero que cada cambio en orq pase por una batería de evals antes de llegar a producción.',
        exercise:
          'Configura promptfoo para ejecutar tus 10 casos de prueba y añádelo a un script de CI.',
        sources: [
          {
            ...PROMPTFOO_DOCS,
            why: 'Documentación oficial de la herramienta de evals.',
          },
          {
            ...HAMEL_EVALS,
            why: 'Contexto sobre por qué las evals deben formar parte del flujo de trabajo.',
          },
        ],
        fromRoadmapSh: false,
      },
    ],
  },
  {
    id: 'tool-calling-agentes',
    title: 'Tool calling y agentes',
    goal: 'Dar capacidades al modelo y orquestar flujos.',
    topics: [
      {
        id: 'tools-function-calling',
        title: 'Function calling',
        priority: 'core',
        summary:
          'El function calling permite que el modelo decida invocar funciones con argumentos estructurados. Es la base para que un LLM interactúe con sistemas externos de forma segura y determinista.',
        whyForMe:
          'orq está construido alrededor de tools que el agente puede llamar; entender esto es imprescindible.',
        exercise:
          'Define dos funciones con esquemas Zod y haz que Claude elija cuál llamar y con qué argumentos.',
        orqModule: 'M9',
        sources: [
          {
            ...CLAUDE_DOCS,
            why: 'Referencia oficial de tool use / function calling en Claude.',
          },
          {
            ...ANTHROPIC_EFFECTIVE_AGENTS,
            why: 'Buenas prácticas para diseñar tools y manejar sus resultados.',
          },
          {
            ...LILIAN_AGENTS,
            why: 'Rol del function calling en agentes autónomos.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'tools-react-loop',
        title: 'Bucle de agente escrito a mano, el patrón ReAct',
        priority: 'core',
        summary:
          'ReAct alterna pensamiento, acción y observación hasta resolver una tarea. Escribir el bucle a mano aclara el control de flujo antes de usar frameworks de agentes.',
        whyForMe:
          'orq necesita un bucle de agente predecible; hacerlo manual primero me da control total sobre el flujo.',
        exercise:
          'Implementa un bucle ReAct a mano para una tarea de búsqueda y cálculo, sin frameworks.',
        orqModule: 'M10',
        sources: [
          {
            ...LILIAN_AGENTS,
            why: 'Explicación del patrón ReAct y sus variantes.',
          },
          {
            ...ANTHROPIC_EFFECTIVE_AGENTS,
            why: 'Cuándo usar un bucle simple frente a flujos más complejos.',
          },
          {
            ...EUGENE_PATTERNS,
            why: 'Patrones de agentes y control de flujo en producción.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'tools-agent-patterns',
        title: 'Patrones de agentes: workflow frente a agente, orquestador y subagentes',
        priority: 'core',
        summary:
          'No toda tarea necesita un agente autónomo. A veces un workflow determinista es más robusto. Comprender cuándo usar cada patrón evita sobre-ingeniería.',
        whyForMe:
          'orq es un orquestador de agentes; debo decidir qué partes son workflows rígidos y qué partes dejo al modelo.',
        exercise:
          'Dibuja tres flujos de orq y clasifícalos como workflow, agente o orquestador con subagentes.',
        orqModule: 'M11',
        sources: [
          {
            ...ANTHROPIC_EFFECTIVE_AGENTS,
            why: 'Taxonomía de workflows, agentes y orquestadores de Anthropic.',
          },
          {
            ...EUGENE_PATTERNS,
            why: 'Patrones de composición de agentes y subagentes.',
          },
          {
            ...LILIAN_AGENTS,
            why: 'Fundamentos de agentes, planificación y descomposición de tareas.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'tools-claude-agent-sdk',
        title: 'Claude Agent SDK',
        priority: 'recommended',
        summary:
          'El Claude Agent SDK abstrae parte del boilerplate de bucles de agente, tool calling y tracing. Es útil para prototipar, pero hay que entender qué hay debajo.',
        whyForMe:
          'Puede acelerar partes de orq si no reinvento lo que ya está resuelto.',
        exercise:
          'Crea un prototipo con Claude Agent SDK y compáralo con tu bucle ReAct manual.',
        sources: [
          {
            ...CLAUDE_DOCS,
            why: 'Documentación del SDK de agentes de Anthropic.',
          },
          {
            ...ANTHROPIC_EFFECTIVE_AGENTS,
            why: 'Contexto sobre cuándo usar abstracciones de agentes.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'tools-openai-agents-sdk',
        title: 'OpenAI Agents SDK',
        priority: 'optional',
        summary:
          'Conocer alternativas del ecosistema ayuda a tomar decisiones informadas. El Agents SDK de OpenAI ofrece una API similar para construir agentes con sus modelos.',
        whyForMe:
          'orq podría soportar múltiples modelos; entender la API de OpenAI me da flexibilidad futura.',
        exercise:
          'Lee la documentación del Agents SDK de OpenAI y anota tres diferencias clave respecto a Claude Agent SDK.',
        sources: [
          {
            ...VERCEL_AI_SDK,
            why: 'Capa multi-proveedor que facilita comparar e intercambiar SDKs.',
          },
          {
            ...EUGENE_PATTERNS,
            why: 'Comparativa de patrones y abstracciones en el ecosistema de agentes.',
          },
        ],
        fromRoadmapSh: true,
      },
    ],
  },
  {
    id: 'mcp',
    title: 'MCP',
    goal: 'Conectar LLMs con datos y herramientas mediante MCP.',
    topics: [
      {
        id: 'mcp-host-client-server',
        title: 'Host, cliente y servidor',
        priority: 'core',
        summary:
          'MCP separa las aplicaciones en host (la app), cliente (conector) y servidor (proveedor de tools, recursos y prompts). Esta arquitectura desacopla modelos de datos y herramientas.',
        whyForMe:
          'orq puede actuar como host que consume servidores MCP para ampliar sus capacidades sin acoplar proveedores.',
        exercise:
          'Dibuja la arquitectura MCP para una calculadora: host, cliente y servidor.',
        orqModule: 'M12',
        sources: [
          {
            ...MCP_DOCS,
            why: 'Especificación oficial de los roles host, client y server.',
          },
          {
            ...ANTHROPIC_EFFECTIVE_AGENTS,
            why: 'Cómo encaja MCP en sistemas de agentes efectivos.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'mcp-data-transport',
        title: 'Capa de datos y capa de transporte',
        priority: 'recommended',
        summary:
          'MCP distingue la capa de datos (tools, resources, prompts) de la capa de transporte (stdio, SSE). Elegir el transporte adecuado depende de si el servidor es local o remoto.',
        whyForMe:
          'orq podría ejecutar servidores MCP locales por stdio y servidores remotos por SSE.',
        exercise:
          'Compara stdio y SSE para un servidor MCP local y otro remoto, listando pros y contras.',
        sources: [
          {
            ...MCP_DOCS,
            why: 'Documentación de transportes y protocolo de MCP.',
          },
          {
            ...CLAUDE_DOCS,
            why: 'Contexto de cómo Claude integra herramientas externas.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'mcp-build-server-typescript',
        title: 'Construir un servidor MCP en TypeScript',
        priority: 'core',
        summary:
          'Construir un servidor MCP en TypeScript permite exponer tools propias con tipos. Es el paso práctico para integrar datos privados o sistemas internos con un LLM.',
        whyForMe:
          'orq necesitará tools específicas de mi dominio; saber construir un servidor MCP me da independencia.',
        exercise:
          'Implementa un servidor MCP en TypeScript con una tool de lectura de datos y conéctalo a un cliente.',
        orqModule: 'M13',
        sources: [
          {
            ...MCP_DOCS,
            why: 'Guías y referencia del SDK de servidores MCP.',
          },
          {
            ...VERCEL_AI_SDK,
            why: 'Contexto de integración de tools y proveedores desde TypeScript.',
          },
          {
            ...CLAUDE_DOCS,
            why: 'Cómo se consumen tools desde la API de Claude.',
          },
        ],
        fromRoadmapSh: true,
      },
    ],
  },
  {
    id: 'embeddings-rag',
    title: 'Embeddings y RAG',
    goal: 'Dar memoria semántica a las aplicaciones.',
    topics: [
      {
        id: 'embeddings-what',
        title: 'Qué es un embedding',
        priority: 'core',
        summary:
          'Un embedding es una representación numérica densa de texto (o de otros datos) que captura su significado. Textos similares tienen vectores cercanos en el espacio de embeddings.',
        whyForMe:
          'Los embeddings son la base para buscar transacciones similares en la app de finanzas personales.',
        exercise:
          'Genera embeddings para 20 descripciones de transacciones y encuentra los pares más cercanos.',
        orqModule: 'M14',
        sources: [
          {
            ...KARPATHY_LLM,
            why: 'Explica embeddings como representaciones semánticas de los tokens.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why: 'Capítulo sobre embeddings y su uso en aplicaciones de IA.',
          },
          {
            ...THREEBLUEBROWN_NN,
            why: 'Intuición visual de cómo las redes aprenden representaciones.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'semantic-search',
        title: 'Búsqueda semántica',
        priority: 'core',
        summary:
          'La búsqueda semántica compara vectores en lugar de palabras clave. Permite encontrar conceptos relacionados aunque no compartan exactamente los mismos términos.',
        whyForMe:
          'Poder buscar "comida" y encontrar "restaurante" o "supermercado" mejora mucho la app de finanzas.',
        exercise:
          'Construye una búsqueda semántica sobre transacciones de finanzas personales: embedding + índice + query.',
        sources: [
          {
            ...PGVECTOR_REPO,
            why: 'Ejemplo práctico de búsqueda semántica con Postgres.',
          },
          {
            ...CHROMA_DOCS,
            why: 'Guía para crear colecciones y realizar búsquedas por similitud.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why: 'Diseño de sistemas de búsqueda semántica en producción.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'vector-db',
        title: 'Una base vectorial: pgvector o Chroma',
        priority: 'core',
        summary:
          'Para búsqueda semántica a escala se necesita una base de datos vectorial. pgvector aprovecha Postgres existente; Chroma es una opción independiente sencilla de levantar.',
        whyForMe:
          'La app de finanzas ya usa Postgres, así que pgvector es la opción natural; Chroma me sirve para prototipos.',
        exercise:
          'Instala pgvector en una base de datos de prueba o levanta Chroma e indexa tus vectores de transacciones.',
        sources: [
          {
            ...PGVECTOR_REPO,
            why: 'Instrucciones de instalación y uso de pgvector.',
          },
          {
            ...CHROMA_DOCS,
            why: 'Documentación oficial de Chroma como alternativa.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'rag-chunking-retrieval-generation',
        title: 'Chunking, recuperación y generación',
        priority: 'core',
        summary:
          'RAG divide documentos en chunks, recupera los más relevantes y los inyecta en el prompt para generar una respuesta fundamentada. La calidad depende del chunking y de la recuperación.',
        whyForMe:
          'orq necesitará responder a partir de documentos largos; un buen chunking evita perder contexto.',
        exercise:
          'Toma un documento markdown, divídelo en chunks, recupera los más relevantes para una pregunta y genera una respuesta.',
        sources: [
          {
            ...ANTHROPIC_CONTEXT_ENGINEERING,
            why: 'Cómo estructurar el contexto recuperado para el modelo.',
          },
          {
            ...ANTHROPIC_CONTEXTUAL_RETRIEVAL,
            why: 'Técnicas de recuperación de alta calidad de Anthropic.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why: 'Diseño de pipelines RAG y trade-offs de chunking.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'rag-vs-finetuning-longcontext',
        title: 'RAG frente a fine-tuning frente a contexto largo',
        priority: 'recommended',
        summary:
          'RAG aporta conocimiento externo, el fine-tuning adapta el comportamiento del modelo y los contextos largos permiten incluir más documentos directamente. Cada uno tiene su lugar.',
        whyForMe:
          'Debo elegir la estrategia adecuada para cada problema de orq sin caer en soluciones caras o inadecuadas.',
        exercise:
          'Crea una matriz de decisión con tres casos de orq y elige RAG, fine-tuning o contexto largo para cada uno.',
        sources: [
          {
            ...ANTHROPIC_CONTEXTUAL_RETRIEVAL,
            why: 'Cuándo la recuperación mejora el rendimiento frente a contexto largo.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why: 'Comparativa detallada de RAG, fine-tuning y contexto largo.',
          },
          {
            ...EUGENE_PATTERNS,
            why: 'Patrones para decidir el enfoque según el tipo de conocimiento.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'contextual-retrieval-reranking',
        title: 'Contextual retrieval y reranking',
        priority: 'recommended',
        summary:
          'Contextual retrieval añade información descriptiva a cada chunk, y el reranking reordena los resultados por relevancia para el modelo. Ambos mejoran la precisión de RAG sin cambiar de modelo.',
        whyForMe:
          'orq puede beneficiarse de recuperación más precisa, reduciendo alucinaciones basadas en chunks mal extraídos.',
        exercise:
          'Añade reranking a tu pipeline RAG manual y mide cuánto mejora la relevancia de los chunks recuperados.',
        sources: [
          {
            ...ANTHROPIC_CONTEXTUAL_RETRIEVAL,
            why: 'Artículo clave sobre contextual retrieval y reranking de Anthropic.',
          },
          {
            ...CHROMA_DOCS,
            why: 'Opciones de consulta y filtros que permiten reranking posterior.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'rag-frameworks',
        title: 'Frameworks como LangChain o LlamaIndex',
        priority: 'optional',
        summary:
          'Frameworks como LangChain o LlamaIndex aceleran ciertos pasos de RAG, pero es arriesgado usarlos antes de entender el pipeline manual. Se usan después de haberlo hecho a mano.',
        whyForMe:
          'No quiero depender de una abstracción que no entiendo; primero domino RAG manual, luego evalúo frameworks.',
        exercise:
          'Rehaz el paso de recuperación de tu pipeline manual con un framework y compara legibilidad y control.',
        sources: [
          {
            ...EUGENE_PATTERNS,
            why: 'Opinión sobre cuándo frameworks ayudan y cuándo añaden complejidad.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why: 'Visión crítica sobre el uso de frameworks en pipelines de IA.',
          },
        ],
        fromRoadmapSh: true,
      },
    ],
  },
  {
    id: 'seguridad',
    title: 'Seguridad',
    goal: 'Proteger aplicaciones LLM.',
    topics: [
      {
        id: 'security-prompt-injection',
        title: 'Prompt injection, directa e indirecta',
        priority: 'core',
        summary:
          'La inyección directa ocurre cuando el usuario ataca el propio prompt; la indirecta cuando datos de terceros (web, correos, documentos) contienen instrucciones ocultas. Ambas pueden manipular salidas o tools.',
        whyForMe:
          'orq procesa entradas no confiables y puede ejecutar tools; la inyección de prompts es un riesgo real.',
        exercise:
          'Intenta una inyección de prompt directa en un demo y documenta tres estrategias de mitigación.',
        sources: [
          {
            ...WILLISON_PROMPT_INJECTION,
            why: 'Serie exhaustiva sobre inyección directa e indirecta.',
          },
          {
            ...OWASP_LLM,
            why: 'Clasificación de prompt injection en el Top 10 de LLM.',
          },
          {
            ...ANTHROPIC_EFFECTIVE_AGENTS,
            why: 'Recomendaciones de Anthropic para limitar el impacto de tools.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'security-owasp-top10',
        title: 'OWASP Top 10 para LLMs',
        priority: 'core',
        summary:
          'OWASP Top 10 para LLM recopila los riesgos más críticos: prompt injection, salidas inseguras, datos de entrenamiento, model denial y más. Sirve como checklist de amenazas.',
        whyForMe:
          'Me da un marco para auditar orq antes de exponerlo a usuarios reales.',
        exercise:
          'Mapea cada componente de orq contra los riesgos del OWASP Top 10 para LLM.',
        sources: [
          {
            ...OWASP_LLM,
            why: 'Listado oficial de riesgos y recomendaciones.',
          },
          {
            ...WILLISON_PROMPT_INJECTION,
            why: 'Ejemplos prácticos de varios vectores de ataque.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'security-input-output-tool-permissions',
        title: 'Restringir entradas y salidas, y permisos de tools',
        priority: 'core',
        summary:
          'Validar entradas del usuario, acotar las salidas del modelo y aplicar el principio de mínimo privilegio a las tools reduce el daño que puede causar un ataque exitoso.',
        whyForMe:
          'orq debe correr tools con permisos limitados y rechazar entradas fuera de lo esperado.',
        exercise:
          'Añade validación Zod a entradas y salidas de tools y define permisos mínimos para cada tool.',
        sources: [
          {
            ...OWASP_LLM,
            why: 'Recomendaciones sobre validación y control de acceso a tools.',
          },
          {
            ...ANTHROPIC_EFFECTIVE_AGENTS,
            why: 'Buenas prácticas para diseñar tools con alcance limitado.',
          },
          {
            ...CLAUDE_DOCS,
            why: 'Cómo controlar qué tools expone el modelo y cómo validar argumentos.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'security-personal-data-privacy',
        title: 'Datos personales y privacidad',
        priority: 'recommended',
        summary:
          'Enviar datos personales a APIs de terceros implica riesgos de retención, registro y cumplimiento. Hay que minimizar lo enviado, anonimizar y revisar políticas de proveedores.',
        whyForMe:
          'La app de finanzas personales maneja datos sensibles; debo protegerlos por diseño.',
        exercise:
          'Audita qué datos de la app de finanzas viajan a APIs externas y diseña una estrategia de enmascaramiento.',
        sources: [
          {
            ...OWASP_LLM,
            why: 'Riesgos de privacidad y exfiltración en aplicaciones LLM.',
          },
          {
            ...CLAUDE_DOCS,
            why: 'Políticas y prácticas de manejo de datos con Claude.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'security-adversarial-testing',
        title: 'Testing adversarial',
        priority: 'recommended',
        summary:
          'El testing adversarial intenta romper el sistema con entradas inesperadas, jailbreaks o payloads maliciosos. Detectar estos fallos antes que los usuarios es esencial.',
        whyForMe:
          'orq debe resistir intentos de manipulación; una batería adversarial me da confianza antes de publicar.',
        exercise:
          'Escribe 10 casos de prueba adversaria para orq, ejecútalos y corrige las vulnerabilidades encontradas.',
        sources: [
          {
            ...WILLISON_PROMPT_INJECTION,
            why: 'Inspiración para casos de prueba adversarial reales.',
          },
          {
            ...PROMPTFOO_DOCS,
            why: 'Automatización de evaluaciones incluyendo pruebas de seguridad.',
          },
          {
            ...OWASP_LLM,
            why: 'Marco para priorizar vectores de ataque a testear.',
          },
        ],
        fromRoadmapSh: true,
      },
    ],
  },
  {
    id: 'produccion',
    title: 'Producción',
    goal: 'Llevar el sistema a producción.',
    topics: [
      {
        id: 'production-observability-traces',
        title: 'Observabilidad y trazas de LLM',
        priority: 'core',
        summary:
          'En producción hay que trazar cada llamada a LLM: entrada, salida, latencia, tokens, coste, errores y decisión de tools. Sin trazas, depurar es prácticamente imposible.',
        whyForMe:
          'orq tendrá muchos pasos ocultos; necesito visibilidad para entender por qué falla una ejecución.',
        exercise:
          'Añade trazas a una llamada de orq usando Langfuse y explora la traza resultante.',
        orqModule: 'M14',
        sources: [
          {
            ...LANGFUSE_DOCS,
            why: 'Plataforma de observabilidad y trazas para LLM.',
          },
          {
            ...ANTHROPIC_EFFECTIVE_AGENTS,
            why: 'Recomendaciones de Anthropic sobre observabilidad en agentes.',
          },
          {
            ...EUGENE_PATTERNS,
            why: 'Patrones de logging y trazas en sistemas con LLM.',
          },
        ],
        fromRoadmapSh: false,
      },
      {
        id: 'production-cost-latency',
        title: 'Coste y latencia: elegir modelo por tarea',
        priority: 'core',
        summary:
          'No todas las tareas necesitan el modelo más grande. Elegir el modelo adecuado por tarea, cachear y paralelizar permite reducir costes y latencia sin sacrificar calidad.',
        whyForMe:
          'orq debe ser viable económicamente; no puedo usar el modelo más caro para todo.',
        exercise:
          'Mide latencia y coste de una misma tarea con dos modelos distintos y elige el más adecuado.',
        sources: [
          {
            ...EUGENE_PATTERNS,
            why: 'Patrones de optimización de coste y latencia.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why: 'Análisis de trade-offs entre modelos, coste y calidad.',
          },
          {
            ...CLAUDE_DOCS,
            why: 'Comparativa de modelos y precios de Claude.',
          },
        ],
        fromRoadmapSh: false,
      },
      {
        id: 'production-prompt-versioning',
        title: 'Versionado de prompts',
        priority: 'recommended',
        summary:
          'Los prompts son código que cambia con frecuencia. Versionarlos permite comparar versiones, hacer rollback cuando una evaluación empeora y mantener un historial auditable.',
        whyForMe:
          'orq dependerá fuertemente del system prompt; versionarlo me da seguridad para iterar.',
        exercise:
          'Versiona el system prompt de una tarea de orq, ejecuta la evaluación contra ambas versiones y guarda el resultado.',
        sources: [
          {
            ...PROMPTFOO_DOCS,
            why: 'Soporte de versionado y evaluación comparativa de prompts.',
          },
          {
            ...HAMEL_EVALS,
            why: 'Importancia de medir el impacto de cambios en prompts.',
          },
          {
            ...EUGENE_PATTERNS,
            why: 'Buenas prácticas de gestión de prompts en producción.',
          },
        ],
        fromRoadmapSh: false,
      },
    ],
  },
  {
    id: 'multimodal',
    title: 'Multimodal',
    goal: 'Ampliar a imágenes y voz cuando sea necesario.',
    topics: [
      {
        id: 'multimodal-images',
        title: 'Entender imágenes con un LLM',
        priority: 'optional',
        summary:
          'Los modelos multimodales pueden recibir imágenes como entrada y extraer texto, describir contenido o responder preguntas sobre ellas. Abre casos de uso como el procesamiento de recibos.',
        whyForMe:
          'La app de finanzas personales podría procesar fotos de tickets o facturas en el futuro.',
        exercise:
          'Envía una imagen de un ticket a un modelo con visión y extrae el importe, la fecha y el comercio.',
        sources: [
          {
            ...CLAUDE_DOCS,
            why: 'Documentación sobre capacidades de visión en Claude.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why: 'Visión general de aplicaciones multimodales.',
          },
        ],
        fromRoadmapSh: true,
      },
      {
        id: 'multimodal-speech',
        title: 'Speech-to-text',
        priority: 'optional',
        summary:
          'El speech-to-text convierte audio en texto que el LLM puede procesar. Es útil para interfaces de voz o para transcribir notas de gastos.',
        whyForMe:
          'Podría permitir añadir gastos por voz en la app de finanzas personales.',
        exercise:
          'Transcribe un audio corto con una API o modelo local y pasa el texto a un agente de orq.',
        sources: [
          {
            ...CLAUDE_DOCS,
            why: 'Contexto sobre capacidades multimodales de Claude.',
          },
          {
            ...CHIP_HUYEN_BOOK,
            why: 'Consideraciones sobre pipelines de audio y voz.',
          },
        ],
        fromRoadmapSh: true,
      },
    ],
  },
];

export const REMOVED_ITEMS: RemovedItem[] = [
  {
    original: 'Prerrequisitos frontend, backend y full stack',
    decision: 'removed',
    reason: 'El usuario ya tiene estas habilidades.',
  },
  {
    original: 'Lista de siete proveedores',
    decision: 'reduced',
    reason: 'Basta con profundizar en un proveedor y añadir una capa multi-proveedor.',
  },
  {
    original: 'Ocho bases vectoriales alternativas',
    decision: 'reduced',
    reason: 'Se elige una única base vectorial para aprender bien.',
  },
  {
    original: 'Cuatro frameworks de RAG',
    decision: 'moved-to-end',
    reason: 'Aprender manualmente primero; usar un framework opcionalmente al final.',
  },
  {
    original:
      'APIs concretas de embeddings (OpenAI, Cohere, Gemini, Jina, Sentence Transformers)',
    decision: 'reduced',
    reason: 'Con una API de embeddings es suficiente para entender el concepto.',
  },
  {
    original: 'Hugging Face Hub, Transformers.js e Inference SDK',
    decision: 'reduced',
    reason: 'Basta con saber que existen; no son prioritarios para este perfil.',
  },
  {
    original:
      'Casos de uso de embeddings como recomendación o detección de anomalías',
    decision: 'reduced',
    reason: 'Quedan fuera de la ruta principal de aprendizaje.',
  },
  {
    original:
      'DALL-E, comprensión de vídeo y multimodal con LangChain o LlamaIndex',
    decision: 'removed',
    reason: 'Están fuera del objetivo de aprendizaje actual.',
  },
  {
    original: 'AI vs AGI e “impacto en el producto”',
    decision: 'reduced',
    reason: 'Se resume en una nota introductoria sin necesidad de sección propia.',
  },
];

export function getAllTopicIds(sections: Section[] = SECTIONS): string[] {
  return sections.flatMap((section) => section.topics.map((topic) => topic.id));
}

export function getTopicById(
  id: string,
  sections: Section[] = SECTIONS
): Topic | undefined {
  return sections.flatMap((section) => section.topics).find((topic) => topic.id === id);
}
