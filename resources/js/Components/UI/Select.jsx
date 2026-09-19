import React from 'react';

export default function Select({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = '-- Pilih Opsi --',
    error,
    helperText,
    required = false,
    className = '',
    disabled = false,
    ...props
}) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1.5">
                    {label} {required && <span className="text-rose-500">*</span>}
                </label>
            )}
            <select
                id={name}
                name={name}
                value={value ?? ''}
                onChange={onChange}
                disabled={disabled}
                className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-white transition-colors duration-150 focus:outline-none focus:ring-2 disabled:bg-slate-100 disabled:text-slate-400 ${
                    error
                        ? 'border-rose-300 text-rose-900 focus:border-rose-500 focus:ring-rose-200'
                        : 'border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-blue-100'
                } ${className}`}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt) => (
                    <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
                        {opt.label ?? opt.name}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
            {!error && helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
        </div>
    );
}
