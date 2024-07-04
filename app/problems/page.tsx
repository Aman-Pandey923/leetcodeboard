import LCForm from "@/components/custom/lc-form"

const ProblemsPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="p-10 rounded-lg shadow-xl w-300">
    <h1 className="text-center text-3xl mb-5 font-bold">Enter Problem ID</h1>
    <div className="border p-5 mb-96 rounded-lg">
    <LCForm />
    </div>
    </div>
  </div>
)

export default ProblemsPage
