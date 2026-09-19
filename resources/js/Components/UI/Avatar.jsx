import React, { useState } from 'react';

export function Avatar({ className = '', children, title, ...props }) {
    return (
        <div
            className={`relative flex shrink-0 overflow-hidden rounded-full ${className}`}
            title={title}
            {...props}
        >
            {children}
        </div>
    );
}

export function AvatarImage({ src, alt = '', className = '', ...props }) {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) return null;

    return (
        <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className={`aspect-square h-full w-full object-cover ${className}`}
            {...props}
        />
    );
}

export function AvatarFallback({ className = '', children, ...props }) {
    return (
        <div
            className={`flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-white font-semibold ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export default Avatar;
