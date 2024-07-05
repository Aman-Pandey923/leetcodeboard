"use client"

import {
  Excalidraw,
  MainMenu,
  WelcomeScreen,
  serializeAsJSON,
  restore,
} from "@excalidraw/excalidraw"
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types"
import { AppState, BinaryFiles } from "@excalidraw/excalidraw/types/types"
import { useCallback, useState, useEffect } from "react"
import debounce from "lodash/debounce"
import { getDocumentData, setDocumentData } from "@/lib/firebase/crud"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase/crud"

interface ExcalidrawWrapperProps {
  problemId: string
}

const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ({ problemId }) => {
  const [user] = useAuthState(auth)
  const [initialData, setInitialData] = useState<any>(null)
  const [forceRender, setForceRender] = useState(false)

  const saveToCloud = useCallback(
    debounce(
      async (
        elements: readonly ExcalidrawElement[],
        appState: AppState,
        files: BinaryFiles
      ) => {
        if (user && problemId) {
          const documentId = `${user.uid}_${problemId}`
          const content = serializeAsJSON(elements, appState, files, "local")
          await setDocumentData(user.uid, problemId, { content })
        }
      },
      1000
    ),
    [user, problemId]
  )

  const onChange = (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) => {
    saveToCloud(elements, appState, files)
  }

  const retrieveInitialData = async () => {
    try {
      if (user && problemId) {
        const docData = await getDocumentData(user.uid, problemId)
        if (docData && docData.content) {
          return JSON.parse(docData.content)
        }
      }
      return null
    } catch (error) {
      console.error(
        `Error retrieving initial data for problemId: ${problemId}`,
        error
      )
      return null
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await retrieveInitialData()
      setInitialData(data)
    }

    fetchInitialData()

    const timer = setTimeout(() => {
      setForceRender(true)
    }, 6000)

    return () => clearTimeout(timer)
  }, [user, problemId])

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 3.5rem)",
        zIndex: 9999,
        position: "relative",
        overflow: "hidden"
      }}
      className="z-100"
    >
      {(initialData !== null || forceRender) && (
        <Excalidraw onChange={onChange} initialData={initialData}>
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
          <WelcomeScreen>
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.Heading>
                Create your Notes here!
              </WelcomeScreen.Center.Heading>
              <WelcomeScreen.Center.Menu>
                <WelcomeScreen.Center.MenuItemHelp />
              </WelcomeScreen.Center.Menu>
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  )
}

export default ExcalidrawWrapper
