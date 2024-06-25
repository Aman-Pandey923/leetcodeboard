// pages/excalidraw.js
"use client";

import React, { useRef, useEffect } from 'react';
import ExcalidrawWrapper from '@/components/ExcalidrawWrapper';

const ExcalidrawPage = () => {
  const excalidrawRef = useRef(null);

  useEffect(() => {
    if (excalidrawRef.current) {
      // You can access Excalidraw API methods here
      console.log(excalidrawRef.current);
    }
  }, []);

  return (
    <div style={{
      height: "100vh",
      width: "99.2vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <ExcalidrawWrapper ref={excalidrawRef} />
    </div>
  );
};

export default ExcalidrawPage;


// import dynamic from "next/dynamic";

// // Since client components get prerenderd on server as well hence importing 
// // the excalidraw stuff dynamically with ssr false

// const ExcalidrawWrapper = dynamic(
//   async () => (await import("../excalidrawWrapper")).default,
//   {
//     ssr: false,
//   },
// );

// export default function Page() {
//   return (
//     <ExcalidrawWrapper />      
//   );
// }