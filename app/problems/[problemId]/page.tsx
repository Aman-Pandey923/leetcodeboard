"use client"

import dynamic from "next/dynamic"

const ExcalidrawWrapper = dynamic(
  async () => (await import("@/components/custom/ExcalidrawWrapper")).default,
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
        <ExcalidrawWrapper problemId={params.problemId} />
      </div>
    </main>
  )
}
