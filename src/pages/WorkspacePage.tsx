import { useState, useEffect } from 'react'
import { ReactFlowWorkspace } from '@/components/ReactFlowWorkspace'
import { Button } from '@/components/ui/button'
import {
  Blocks,
  Upload,
  Save,
  Play,
  Maximize2,
  Minimize2,
  Menu,
  X,
  HelpCircle,
  Grid3X3,
  Eye,
  EyeOff,
  Undo,
  Redo,
  CheckCircle2,
  AlertCircle,
  Keyboard,
  Lightbulb,
  ChevronRight,
  Map as MapIcon
} from 'lucide-react'
import { Link } from 'react-router-dom'

function WorkspacePage() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showGrid, setShowGrid] = useState(true)
  const [sidebarCollapsed] = useState(false)
  const [showMinimap, setShowMinimap] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [workspaceStatus, setWorkspaceStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  // Auto-save simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setWorkspaceStatus('saving')
      setTimeout(() => {
        setWorkspaceStatus('saved')
        setLastSaved(new Date())
        setTimeout(() => setWorkspaceStatus('idle'), 2000)
      }, 1000)
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault()
        setShowGrid(!showGrid)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault()
        setShowMinimap(!showMinimap)
      }
      if (e.key === 'F11') {
        e.preventDefault()
        toggleFullscreen()
      }
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        setShowKeyboardShortcuts(!showKeyboardShortcuts)
      }
      if (e.key === 'Escape') {
        setShowKeyboardShortcuts(false)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showGrid, showMinimap, showKeyboardShortcuts])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleSave = () => {
    setWorkspaceStatus('saving')
    setTimeout(() => {
      setWorkspaceStatus('saved')
      setLastSaved(new Date())
      setTimeout(() => setWorkspaceStatus('idle'), 2000)
    }, 1000)
  }

  const formatLastSaved = (date: Date | null) => {
    if (!date) return ''
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  // Event handlers are now directly used in the component

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left Section - Branding & Status */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                  <Blocks className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent">
                    MLBricks
                  </span>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Workspace</div>
                </div>
              </Link>
              
              {/* Status Indicator */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 dark:bg-slate-800/80 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                {workspaceStatus === 'saving' && (
                  <>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-400">Saving...</span>
                  </>
                )}
                {workspaceStatus === 'saved' && (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      Saved {formatLastSaved(lastSaved)}
                    </span>
                  </>
                )}
                {workspaceStatus === 'error' && (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-sm font-medium text-red-700 dark:text-red-400">Error saving</span>
                  </>
                )}
                {workspaceStatus === 'idle' && (
                  <>
                    <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Ready</span>
                  </>
                )}
              </div>
            </div>

            {/* Center Section - Quick Actions */}
            <div className="hidden lg:flex items-center gap-1">
              <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                <Redo className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
              <Button variant="ghost" size="sm" onClick={handleSave} disabled={workspaceStatus === 'saving'} className="gap-2">
                <Save className="w-4 h-4" />
                Save
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-lg hover:shadow-xl transition-all">
                <Play className="w-4 h-4" />
                Run Pipeline
              </Button>
            </div>

            {/* Right Section - View & Settings */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1">
                <Button 
                  variant={showGrid ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setShowGrid(prev => !prev)}
                  className="gap-2"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button 
                  variant={showMinimap ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setShowMinimap(prev => !prev)}
                  className="gap-2"
                >
                  {showMinimap ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>
              
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
              
              <Button variant="ghost" size="sm" onClick={() => setShowKeyboardShortcuts(true)} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                <HelpCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                className="md:hidden text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200/50 dark:border-slate-800/50 py-4 animate-fade-in">
              <div className="space-y-4">
                {/* Mobile Status */}
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">                      {workspaceStatus === 'saving' && (
                        <>
                          <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-400">Saving...</span>
                        </>
                      )}
                  {workspaceStatus === 'saved' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">
                        Saved {formatLastSaved(lastSaved)}
                      </span>
                    </>
                  )}
                  {workspaceStatus === 'idle' && (
                    <>
                      <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Ready</span>
                    </>
                  )}
                </div>
                
                {/* Mobile Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" onClick={() => setShowGrid(!showGrid)} className="gap-2 justify-start">
                    <Grid3X3 className="w-4 h-4" />
                    {showGrid ? 'Hide Grid' : 'Show Grid'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowMinimap(!showMinimap)} className="gap-2 justify-start">
                    {showMinimap ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showMinimap ? 'Hide Map' : 'Show Map'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSave} disabled={workspaceStatus === 'saving'} className="gap-2 justify-start">
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 justify-start">
                    <Upload className="w-4 h-4" />
                    Import
                  </Button>
                </div>
                
                <Button className="w-full gap-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white">
                  <Play className="w-4 h-4" />
                  Run Pipeline
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="hidden sm:flex items-center gap-2 px-4 sm:px-6 lg:px-8 py-3 text-sm text-slate-600 dark:text-slate-400 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
        <Link to="/" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="font-medium text-slate-900 dark:text-slate-100">Workspace</span>
        <ChevronRight className="w-4 h-4" />
        <span>Untitled Pipeline</span>
      </div>

      {/* Main Workspace */}
      <main className="relative h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)]">
        <ReactFlowWorkspace 
          showGrid={showGrid}
          showMinimap={showMinimap}
          sidebarCollapsed={sidebarCollapsed}
        />
      </main>

      {/* Keyboard Shortcuts Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          variant="secondary"
          onClick={() => setShowKeyboardShortcuts(true)}
          className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center"
        >
          <Keyboard className="h-6 w-6" />
        </Button>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
                  <Keyboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Keyboard Shortcuts</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Master MLBricks with these shortcuts</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowKeyboardShortcuts(false)} className="rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* General Actions */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-slate-500" />
                  General Actions
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Save workspace</span>
                    </div>
                    <div className="flex gap-1">
                      <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Ctrl</kbd>
                      <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">S</kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Toggle fullscreen</span>
                    </div>
                    <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">F11</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Show/hide help</span>
                    </div>
                    <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">?</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Close dialogs</span>
                    </div>
                    <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Esc</kbd>
                  </div>
                </div>
              </div>

              {/* View Controls */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-slate-500" />
                  View Controls
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Grid3X3 className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Toggle grid</span>
                    </div>
                    <div className="flex gap-1">
                      <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Ctrl</kbd>
                      <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">G</kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <MapIcon className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Toggle minimap</span>
                    </div>
                    <div className="flex gap-1">
                      <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Ctrl</kbd>
                      <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">M</kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Zoom to fit</span>
                    </div>
                    <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Space</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Select all</span>
                    </div>
                    <div className="flex gap-1">
                      <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Ctrl</kbd>
                      <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">A</kbd>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 p-4 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl border border-slate-300/50 dark:border-slate-600/50">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Pro Tips</h5>
                  <ul className="text-sm text-slate-800 dark:text-slate-200 space-y-1">
                    <li>• Hold Shift while dragging to create straight connections</li>
                    <li>• Right-click on connections to delete them quickly</li>
                    <li>• Use the minimap for quick navigation in large pipelines</li>
                    <li>• Drag multiple blocks at once by selecting them first</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkspacePage