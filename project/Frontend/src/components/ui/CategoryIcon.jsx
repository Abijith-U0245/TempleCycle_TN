import React from 'react';

// Clean line icons for product categories
export function IncenseIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v8" />
      <path d="M12 10c0 4-2 6-2 10h4c0-4-2-6-2-10z" />
      <path d="M10 22h4" />
      <path d="M9 4c0 0-1-1-1-2s1-2 2-2" />
      <path d="M15 4c0 0 1-1 1-2s-1-2-2-2" />
      <path d="M8 6c-1 0-2-1-2-2" opacity="0.5" />
      <path d="M16 6c1 0 2-1 2-2" opacity="0.5" />
    </svg>
  );
}

export function CompostIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c-4.97 0-9-4.03-9-9 0-4.5 3.5-8.5 8-8.95" />
      <path d="M12 22c4.97 0 9-4.03 9-9 0-4.5-3.5-8.5-8-8.95" />
      <path d="M12 2v4" />
      <path d="M12 8c-2 2-3 5-3 8" />
      <path d="M12 8c2 2 3 5 3 8" />
      <path d="M7 12c1.5 0 3 .5 4 2" />
      <path d="M17 12c-1.5 0-3 .5-4 2" />
      <circle cx="12" cy="16" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function DyeIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 12h16" />
      <path d="M12 4v16" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="8" cy="16" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.5" />
      <path d="M2 8h2M20 8h2M2 16h2M20 16h2" opacity="0.4" />
    </svg>
  );
}

export function EssentialOilIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2h4l1 4H9l1-4z" />
      <path d="M9 6h6v2c0 1-1 2-3 2s-3-1-3-2V6z" />
      <path d="M8 10c-2 1-4 4-4 8 0 2 1 4 8 4s8-2 8-4c0-4-2-7-4-8" />
      <path d="M12 10v4" />
      <circle cx="12" cy="16" r="2" opacity="0.4" />
      <path d="M9 14c-1 1-2 2-2 4" opacity="0.4" />
      <path d="M15 14c1 1 2 2 2 4" opacity="0.4" />
    </svg>
  );
}

export function TempleIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l4 6H8l4-6z" />
      <path d="M8 8h8v2H8V8z" />
      <path d="M6 10h12l2 4H4l2-4z" />
      <path d="M4 14h16v2H4v-2z" />
      <path d="M6 16v6M18 16v6" />
      <path d="M10 16v6M14 16v6" />
      <path d="M3 22h18" />
      <circle cx="12" cy="5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function SHGIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3" />
      <path d="M12 10c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4z" />
      <circle cx="5" cy="9" r="2" />
      <path d="M5 11c-2 0-3 1-3 2v1h3" />
      <circle cx="19" cy="9" r="2" />
      <path d="M19 11c2 0 3 1 3 2v1h-3" />
      <path d="M8 20v2M12 18v4M16 20v2" opacity="0.5" />
    </svg>
  );
}

export function FlowerIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2c-1.5 2-2 4-2 5.5C10 9 11 10 12 10s2-1 2-2.5c0-1.5-.5-3.5-2-5.5z" />
      <path d="M12 2c-1.5 2-2 4-2 5.5C10 9 11 10 12 10s2-1 2-2.5c0-1.5-.5-3.5-2-5.5z" transform="rotate(60 12 12)" />
      <path d="M12 2c-1.5 2-2 4-2 5.5C10 9 11 10 12 10s2-1 2-2.5c0-1.5-.5-3.5-2-5.5z" transform="rotate(120 12 12)" />
      <path d="M12 2c-1.5 2-2 4-2 5.5C10 9 11 10 12 10s2-1 2-2.5c0-1.5-.5-3.5-2-5.5z" transform="rotate(180 12 12)" />
      <path d="M12 2c-1.5 2-2 4-2 5.5C10 9 11 10 12 10s2-1 2-2.5c0-1.5-.5-3.5-2-5.5z" transform="rotate(240 12 12)" />
      <path d="M12 2c-1.5 2-2 4-2 5.5C10 9 11 10 12 10s2-1 2-2.5c0-1.5-.5-3.5-2-5.5z" transform="rotate(300 12 12)" />
      <path d="M12 15v7" />
      <path d="M10 18c-2-1-3-2-4-2" />
      <path d="M14 18c2-1 3-2 4-2" />
    </svg>
  );
}

export function QualityIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
      <path d="M12 8v4l2.5 1.5" />
    </svg>
  );
}

export default function CategoryIcon({ category, className = "w-6 h-6" }) {
  const icons = {
    incense_powder: IncenseIcon,
    compost: CompostIcon,
    natural_dye: DyeIcon,
    essential_oil: EssentialOilIcon,
    temple: TempleIcon,
    shg: SHGIcon,
    flower: FlowerIcon,
    quality: QualityIcon,
  };

  const Icon = icons[category] || FlowerIcon;
  return <Icon className={className} />;
}