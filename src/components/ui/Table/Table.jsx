const Table = ({ columns, data, onRowClick }) => (
  <div className="overflow-x-auto rounded-card border border-surface-border">
    <table className="w-full text-body-sm">
      <thead className="bg-surface-muted border-b border-surface-border">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-3 text-left font-medium text-text-secondary">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-surface-border bg-surface">
        {data.map((row, i) => (
          <tr
            key={row.id ?? i}
            onClick={() => onRowClick?.(row)}
            className={`${onRowClick ? 'cursor-pointer hover:bg-surface-muted' : ''} transition-base`}
          >
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-3 text-text-primary">
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
