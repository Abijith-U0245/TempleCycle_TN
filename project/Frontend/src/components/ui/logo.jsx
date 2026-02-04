import React from 'react';

export default function Logo({ size = 'md', showText = true, className = '' }) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 56, text: 'text-2xl' },
    xl: { icon: 72, text: 'text-3xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Mark - Lotus + Recycling + Temple */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Outer recycling circle */}
        <circle cx="32" cy="32" r="30" stroke="url(#gradient1)" strokeWidth="2" fill="none" />
        
        {/* Temple gopuram silhouette at top */}
        <path
          d="M32 8L36 16H28L32 8ZM28 16H36V20H28V16ZM26 20H38L40 24H24L26 20Z"
          fill="url(#gradient2)"
          opacity="0.9"
        />
        
        {/* Central lotus flower */}
        <g transform="translate(32, 36)">
          {/* Center */}
          <circle cx="0" cy="0" r="4" fill="#F59E0B" />
          
          {/* Lotus petals - circular arrangement forming recycling pattern */}
          <path d="M0 -4C-3 -8 -6 -12 0 -16C6 -12 3 -8 0 -4Z" fill="url(#gradient1)" />
          <path d="M3.5 -2C7 -4 11 -6 14 0C11 6 7 4 3.5 2Z" fill="url(#gradient1)" transform="rotate(60)" />
          <path d="M3.5 -2C7 -4 11 -6 14 0C11 6 7 4 3.5 2Z" fill="url(#gradient1)" transform="rotate(120)" />
          <path d="M3.5 -2C7 -4 11 -6 14 0C11 6 7 4 3.5 2Z" fill="url(#gradient1)" transform="rotate(180)" />
          <path d="M3.5 -2C7 -4 11 -6 14 0C11 6 7 4 3.5 2Z" fill="url(#gradient1)" transform="rotate(240)" />
          <path d="M3.5 -2C7 -4 11 -6 14 0C11 6 7 4 3.5 2Z" fill="url(#gradient1)" transform="rotate(300)" />
        </g>
        
        {/* Recycling arrows subtle */}
        <path
          d="M20 48C16 44 14 38 16 32"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M44 48C48 44 50 38 48 32"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${text} leading-tight tracking-tight`}>
            <span className="text-amber-600">Temple</span>
            <span className="text-gray-900">Cycle</span>
          </span>
          <span className="text-xs font-medium text-gray-500 tracking-wider uppercase">
            Tamil Nadu
          </span>
        </div>
      )}
    </div>
  );
}