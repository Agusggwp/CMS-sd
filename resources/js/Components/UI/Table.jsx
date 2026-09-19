import React from 'react';

export default function Table({
    columns = [],
    data = [],
    keyField = 'id',
    renderRow,
    emptyMessage = 'Tidak ada data ditemukan.',
    className = '',
}) {
    return (
        <div className={`overflow-x-auto w-full ${className}`}>
            <table className="w-full text-left border-collapse text-sm">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-600">
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className={`px-4 py-3.5 ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'} ${col.className || ''}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {data.length > 0 ? (
                        data.map((item, index) =>
                            renderRow ? (
                                renderRow(item, index)
                            ) : (
                                <tr key={item[keyField] ?? index} className="hover:bg-slate-50/50 transition-colors">
                                    {columns.map((col, cIdx) => (
                                        <td
                                            key={cIdx}
                                            className={`px-4 py-3 text-slate-700 ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'} ${col.className || ''}`}
                                        >
                                            {col.render ? col.render(item, index) : item[col.field]}
                                        </td>
                                    ))}
                                </tr>
                            )
                        )
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-400">
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
