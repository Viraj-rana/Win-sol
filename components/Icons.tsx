import React from "react";

export const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const XCircleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

export const AlertTriangleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const FileCodeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="m9 13-2 2 2 2" />
    <path d="m15 13 2 2-2 2" />
  </svg>
);

export const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);


//settings gear icon
export const SettingsIcon = ({ className }: { className?: string }) => (
  <svg
  width="24"
    height="24"
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  stroke="#000000"
  fill="#0298f5"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
    {/* Outer gear teeth */}
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58z" />

    {/* Inner circle */}
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const GitPullRequestIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <path d="M13 6h3a2 2 0 0 1 2 2v7" />
    <line x1="6" y1="9" x2="6" y2="21" />
  </svg>
);
//main logo in front of winsolution ai text
export const RefreshCwIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
    width="24"
    height="24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Main circular background - adjusted to be more subtle */}
    <path
      d="M128.416 929.176a381.336 81.488 0 1 0 762.672 0 381.336 81.488 0 1 0-762.672 0Z"
      fill="currentColor"
      opacity="0.1"
    />

    {/* Blue parts - using currentColor so it follows the parent color */}
    <path
      d="M680.408 762.672h-352l-40 168c0 25.128 102.224 45.448 216 45.448s216-20.32 216-45.448l-40-168z"
      fill="currentColor"
    />
    <path
      d="M768.944 380.776c-9.52-25.608 0-46.448 0-46.448s-97.352-84.848-111.944-99.44c-14.584-14.584-14.288-26.792-25.008-34.536-10.72-7.744-63.12-23.824-65.504-26.2-2.384-2.384 15.128-20.36 24.536-29.776-7.152-5.36-50.144-5.36-59.08-5.36-8.928 0-10.152-53.256-10.152-80.344-22.328 0-49.104 74.096-49.104 74.096-70.56 0-186.672 96.464-186.672 264.384 0 66.992 42.872 184 58.944 241.16 3.824 13.568 7.992 33.016 8.832 44.36 101.208 0.296 200 0 304 0 0.984-13.336-1.4-31.376-1.4-51.208 0-82.768-157.8-223.896-157.8-234.616z"
      fill="currentColor"
    />
    <path
      d="M768.408 722.672c0 22.088-13.024 40-29.096 40H285.504c-16.072 0-29.096-17.912-29.096-40s13.024-40 29.096-40h453.816c16.064 0 29.088 17.912 29.088 40z"
      fill="currentColor"
    />

    {/* White parts - replaced with currentColor + opacity to keep icon style consistent */}
    <path
      d="M504.408 992.12c-9.48 0-232-0.696-232-61.448 0-1.248 0.152-2.496 0.44-3.704l40-168a16 16 0 0 1 15.56-12.296h352a16 16 0 0 1 15.56 12.296l40 168c0.288 1.216 0.44 2.456 0.44 3.704 0 60.744-222.52 61.448-232 61.448z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M454.496 698.8c-33.496 0-66.984-0.032-100.736-0.128a16 16 0 0 1-15.904-14.824c-0.68-9.128-4.232-26.84-8.272-41.2-3.608-12.832-8.536-28.568-14.248-46.792-19.12-61.016-45.296-144.576-45.296-198.704 0-163.496 109.512-270.48 191.352-279.736z"
      fill="currentColor"
      opacity="0.85"
    />
    <path
      d="M388.4 695.928a16.016 16.016 0 0 1-15.4-11.672c-4.184-14.912-10.904-35.056-18.672-58.376-22.24-66.736-49.92-149.8-49.92-201.48 0-176.192 90.904-298.984 172.496-298.984z"
      fill="currentColor"
      opacity="0.8"
    />
  </svg>
);

//old cloud icon

// export const CloudIcon = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24" // ← changed to standard 24×24 viewBox
//     width="24"
//     height="24"
//     className={className}
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
//     <path d="M21 3v5h-5" />
//     <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
//     <path d="M8 16H3v5" />
//   </svg>
// );

//sync cloud icon
export const CloudIcon = ({ className }: { className?: string }) => (
<svg
  width="24"
    height="24"
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 392.544 392.544"
  fill="#0298f5"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    
    <path
      
      d="M370.758,265.812c0.065-23.402-11.766-44.8-31.677-57.341c-4.461-2.78-6.335-8.404-4.331-13.317 c6.788-16.873,8.792-34.651,5.948-52.622c-6.982-43.572-43.83-78.093-87.725-82.295c-29.156-2.715-57.471,7.24-78.287,27.604 c-2.521,2.521-6.271,3.556-9.762,2.844c-6.465-1.293-13.059-1.939-19.653-1.939c-54.303,0-98.521,44.218-98.521,98.521 c0,5.624,0.517,11.378,1.616,17.519c0.711,3.814-0.711,7.564-3.556,10.149c-16.614,14.545-24.824,35.556-22.626,57.471 c3.168,31.806,29.608,57.665,61.414,60.186l222.319,0.129C341.538,331.558,370.629,301.497,370.758,265.812z"
    ></path>
    <path
      
      d="M357.958,195.089c5.818-18.036,7.24-37.172,4.267-56.048 c-8.469-53.269-53.657-95.483-107.248-100.525c-33.616-3.168-66.457,7.628-91.41,29.802c-6.012-0.905-12.218-1.422-18.295-1.422 c-66.392,0-120.307,54.044-120.307,120.307c0,5.107,0.388,10.214,1.099,15.451c-19.006,19.071-28.315,44.865-25.6,71.951 c4.267,42.343,39.434,76.671,81.907,79.838c0.259,0,0.517,0,0.776,0l222.901,0.129l0,0c0.129,0,0.259,0,0.388,0 c47.321-1.616,85.851-41.438,86.109-88.76C392.609,237.885,379.873,212.026,357.958,195.089z M83.599,332.657 c-31.935-2.521-58.246-28.38-61.414-60.186c-2.133-21.915,6.012-42.99,22.626-57.471c2.844-2.521,4.267-6.335,3.556-10.15 c-1.099-6.206-1.616-11.895-1.616-17.519c0-54.303,44.218-98.521,98.521-98.521c6.594,0,13.123,0.711,19.653,1.939 c3.556,0.711,7.176-0.388,9.762-2.844c20.816-20.299,49.131-30.319,78.287-27.604c43.895,4.073,80.808,38.723,87.725,82.295 c2.844,18.101,0.84,35.749-5.948,52.622c-2.004,4.848-0.129,10.537,4.331,13.317c19.911,12.541,31.806,33.939,31.677,57.341 c-0.129,35.685-29.22,65.745-64.84,67.103L83.599,332.657z"
    ></path>
    <path
      
      d="M327.38,226.895l-0.065-0.065c-13.382-8.404-18.877-25.147-12.929-39.822v-0.065 c5.301-13.123,6.853-26.958,4.655-41.051c-5.43-33.875-34.069-60.832-68.202-64c-2.457-0.259-5.042-0.388-7.499-0.388 c-20.105,0-39.111,7.822-53.527,21.851l-0.065,0.065c-7.693,7.564-18.618,10.796-29.156,8.663h-0.065 c-5.042-1.034-10.214-1.552-15.321-1.552c-42.343,0-76.735,34.457-76.735,76.735c0,4.267,0.453,8.727,1.293,13.705 c2.069,11.248-1.939,22.756-10.537,30.319h-0.065c-11.184,9.891-16.743,24.048-15.321,38.917 c2.069,21.269,19.523,38.465,40.727,40.598l220.832,0.129c23.467-1.034,43.378-21.657,43.442-45.253 C348.972,249.845,340.956,235.364,327.38,226.895z"
    ></path>
    <path
      
      d="M303.203,161.15c-4.719-2.909-10.925-1.552-13.834,3.168l-10.99,17.455 c-11.442-33.875-43.378-58.246-81.067-58.246c-47.321,0-85.721,38.465-85.721,85.721s38.465,85.721,85.721,85.721 c5.56,0,10.02-4.461,10.02-10.02s-4.461-10.02-10.02-10.02c-36.137,0-65.616-29.414-65.616-65.616s29.414-65.616,65.616-65.616 c29.026,0,53.721,19.006,62.255,45.253l-20.881-13.059c-4.719-2.909-10.925-1.552-13.834,3.168 c-2.909,4.719-1.552,10.925,3.168,13.834l39.564,24.889c5.107,3.232,11.184,1.552,13.834-3.168l24.889-39.564 C309.344,170.329,307.922,164.188,303.203,161.15z"
    ></path>
  </g>
</svg>);

export const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const GitLabIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m22 13.29-1.91-7.14a.92.92 0 0 0-.89-.65.94.94 0 0 0-.9.66l-1.59 5.27H7.29l-1.59-5.27a.93.93 0 0 0-1.79 0L2 13.29a.92.92 0 0 0 .33 1.06L12 21l9.67-6.65a.92.92 0 0 0 .33-1.06Z" />
  </svg>
);

export const LockIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const CloudDownloadIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const ShareIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const LinkIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const LayoutIcon = ({ className }: { className?: string }) => (
 <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"
  
   aria-hidden="true" role="img" 
   width="24" height="24"
   preserveAspectRatio="xMidYMid meet"
    fill="#000000" 
    stroke="#000000">
      <g id="SVGRepo_bgCarrier" stroke-width="0">
        </g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
          </g><g id="SVGRepo_iconCarrier">
            <path fill="#FFD983" d="M0 18c0 9.941 8.059 18 18 18c.295 0 .58-.029.87-.043C24.761 33.393 29 26.332 29 18C29 9.669 24.761 2.607 18.87.044C18.58.03 18.295 0 18 0C8.059 0 0 8.059 0 18z">
              </path><path fill="#66757F" d="M29 18C29 9.669 24.761 2.607 18.87.044C28.404.501 36 8.353 36 18c0 9.646-7.594 17.498-17.128 17.956C24.762 33.391 29 26.331 29 18z"></path>
              <circle fill="#FFCC4D" cx="10.5" cy="8.5" r="3.5"></circle><circle fill="#FFCC4D" cx="20" cy="16" r="3"></circle>
              <circle fill="#FFCC4D" cx="21.5" cy="27.5" r="3.5"></circle><circle fill="#FFCC4D" cx="21" cy="6" r="2"></circle>
              <circle fill="#FFCC4D" cx="3" cy="18" r="1"></circle><circle fill="#5B6876" cx="30" cy="9" r="1"></circle>
              <circle fill="#FFCC4D" cx="15" cy="31" r="1"></circle><circle fill="#5B6876" cx="32" cy="19" r="2"></circle>
              <circle fill="#FFCC4D" cx="10" cy="23" r="2"></circle></g></svg>);

export const CopyIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const SparklesIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M3 5h4" />
    <path d="M21 17v4" />
    <path d="M19 19h4" />
  </svg>
);

export const DownloadIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
