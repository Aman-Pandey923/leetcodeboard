import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';

const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
  { ssr: false }
);

const ExcalidrawWrapper = forwardRef((props, ref) => {
  return <Excalidraw ref={ref} {...props} />;
});

ExcalidrawWrapper.displayName = 'ExcalidrawWrapper';

export default ExcalidrawWrapper;
