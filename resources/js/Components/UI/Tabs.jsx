import React from 'react';

export default function Tabs({
    tabs = [],
    activeTab,
    onChange,
    className = '',
}) {
    return (
        <div className={`border-b border-slate-200 ${className}`}>
            <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onChange(tab.id)}
                            className={`group inline-flex items-center py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors cursor-pointer ${
                                isActive
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                        >
                            {Icon && (
                                <Icon
                                    className={`-ml-0.5 mr-2 h-4 w-4 ${
                                        isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-500'
                                    }`}
                                />
                            )}
                            {tab.label}
                            {tab.badge !== undefined && (
                                <span
                                    className={`ml-2 py-0.5 px-2 rounded-full text-xs font-semibold ${
                                        isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                                    }`}
                                >
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
