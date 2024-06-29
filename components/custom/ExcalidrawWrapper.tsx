"use client";

import { Excalidraw, WelcomeScreen, serializeAsJSON} from '@excalidraw/excalidraw'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';

interface ExcalidrawWrapperProps {
  identifier: string;
}

const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ({ identifier }) => {
  const onChange = (
    elements: readonly ExcalidrawElement[], 
    appState: AppState,
    files: BinaryFiles
  ) => {
    const content = serializeAsJSON(elements, appState, files, "local")
    localStorage.setItem(`excalidraw_${identifier}`, content)
  }

const retrieveinitialData = () => {
  const content = localStorage.getItem(`excalidraw_${identifier}`)
  if (content!=null) {
    return JSON.parse(content)
  }
}

  return (
    <div className='h-screen z-100'>
      <Excalidraw onChange={onChange} initialData={retrieveinitialData()}>
        <WelcomeScreen />
      </Excalidraw>
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

