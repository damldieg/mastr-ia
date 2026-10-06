import { REMOVED_ITEMS } from '../data/roadmap.ts';

const DECISION_LABELS: Record<(typeof REMOVED_ITEMS)[number]['decision'], string> = {
  removed: 'Quitado',
  reduced: 'Reducido',
  'moved-to-end': 'Movido al final',
};

export function RemovedTable() {
  return (
    <table className="removed-table">
      <caption>Qué he quitado de roadmap.sh y por qué</caption>
      <thead>
        <tr>
          <th scope="col">Original</th>
          <th scope="col">Decisión</th>
          <th scope="col">Razón</th>
        </tr>
      </thead>
      <tbody>
        {REMOVED_ITEMS.map((item) => (
          <tr key={item.original}>
            <td>{item.original}</td>
            <td>{DECISION_LABELS[item.decision]}</td>
            <td>{item.reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
