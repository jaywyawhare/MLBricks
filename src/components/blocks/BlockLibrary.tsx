import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { BlockType, MLBlockType, BlockCategory } from "@/types/block"
import { BlockTypes } from "@/lib/blockTypes"
import { useState } from "react"

interface BlockLibraryProps {
  onAddBlock: (type: MLBlockType) => void
}

export function BlockLibrary({ onAddBlock }: BlockLibraryProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<BlockCategory, boolean>>({
    Data: false,
    Preprocessing: false,
    Sklearn: false,
    XGBoost: false,
    LightGBM: false,
    "Neural Networks": false,
    Evaluation: false,
    Visualization: false,
    Output: false
  })

  const toggleCategory = (category: BlockCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  // Group blocks by category
  const categorizedBlocks = BlockTypes.reduce((acc, block) => {
    if (!acc[block.category]) {
      acc[block.category] = []
    }
    acc[block.category].push(block)
    return acc
  }, {} as Record<BlockCategory, BlockType[]>)

  const categoryColors: Record<BlockCategory, string> = {
    Data: "bg-slate-500/10 text-slate-700 border-slate-500/20",
    Preprocessing: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    Sklearn: "bg-purple-500/10 text-purple-700 border-purple-500/20",
    XGBoost: "bg-orange-500/10 text-orange-700 border-orange-500/20",
    LightGBM: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    "Neural Networks": "bg-red-500/10 text-red-700 border-red-500/20",
    Evaluation: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
    Visualization: "bg-teal-500/10 text-teal-700 border-teal-500/20",
    Output: "bg-gray-500/10 text-gray-700 border-gray-500/20"
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Block Categories */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-4 space-y-4">
          {Object.entries(categorizedBlocks).map(([category, blocks]) => (
            <div key={category} className="space-y-2">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category as BlockCategory)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${categoryColors[category as BlockCategory]}`}>
                    {category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {blocks.length}
                  </span>
                </div>
                {expandedCategories[category as BlockCategory] ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {/* Category Blocks */}
              {expandedCategories[category as BlockCategory] && (
                <div className="space-y-2 ml-4">
                  {blocks.map((block) => (
                    <Card
                      key={block.type}
                      className="cursor-pointer hover:shadow-md transition-all duration-200 border-border/50 hover:border-border hover:bg-card/80"
                      onClick={() => onAddBlock(block.type)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${block.color} text-white shadow-sm`}>
                            <block.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm text-foreground truncate">
                              {block.label}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {block.description}
                            </p>
                            
                            {/* Input/Output indicators */}
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                In: {block.inputs.length}
                              </span>
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                                Out: {block.outputs.length}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}