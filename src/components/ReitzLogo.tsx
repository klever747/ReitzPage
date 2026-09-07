import React from 'react';

interface ReitzLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export const ReitzLogo: React.FC<ReitzLogoProps> = ({
  className = 'w-28 h-36',
  showSubtitle = true,
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 420"
        className="w-full h-full drop-shadow-[0_2px_14px_rgba(212,175,55,0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Gold Gradient matching original branding */}
          <linearGradient id="reitzGoldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faeec1" />
            <stop offset="18%" stopColor="#f3dd88" />
            <stop offset="45%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#9a7418" />
            <stop offset="90%" stopColor="#dfbf59" />
            <stop offset="100%" stopColor="#faeec1" />
          </linearGradient>

          <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3dd88" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="75%" stopColor="#8c6814" />
            <stop offset="100%" stopColor="#f8eab4" />
          </linearGradient>
        </defs>

        {/* Architectural Outline Frame (Exact geometry from Reitz.png) */}
        {/* Left vertical (80,175 to 80,360) | Roofline (80,175 to 225,75) | Right vertical (225,75 to 225,360) | Base (225,360 to 80,360) */}
        <path
          d="M 80 360 L 80 176 L 225 76 L 225 360 L 80 360 Z"
          stroke="url(#frameGradient)"
          strokeWidth="7.5"
          strokeLinejoin="miter"
          strokeMiterlimit="6"
          fill="rgba(10, 9, 13, 0.4)"
        />

        {/* Serif 'R' - Stem with classical head and foot serifs */}
        <path
          d="M 98 186 L 144 186 L 138 194 L 126 194 L 126 312 L 138 312 L 144 320 L 98 320 L 104 312 L 116 312 L 116 194 L 104 194 Z"
          fill="url(#reitzGoldMetallic)"
        />

        {/* Serif 'R' - Upper Bowl */}
        <path
          d="M 124 186 C 172 186 204 196 204 226 C 204 256 168 266 124 266 L 124 254 C 160 254 189 248 189 226 C 189 204 156 198 124 198 Z"
          fill="url(#reitzGoldMetallic)"
        />

        {/* Serif 'R' - Sweeping Leg crossing gracefully outside right boundary */}
        <path
          d="M 148 252 C 164 252 178 265 190 286 C 203 309 218 333 246 339 C 238 340 220 340 208 326 C 196 312 185 292 174 274 C 166 262 158 257 148 254 Z"
          fill="url(#reitzGoldMetallic)"
        />

        {/* Signature 'By Cofiza' text at bottom right */}
        {showSubtitle && (
          <text
            x="215"
            y="350"
            textAnchor="end"
            fill="url(#reitzGoldMetallic)"
            fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif"
            fontSize="11.5"
            fontWeight="600"
            letterSpacing="0.6"
          >
            By Cofiza
          </text>
        )}
      </svg>
    </div>
  );
};
