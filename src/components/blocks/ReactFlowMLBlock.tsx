import React, { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import type { BlockType } from "@/types/block"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from '@/lib/utils'

export interface ReactFlowMLBlockData {
  blockType: BlockType
  config: Record<string, any>
  onRemove: (id: string) => void
  onConfigChange: (id: string, config: Record<string, any>) => void
}

export const ReactFlowMLBlock = memo(({ 
  id, 
  data, 
  selected 
}: NodeProps<ReactFlowMLBlockData>) => {
  const { blockType, config, onRemove, onConfigChange } = data

  const handleConfigChange = (name: string, value: any) => {
    onConfigChange(id, { ...config, [name]: value })
  }

  const renderConfigOption = (option: import('../../types/block').ConfigOption) => {
    if (!option) return null

    switch (option.type) {
      case 'select':
        return (
          <Select
            key={option.name}
            defaultValue={String(config[option.name] || option.default)}
            onValueChange={(value: string) => handleConfigChange(option.name, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={option.label} />
            </SelectTrigger>
            <SelectContent>
              {option.options?.map((opt: string) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case 'multiselect':
        const selectedValues = config[option.name] || option.default || []
        return (
          <div key={option.name} className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {selectedValues.map((value: string) => (
                <Badge 
                  key={value} 
                  variant="secondary" 
                  className="text-xs cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => {
                    const newValues = selectedValues.filter((v: string) => v !== value)
                    handleConfigChange(option.name, newValues)
                  }}
                >
                  {value} ×
                </Badge>
              ))}
            </div>
            <Select
              onValueChange={(value: string) => {
                if (!selectedValues.includes(value)) {
                  handleConfigChange(option.name, [...selectedValues, value])
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Add ${option.label}`} />
              </SelectTrigger>
              <SelectContent>
                {option.options?.filter(opt => !selectedValues.includes(opt)).map((opt: string) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case 'textarea':
        return (
          <Textarea
            key={option.name}
            placeholder={option.label}
            value={config[option.name] || option.default || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleConfigChange(option.name, e.target.value)}
            className="bg-white/50 min-h-[80px]"
            rows={3}
          />
        )
      case 'string':
        return (
          <Input
            key={option.name}
            type="text"
            placeholder={option.label}
            value={String(config[option.name] || option.default || '')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleConfigChange(option.name, e.target.value)}
            className="bg-white/50"
          />
        )
      case 'number':
        return (
          <Input
            key={option.name}
            type="number"
            placeholder={option.label}
            value={config[option.name] || option.default || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleConfigChange(option.name, parseFloat(e.target.value) || 0)}
            className="bg-white/50"
          />
        )
      case 'boolean':
        return (
          <div key={option.name} className="flex items-center space-x-2">
            <Switch
              checked={config[option.name] || option.default || false}
              onCheckedChange={(checked: boolean) => handleConfigChange(option.name, checked)}
            />
            <span className="text-sm">{config[option.name] ? 'Enabled' : 'Disabled'}</span>
          </div>
        )
      case 'object':
        return (
          <div key={option.name} className="p-2 border rounded bg-muted/50">
            <span className="text-xs text-muted-foreground">Object configuration (advanced)</span>
          </div>
        )
      case 'array':
        return (
          <div key={option.name} className="p-2 border rounded bg-muted/50">
            <span className="text-xs text-muted-foreground">Array configuration (advanced)</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className={cn(
      "w-[280px] surface-elevated",
      selected && "ring-2 ring-primary shadow-xl"
    )}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 w-8 h-8 rounded flex items-center justify-center">
              <blockType.icon className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium text-sm">{blockType.label}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onRemove(id)}
          >
            ×
          </Button>
        </div>

        {/* Configuration Options */}
        {blockType.configOptions && (
          <div className="space-y-3 mb-4">
            {blockType.configOptions.map((option) => (
              <div key={option.name} className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  {option.label}
                </label>
                {renderConfigOption(option)}
              </div>
            ))}
          </div>
        )}

        {/* Input Handles - Dynamic based on block type */}
        {blockType.inputs.map((input, index) => (
          <Handle
            key={`input-${input.name}`}
            type="target"
            position={Position.Left}
            id={`input-${input.name}`}
            style={{
              top: blockType.inputs.length === 1 ? '50%' : `${(index + 1) * 100 / (blockType.inputs.length + 1)}%`,
              transform: 'translateY(-50%)',
              width: '12px',
              height: '12px',
              border: '2px solid #475569',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            className="hover:scale-125 hover:shadow-lg transition-all duration-200"
          />
        ))}

        {/* Output Handles - Dynamic based on block type */}
        {blockType.outputs.map((output, index) => (
          <Handle
            key={`output-${output.name}`}
            type="source"
            position={Position.Right}
            id={`output-${output.name}`}
            style={{
              top: blockType.outputs.length === 1 ? '50%' : `${(index + 1) * 100 / (blockType.outputs.length + 1)}%`,
              transform: 'translateY(-50%)',
              width: '12px',
              height: '12px',
              border: '2px solid #64748b',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            className="hover:scale-125 hover:shadow-lg transition-all duration-200"
          />
        ))}
      </div>
    </Card>
  )
})

ReactFlowMLBlock.displayName = 'ReactFlowMLBlock'
