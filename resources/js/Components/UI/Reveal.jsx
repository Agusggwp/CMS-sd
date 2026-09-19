import React, { useEffect, useRef, useState } from 'react';

export default function Reveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 600,
    className = '',
    cascade = false,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (domRef.current) {
                        observer.unobserve(domRef.current);
                    }
                }
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        const current = domRef.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, []);

    const getDirectionClasses = () => {
        switch (direction) {
            case 'up':
                return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
            case 'down':
                return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8';
            case 'left':
                return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8';
            case 'right':
                return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8';
            case 'scale':
                return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
            case 'none':
            default:
                return isVisible ? 'opacity-100' : 'opacity-0';
        }
    };

    return (
        <div
            ref={domRef}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className={`transition-all will-change-transform ${getDirectionClasses()} ${className}`}
        >
            {children}
        </div>
    );
}
