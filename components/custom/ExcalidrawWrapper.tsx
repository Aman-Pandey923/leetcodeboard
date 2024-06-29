"use client";

import { Excalidraw, MainMenu, WelcomeScreen, serializeAsJSON } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';
import { useCallback } from 'react';
import debounce from 'lodash/debounce';

interface ExcalidrawWrapperProps {
  identifier: string;
}

const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ({ identifier }) => {
  const saveToLocalStorage = useCallback(
    debounce((elements: readonly ExcalidrawElement[],
      appState: AppState,
      files: BinaryFiles
    ) => {
      const content = serializeAsJSON(elements, appState, files, "local");
      localStorage.setItem(`excalidraw_${identifier}`, content);
    }, 1000), // Save after 1 second of inactivity
    [identifier]
  );

  const onChange = (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) => {
    saveToLocalStorage(elements, appState, files);
  };

  const retrieveInitialData = () => {
    const content = localStorage.getItem(`excalidraw_${identifier}`);
    if (content != null) {
      return JSON.parse(content);
    }
    return null;
  };


  return (
    <div style={{width: "213.1vh", height: "100vh", zIndex: 9999, position: "relative" }} className='z-100'>
      <Excalidraw onChange={onChange} initialData={retrieveInitialData()}>
        <MainMenu>
          <MainMenu.Group title="Excalidraw items">
            <MainMenu.DefaultItems.LoadScene />
            <MainMenu.DefaultItems.Export />
            <MainMenu.DefaultItems.SaveToActiveFile />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.Help />
            <MainMenu.DefaultItems.ClearCanvas />
          </MainMenu.Group>
          <MainMenu.Group>
            <MainMenu.DefaultItems.ToggleTheme />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu.Group>
        </MainMenu>
        <WelcomeScreen >
        <WelcomeScreen.Center>
            <WelcomeScreen.Center.Heading>
              Create your Notes here !
            </WelcomeScreen.Center.Heading>
            <WelcomeScreen.Center.Menu>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center.Menu>
          </WelcomeScreen.Center>
        </WelcomeScreen>
      </Excalidraw>
    </div>
  )
}

export default ExcalidrawWrapper
