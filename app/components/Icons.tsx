/**
 * Shared line-icon set (Puerto sereno). One consistent stroke weight,
 * currentColor. Replaces emoji glyphs across the site.
 */

type IconProps = { className?: string };

function base(path: React.ReactNode, extra?: React.ReactNode) {
  return function Icon({ className = "w-6 h-6" }: IconProps) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {path}
        {extra}
      </svg>
    );
  };
}

export const IconEye = base(
  <>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </>
);

export const IconChat = base(
  <>
    <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" />
    <path d="M8 9h8M8 13h5" />
  </>
);

export const IconBrain = base(
  <>
    <path d="M12 5a2.5 2.5 0 0 0-4.9-.7A2.5 2.5 0 0 0 4 7.5a2.5 2.5 0 0 0-.5 4.5A2.5 2.5 0 0 0 6 16.5a2.5 2.5 0 0 0 4 .5" />
    <path d="M12 5a2.5 2.5 0 0 1 4.9-.7A2.5 2.5 0 0 1 20 7.5a2.5 2.5 0 0 1 .5 4.5A2.5 2.5 0 0 1 18 16.5a2.5 2.5 0 0 1-4 .5" />
    <path d="M12 5v14" />
  </>
);

export const IconPuzzle = base(
  <path d="M8 4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4h-4a2 2 0 1 0-4 0H4v-4a2 2 0 1 0 0-4V4Z" />
);

export const IconUser = base(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </>
);

export const IconClipboard = base(
  <>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4a3 3 0 0 1 6 0M9 11h6M9 15h4" />
  </>
);

export const IconHeart = base(
  <path d="M12 20s-7-4.4-9-8.6C1.5 8 3.4 5 6.5 5 8.6 5 12 7 12 7s3.4-2 5.5-2C20.6 5 22.5 8 21 11.4 19 15.6 12 20 12 20Z" />
);

export const IconBlocks = base(
  <>
    <rect x="4" y="4" width="7" height="7" rx="1" />
    <rect x="13" y="4" width="7" height="7" rx="1" />
    <rect x="8.5" y="13" width="7" height="7" rx="1" />
  </>
);

export const IconHands = base(
  <>
    <path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M14 11V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1a5 5 0 0 1-4.3-2.5L5 15a1.6 1.6 0 0 1 2.6-1.8L8 14" />
  </>
);

export const IconCap = base(
  <>
    <path d="M2 9l10-5 10 5-10 5Z" />
    <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v5" />
  </>
);

export const IconTrophy = base(
  <>
    <path d="M8 4h8v5a4 4 0 0 1-8 0Z" />
    <path d="M8 6H5a2 2 0 0 0 3 3M16 6h3a2 2 0 0 1-3 3M10 13.5V16h4v-2.5M8 20h8M10 16h4" />
  </>
);

export const IconMic = base(
  <>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" />
  </>
);

export const IconLandmark = base(
  <path d="M3 9l9-5 9 5M5 9v8M19 9v8M9 9v8M15 9v8M3 21h18" />
);

export const IconStar = base(
  <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
);

export const IconScroll = base(
  <>
    <path d="M6 3h11a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H7a2 2 0 0 1-2-2V6" />
    <path d="M5 6a2 2 0 0 1 2-2M9 8h6M9 12h6M9 16h4" />
  </>
);

export const IconBadge = base(
  <>
    <path d="M12 3l2.4 1.7 2.9-.2 1 2.8 2.4 1.6-.9 2.8.9 2.8-2.4 1.6-1 2.8-2.9-.2L12 21l-2.4-1.7-2.9.2-1-2.8L3.3 15l.9-2.8-.9-2.8 2.4-1.6 1-2.8 2.9.2Z" />
    <path d="M9.5 12l1.8 1.8 3.2-3.6" />
  </>
);

export const IconHospital = base(
  <>
    <rect x="4" y="7" width="16" height="14" rx="2" />
    <path d="M9 21v-4h6v4M12 4v6M9 7h6M3 21h18" />
  </>
);

export const IconCalendar = base(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4" />
  </>
);

export const IconClock = base(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>
);

export const IconAccessibility = base(
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="6.9" r="1.2" fill="currentColor" stroke="none" />
    <path d="M6.5 9.4c1.8.9 3.6 1.2 5.5 1.2s3.7-.3 5.5-1.2M12 10.6V15m0 0l-2.2 4M12 15l2.2 4" />
  </>
);

export const IconArrow = base(<path d="M5 12h14M13 6l6 6-6 6" />);

export const IconCheck = base(<path d="M20 6 9 17l-5-5" />);

export const IconInstagram = base(
  <>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </>
);

export const IconMail = base(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </>
);

// WhatsApp uses a filled glyph rather than a stroke outline.
export function IconWhatsapp({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.05-1.35A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.5 12.4c-.3-.15-1.7-.83-1.95-.93-.26-.1-.45-.15-.64.15-.19.29-.74.92-.9 1.11-.17.2-.33.22-.62.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.14-.17.19-.29.29-.48.1-.2.05-.37-.02-.51-.07-.15-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.14.2 2.01 3.07 4.87 4.3.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z" />
    </svg>
  );
}
