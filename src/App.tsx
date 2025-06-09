import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Blocks } from "lucide-react"

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const WorkspacePage = lazy(() => import('@/pages/WorkspacePage'))

function LoadingSpinner(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-slate-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Blocks className="h-8 w-8 text-slate-600 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Loading MLBricks</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Building your ML workspace...</p>
        </div>
      </div>
    </div>
  )
}

function App(): JSX.Element {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
