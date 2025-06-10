import { useState, useCallback, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { 
  ReactFlow, 
  Node, 
  Connection, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  Controls,
  Background,
  MiniMap,
  NodeTypes,
  ConnectionLineType,
  MarkerType,
  OnConnect,
  OnNodesDelete,
  OnEdgesDelete,
  BackgroundVariant
} from 'reactflow'
import 'reactflow/dist/style.css'

import { Blocks, Zap, Sparkles } from "lucide-react"
import { ReactFlowMLBlock, ReactFlowMLBlockData } from '@/components/blocks/ReactFlowMLBlock'
import { BlockLibrary } from '@/components/blocks/BlockLibrary'
import type { BlockType, MLBlockType } from '@/types/block'
import { BlockTypes } from '@/lib/blockTypes'

// Custom node types for React Flow
const nodeTypes: NodeTypes = {
  mlBlock: ReactFlowMLBlock,
}

interface ReactFlowWorkspaceProps {
  showGrid?: boolean
  showMinimap?: boolean
  sidebarCollapsed?: boolean
}

export interface ReactFlowWorkspaceRef {
  clearWorkspace: () => void
}

export const ReactFlowWorkspace = forwardRef<ReactFlowWorkspaceRef, ReactFlowWorkspaceProps>(({
  showGrid = true, 
  showMinimap = true, 
  sidebarCollapsed = false 
}, ref) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [blockTypes] = useState<BlockType[]>(BlockTypes)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [connectionPreview, setConnectionPreview] = useState<{
    source: string
    target: string
    status: 'valid' | 'invalid' | 'pending'
  } | null>(null)
  const [fitViewOnce, setFitViewOnce] = useState(false)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  useEffect(() => {
    // Leave empty to start with clean workspace
  }, [])

  const removeBlock = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id))
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id))
  }, [setNodes, setEdges])

  const handleConfigChange = useCallback((id: string, config: Record<string, any>) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              config,
            },
          }
        }
        return node
      })
    )
  }, [setNodes])

  // Clear error message after a delay
  useEffect(() => {
    if (connectionError) {
      const timer = setTimeout(() => setConnectionError(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [connectionError])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (e.ctrlKey || e.metaKey) {
          // Clear all connections
          setEdges([])
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [setEdges])

  const addBlock = useCallback((type: MLBlockType) => {
    const blockType = blockTypes.find(bt => bt.type === type)
    if (!blockType) return
    
    // Calculate position - use a simple approach without screenToFlowPosition
    let position = { x: 250, y: 250 } // Default center position
    
    if (reactFlowInstance && reactFlowWrapper.current) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const sidebarWidth = sidebarCollapsed ? 0 : 320
      
      // Get viewport info
      const viewport = reactFlowInstance.getViewport()
      
      // Calculate center of visible area
      const visibleWidth = reactFlowBounds.width - sidebarWidth
      const visibleHeight = reactFlowBounds.height
      
      // Transform screen coordinates to flow coordinates
      position = {
        x: (-viewport.x + visibleWidth / 2) / viewport.zoom,
        y: (-viewport.y + visibleHeight / 2) / viewport.zoom
      }
    }
    
    const nodeId = `${type}-${Date.now()}`
    const newNode: Node<ReactFlowMLBlockData> = {
      id: nodeId,
      type: 'mlBlock',
      position,
      data: {
        blockType,
        config: {},
        onRemove: removeBlock,
        onConfigChange: handleConfigChange,
      },
    }
    
    setNodes((nds) => nds.concat(newNode))
  }, [blockTypes, setNodes, removeBlock, handleConfigChange, sidebarCollapsed, reactFlowInstance])

  const clearWorkspace = useCallback(() => {
    setNodes([])
    setEdges([])
  }, [setNodes, setEdges])

  useImperativeHandle(ref, () => ({
    clearWorkspace
  }), [clearWorkspace])

  // Validate connection compatibility
  const isValidConnection = useCallback((connection: Connection): boolean => {
    const sourceNode = nodes.find(node => node.id === connection.source)
    const targetNode = nodes.find(node => node.id === connection.target)
    
    if (!sourceNode || !targetNode || !connection.sourceHandle || !connection.targetHandle) {
      return false
    }

    // Prevent self-connections
    if (connection.source === connection.target) {
      setConnectionError("Cannot connect a block to itself")
      return false
    }

    const sourceBlockType = sourceNode.data.blockType
    const targetBlockType = targetNode.data.blockType

    // Extract output and input names from handle IDs
    const outputName = connection.sourceHandle.replace('output-', '')
    const inputName = connection.targetHandle.replace('input-', '')

    // Find the specific output and input definitions
    const outputDef = sourceBlockType.outputs.find((output: any) => output.name === outputName)
    const inputDef = targetBlockType.inputs.find((input: any) => input.name === inputName)

    if (!outputDef || !inputDef) {
      setConnectionError("Invalid connection points")
      return false
    }

    // Check data type compatibility
    if (outputDef.dataType !== inputDef.dataType) {
      setConnectionError(`Cannot connect ${outputDef.dataType} to ${inputDef.dataType}`)
      return false
    }

    // Check if target input is already connected
    const existingConnection = edges.find(edge => 
      edge.target === connection.target && edge.targetHandle === connection.targetHandle
    )
    
    if (existingConnection) {
      setConnectionError("Input is already connected")
      return false
    }

    return true
  }, [nodes, edges])

  // Enhanced connection handling with validation and feedback
  const onConnect: OnConnect = useCallback((connection) => {
    setConnectionPreview({
      source: connection.source || '',
      target: connection.target || '',
      status: 'pending'
    })

    // Add a small delay for visual feedback
    setTimeout(() => {
      if (isValidConnection(connection)) {
        const newEdge = {
          id: `${connection.source}-${connection.target}-${Date.now()}`,
          ...connection,
          type: 'smoothstep',
          animated: true,                style: {
                  strokeWidth: 3,
                  stroke: 'hsl(var(--primary))',
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color: 'hsl(var(--primary))',
                  width: 12,  // Reduced from 16
                  height: 12, // Reduced from 16
                  strokeWidth: 2,
                },
          data: {
            sourceBlockType: nodes.find(n => n.id === connection.source)?.data.blockType,
            targetBlockType: nodes.find(n => n.id === connection.target)?.data.blockType,
          }
        }
        
        setEdges((eds) => addEdge(newEdge, eds))
        setConnectionPreview({ ...connectionPreview!, status: 'valid' })
        
        // Success feedback
        setTimeout(() => {
          setConnectionPreview(null)
        }, 500)
      } else {
        setConnectionPreview({ ...connectionPreview!, status: 'invalid' })
        
        // Error feedback
        setTimeout(() => {
          setConnectionPreview(null)
        }, 1000)
      }
    }, 200)
  }, [isValidConnection, setEdges, nodes, connectionPreview])

  const onNodesDelete: OnNodesDelete = useCallback((deleted) => {
    const deletedIds = deleted.map(node => node.id)
    setEdges((eds) => eds.filter((edge) => 
      !deletedIds.includes(edge.source) && !deletedIds.includes(edge.target)
    ))
  }, [setEdges])

  const onEdgesDelete: OnEdgesDelete = useCallback((deleted) => {
    setEdges((eds) => eds.filter((edge) => 
      !deleted.some(deletedEdge => deletedEdge.id === edge.id)
    ))
  }, [setEdges])

  // Add an effect to fit view only once when nodes are loaded
  useEffect(() => {
    if (nodes.length > 0 && !fitViewOnce) {
      setFitViewOnce(true)
    }
  }, [nodes.length])

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
      <div className="flex h-full overflow-hidden" ref={reactFlowWrapper}>
        {/* Enhanced Sidebar - Modern Design */}
        <div className={`${
          sidebarCollapsed ? 'w-0' : 'w-72 sm:w-80 md:w-80 lg:w-80 xl:w-80 2xl:w-96'
        } border-r border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm flex-shrink-0 transition-all duration-300 ${
          sidebarCollapsed ? 'overflow-hidden' : 'overflow-hidden'
        }`}>
          <div className={`h-full ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            {/* Block Library */}
            <BlockLibrary 
              onAddBlock={addBlock}
            />
          </div>
        </div>

        {/* Modern Main Workspace */}
        <div className="flex-1 relative overflow-hidden">
          {/* Error Notification */}
          {connectionError && (
            <div className="absolute top-4 lg:top-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300 px-4">
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-3 lg:px-4 py-2 lg:py-3 rounded-lg shadow-lg backdrop-blur-sm flex items-center space-x-2 max-w-[90vw]">
                <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></div>
                <span className="font-medium text-sm truncate">{connectionError}</span>
              </div>
            </div>
          )}

          {/* Connection Preview Feedback */}
          {connectionPreview && (
            <div className="absolute top-16 lg:top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-200 px-4">
              <div className={`px-3 lg:px-4 py-2 lg:py-3 rounded-lg shadow-lg backdrop-blur-sm flex items-center space-x-2 max-w-[90vw] transition-all duration-200 ${
                connectionPreview.status === 'valid' 
                  ? 'bg-green-500/10 border border-green-500/20 text-green-700' 
                  : connectionPreview.status === 'invalid'
                  ? 'bg-red-500/10 border border-red-500/20 text-red-700'
                  : 'bg-slate-500/10 border border-slate-500/20 text-slate-700'
              }`}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  connectionPreview.status === 'valid' 
                    ? 'bg-green-500' 
                    : connectionPreview.status === 'invalid'
                    ? 'bg-red-500'
                    : 'bg-slate-500 animate-pulse'
                }`}></div>
                <span className="font-medium text-sm truncate">
                  {connectionPreview.status === 'valid' && 'Connection established!'}
                  {connectionPreview.status === 'invalid' && 'Connection failed'}
                  {connectionPreview.status === 'pending' && 'Validating connection...'}
                </span>
              </div>
            </div>
          )}

          {/* Removing Pipeline Status Box */}

          {/* Enhanced Empty State - Mobile Responsive */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center max-w-lg">
                <div className="relative mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent w-16 lg:w-24 h-16 lg:h-24 rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto mb-4 lg:mb-6 border border-primary/20 shadow-lg">
                    <Blocks className="h-8 lg:h-12 w-8 lg:w-12 text-primary" />
                  </div>
                  
                  {/* Floating decorative elements */}
                  <div className="absolute -top-1 lg:-top-2 -right-1 lg:-right-2 bg-gradient-to-r from-primary to-primary/80 w-4 lg:w-6 h-4 lg:h-6 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="h-2 lg:h-3 w-2 lg:w-3 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 bg-gradient-to-r from-secondary to-accent w-3 lg:w-4 h-3 lg:h-4 rounded-full shadow-lg"></div>
                </div>

                <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4 text-gradient">
                  Start Building Your Pipeline
                </h3>
                <p className="text-muted-foreground text-sm lg:text-lg leading-relaxed mb-6 lg:mb-8">
                  Drag blocks from the library to create powerful ML workflows with our intuitive visual interface.
                </p>
                
                {/* Feature highlights - Responsive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 max-w-sm lg:max-w-md mx-auto">
                  <div className="surface-interactive p-3 lg:p-4 text-left">
                    <div className="w-6 lg:w-8 h-6 lg:h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-2 lg:mb-3">
                      <Blocks className="h-3 lg:h-4 w-3 lg:w-4 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm lg:text-base">Drag & Drop</h4>
                    <p className="text-xs lg:text-sm text-muted-foreground">Build pipelines visually</p>
                  </div>
                  <div className="surface-interactive p-3 lg:p-4 text-left">
                    <div className="w-6 lg:w-8 h-6 lg:h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-2 lg:mb-3">
                      <Zap className="h-3 lg:h-4 w-3 lg:w-4 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm lg:text-base">Smart Connections</h4>
                    <p className="text-xs lg:text-sm text-muted-foreground">Type-safe data flow</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <ReactFlow
            nodes={nodes}
            edges={edges}
            className="bg-gradient-app h-full w-full"
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            connectionLineType={ConnectionLineType.SmoothStep}
            connectionLineStyle={{
              strokeWidth: 3,
              stroke: 'hsl(var(--primary))',
              opacity: 0.8
            }}
            minZoom={0.2}
            maxZoom={2}
            fitView={!fitViewOnce}
            fitViewOptions={{
              padding: 0.2,
              includeHiddenNodes: false,
              duration: 200
            }}
            proOptions={{ hideAttribution: true }}
          >
            <Controls 
              position="bottom-left"
              showZoom={true}
              showFitView={true}
              showInteractive={true}
              className="glass-panel rounded-lg shadow-lg mr-36 mb-4"
            />
            {showGrid && (
              <Background 
                gap={20}
                size={1}
                color="hsl(var(--muted-foreground))"
                style={{
                  opacity: showGrid ? 0.4 : 0,
                  transition: 'opacity 0.2s ease-in-out',
                }}
                variant={BackgroundVariant.Dots}
              />
            )}
            {showMinimap && (
              <MiniMap
                position="bottom-right"
                style={{
                  height: 100,
                  width: 160,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '0.5rem',
                  marginRight: '20px',
                  marginBottom: '80px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                zoomable
                pannable
                className="glass-panel shadow-lg"
                nodeColor={(node) => {
                  const blockType = node.data?.blockType
                  if (blockType?.color) {
                    return blockType.color
                  }
                  const category = blockType?.category?.toLowerCase()
                  switch (category) {
                    case 'data': return '#0ea5e9'
                    case 'preprocessing': return '#10b981'
                    case 'model': return '#8b5cf6'
                    case 'evaluation': return '#f97316'
                    case 'visualization': return '#ef4444'
                    default: return 'hsl(var(--primary))'
                  }
                }}
                maskColor="rgba(0, 0, 0, 0.1)"
              />
            )}
          </ReactFlow>
        </div>
      </div>
    </div>
  )
})

ReactFlowWorkspace.displayName = 'ReactFlowWorkspace'
