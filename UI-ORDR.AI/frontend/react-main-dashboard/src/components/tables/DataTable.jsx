import React, { useState, useMemo } from 'react'
import Pagination from '../ui/Pagination'
import Icon from '../Icon'

export default function DataTable({
  columns = [],
  data = [],
  title = null,
  onRowClick = null,
  rowActions = null,
  itemsPerPage = 10,
  searchableFields = [],
  sortableFields = [],
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data

    return data.filter((row) =>
      searchableFields.some((field) => {
        const value = row[field]
        return value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      })
    )
  }, [data, searchQuery, searchableFields])

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData

    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key]
      const bVal = b[sortConfig.key]

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

    return sorted
  }, [filteredData, sortConfig])

  // Paginate
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (key) => {
    if (!sortableFields.includes(key)) return

    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  return (
    <div className="w-full">
      {/* Search Bar */}
      {searchableFields.length > 0 && (
        <div className="mb-4">
          <div className="relative">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-lg border border-on-surface/10 focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="mb-4 rounded-[32px] overflow-hidden shadow-sm bg-surface-container-lowest">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-container border-b border-on-surface/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-left font-headline font-bold text-sm text-on-surface ${
                    sortableFields.includes(col.key) ? 'cursor-pointer hover:bg-surface-container-high' : ''
                  }`}
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortableFields.includes(col.key) && (
                      <Icon
                        name={
                          sortConfig.key === col.key
                            ? sortConfig.direction === 'asc'
                              ? 'arrow_upward'
                              : 'arrow_downward'
                            : 'unfold_more'
                        }
                        size={16}
                        className="text-on-surface-variant"
                      />
                    )}
                  </div>
                </th>
              ))}
              {rowActions && <th className="px-6 py-3 text-left font-headline font-bold text-sm text-on-surface">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (rowActions ? 1 : 0)} className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="inbox" size={32} className="text-on-surface-variant opacity-50" />
                    <p className="text-on-surface-variant font-body text-sm">No data found</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-on-surface/10 hover:bg-surface-container transition-colors cursor-pointer"
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 text-on-surface font-body text-sm"
                      onClick={(e) => {
                        if (col.key === 'actions') e.stopPropagation()
                      }}
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-6 py-4 text-on-surface font-body text-sm">
                      <div className="flex items-center gap-2">
                        {rowActions.map((action, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={(e) => {
                              e.stopPropagation()
                              action.onClick?.(row)
                            }}
                            className="p-2 hover:bg-surface-container rounded-lg transition-colors"
                            title={action.label}
                          >
                            <Icon name={action.icon} size={18} className="text-on-surface-variant" />
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  )
}
