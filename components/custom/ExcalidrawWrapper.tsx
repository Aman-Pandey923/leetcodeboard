"use client";

import { Excalidraw, convertToExcalidrawElements} from '@excalidraw/excalidraw'

const ExcalidrawWrapper: React.FC = () => {
  return (
    <div className='h-screen'>
      <Excalidraw />
    </div>
  )
}

export default ExcalidrawWrapper

// import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
// import dynamic from 'next/dynamic';
// import { serializeAsJSON, restore } from '@excalidraw/excalidraw';

// const Excalidraw = dynamic(() => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw), { ssr: false });

// const ExcalidrawWrapper = forwardRef((props, ref) => {
//   const excalidrawRef = useRef(null);

//   useImperativeHandle(ref, () => ({
//     // Expose Excalidraw API methods here if needed
//     getSceneElements: () => excalidrawRef.current?.getSceneElements(),
//     getAppState: () => excalidrawRef.current?.getAppState(),
//   }));

//   useEffect(() => {
//     if (typeof window !== 'undefined' && excalidrawRef.current) {
//       // Load saved drawing data from local storage
//       const savedDrawing = localStorage.getItem('excalidraw');
//       if (savedDrawing) {
//         const { elements, appState } = JSON.parse(savedDrawing);
//         excalidrawRef.current.updateScene({
//           elements: restore(elements, { deserialize: false }),
//           appState: restore(appState, { deserialize: false }),
//           commitToHistory: true
//         });
//       }
//     }
//   }, []);

//   const handleChange = (elements, appState) => {
//     // Save drawing data to local storage
//     const drawingData = serializeAsJSON(elements, appState);
//     localStorage.setItem('excalidraw', drawingData);
//   };

//   return (
//     <Excalidraw
//       ref={excalidrawRef}
//       onChange={(elements, appState) => handleChange(elements, appState)}
//     />
//   );
// });

// ExcalidrawWrapper.displayName = 'ExcalidrawWrapper';

// export default ExcalidrawWrapper;

