import React, { useState } from 'react';

const Table = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No data found',
  searchable = false,
  searchPlaceholder = 'Search...',
}) => {
  const [search, setSearch] = useState('');

  const filtered = searchable
    ? data.filter((row) =>
        columns.some((col) =>
          String(row[col.key] ?? '')
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      )
    : data;

  return (
    <div>
      {searchable && (
        <div style={{ marginBottom: 16 }}>
          <input
            className="filter-input"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '100%' }}
          />
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ textAlign: 'center', color: 'var(--muted)', padding: '32px 0' }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 20,
                      height: 20,
                      border: '2px solid rgba(255,255,255,0.1)',
                      borderTop: '2px solid #f97316',
                      borderRadius: '50%',
                      animation: 'spin 0.7s linear infinite',
                      marginRight: 8,
                      verticalAlign: 'middle',
                    }}
                  />
                  Loading...
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ textAlign: 'center', color: 'var(--muted)', padding: '32px 0' }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              filtered.map((row, rowIndex) => (
                <tr key={row.id ?? rowIndex}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && filtered.length > 0 && (
        <div style={{ marginTop: 12, color: 'var(--muted)', fontSize: '0.8rem' }}>
          Showing {filtered.length} of {data.length} records
          {searchable && search && ` for "${search}"`}
        </div>
      )}
    </div>
  );
};

export default Table;