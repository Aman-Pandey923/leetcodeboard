"use client"

import dynamic from "next/dynamic"

const ExcalidrawWrapper = dynamic(
  async () => (await import("@/components/custom/ExcalidrawDemo")).default,
  {
    ssr: false,
  }
)

export default function Problems({
  params,
}: {
  params: { problemId: string }
}) {
  return (
    <main>
      <div>
        <ExcalidrawWrapper identifier={"000"} />
      </div>
    </main>
  )
}