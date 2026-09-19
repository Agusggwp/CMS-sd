import React, { useState, useRef, useEffect } from 'react';

export default function Dropdown({
    trigger,
    children,
    align = 'right',
    width = 'w-48',
    className = '',
}) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const alignmentClasses = {
        left: 'left-0 origin-top-left',
        right: 'right-0 origin-top-right',
    };

    return (
        <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
            <div onClick={() => setOpen(!open)}>{trigger}</div>

            {open && (
                <div
                    className={`absolute z-50 mt-2 ${width} rounded-xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none py-1.5 border border-slate-100 ${
                        alignmentClasses[align] || alignmentClasses.right
                    }`}
                    onClick={() => setOpen(false)}
                >
                    {children}
                </div>
            )}
        </div>
    );
}
