"use client";

// import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ExcalidrawWrapper with no SSR
const ExcalidrawWrapper = dynamic(
  async () => (await import('@/components/custom/ExcalidrawWrapper')).default,
  {
    ssr: false,
  }
)

export default function ExcalidrawPage() {
  return <ExcalidrawWrapper />
}

// const ExcalidrawPage = () => {
//   const excalidrawRef = useRef(null);

//   return (
//     <div style={{
//       height: "100vh",
//       width: "99.2vw",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center"
//     }}>
//       <ExcalidrawWrapper ref={excalidrawRef} />
//     </div>
//   );
// };

// export default ExcalidrawPage;
