import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import Table from '@/Components/UI/Table';
import Pagination from '@/Components/UI/Pagination';
import Button from '@/Components/UI/Button';

export default function DataTable({
    columns = [],
    data = [],
    pagination = null,
    searchable = true,
    searchValue = '',
    onSearch = null,
    searchPlaceholder = 'Cari data...',
    actionLabel = null,
    actionHref = null,
    onAction = null,
    emptyTitle = 'Belum Ada Data',
    emptyDescription = 'Tidak ada catatan yang tersedia untuk ditampilkan saat ini.',
    renderRow = null,
    className = '',
}) {
    const [localSearch, setLocalSearch] = useState(searchValue);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(localSearch);
        }
    };

    return (
        <div className={`bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden ${className}`}>
            {/* Header controls: Search & Action Button */}
            {(searchable || actionLabel) && (
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
                    {searchable && (
                        <form onSubmit={handleSearchSubmit} className="relative max-w-sm w-full">
                            <input
                                type="text"
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </form>
                    )}

                    {actionLabel && (
                        <div className="shrink-0">
                            <Button
                                size="sm"
                                href={actionHref}
                                onClick={onAction}
                            >
                                <Plus className="w-4 h-4" />
                                <span>{actionLabel}</span>
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Table */}
            <Table
                columns={columns}
                data={data}
                renderRow={renderRow}
                emptyMessage={emptyDescription}
            />

            {/* Pagination */}
            {pagination && pagination.links && (
                <div className="px-4 border-t border-slate-100 bg-slate-50/30">
                    <Pagination links={pagination.links} />
                </div>
            )}
        </div>
    );
}
