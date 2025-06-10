import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Brain, 
  Plus, 
  Trash2, 
  Layers, 
  Settings, 
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import type { 
  NeuralNetworkConfig, 
  HiddenLayerConfig, 
  LayerType,
  LayerCategory 
} from '../types/layers';

// Layer categories for organization
const LAYER_CATEGORIES: Record<LayerCategory, { name: string; layers: LayerType[] }> = {
  basic: {
    name: 'Basic Layers',
    layers: ['dense', 'dropout', 'flatten', 'reshape']
  },
  conv: {
    name: 'Convolutional',
    layers: ['conv1d', 'conv2d', 'conv3d', 'separable_conv2d', 'depthwise_conv2d']
  },
  pooling: {
    name: 'Pooling',
    layers: ['maxpool1d', 'maxpool2d', 'avgpool1d', 'avgpool2d', 'globalpool2d']
  },
  recurrent: {
    name: 'Recurrent',
    layers: ['lstm', 'gru', 'simple_rnn', 'bidirectional', 'conv_lstm', 'lstm_cell', 'gru_cell']
  },
  attention: {
    name: 'Attention & Transformers',
    layers: ['attention', 'multi_head_attention', 'self_attention', 'cross_attention', 'transformer', 'positional_encoding']
  },
  normalization: {
    name: 'Normalization',
    layers: ['batch_norm', 'layer_norm', 'group_norm']
  },
  activation: {
    name: 'Activation',
    layers: ['relu', 'leaky_relu', 'elu', 'prelu', 'thresholded_relu', 'softmax']
  },
  advanced: {
    name: 'Advanced',
    layers: ['embedding', 'time_distributed', 'residual', 'upsampling2d', 'zero_padding2d', 'spectral_norm', 'masked']
  }
};

interface NeuralNetworkBuilderProps {
  onConfigChange?: (config: NeuralNetworkConfig) => void;
  initialConfig?: Partial<NeuralNetworkConfig>;
}

export function NeuralNetworkBuilder({ onConfigChange, initialConfig }: NeuralNetworkBuilderProps) {
  const [config, setConfig] = useState<NeuralNetworkConfig>({
    input_layer: {
      shape: '784',
      preprocessing: 'none'
    },
    hidden_layers: [],
    output_layer: {
      units: 10,
      activation: 'softmax'
    },
    optimizer: 'adam',
    learning_rate: 0.001,
    loss_function: 'categorical_crossentropy',
    metrics: ['accuracy'],
    epochs: 100,
    batchSize: 32,
    validationSplit: 0.2,
    ...initialConfig
  });

  const [expandedCategories, setExpandedCategories] = useState<Record<LayerCategory, boolean>>({
    basic: true,
    conv: false,
    pooling: false,
    recurrent: false,
    attention: false,
    normalization: false,
    activation: false,
    advanced: false
  });

  const updateConfig = (newConfig: Partial<NeuralNetworkConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    onConfigChange?.(updated);
  };

  const addLayer = (layerType: LayerType) => {
    const newLayer = {
      type: layerType,
      ...(layerType === 'dense' && { units: 64, activation: 'relu' }),
      ...(layerType === 'dropout' && { rate: 0.2 }),
      ...(layerType === 'conv2d' && { filters: 32, kernelSize: 3, activation: 'relu' }),
      ...(layerType === 'lstm' && { units: 50, returnSequences: false }),
      ...(layerType === 'batch_norm' && { momentum: 0.99, epsilon: 0.001 }),
    } as HiddenLayerConfig;

    updateConfig({
      hidden_layers: [...config.hidden_layers, newLayer]
    });
  };

  const removeLayer = (index: number) => {
    const newLayers = config.hidden_layers.filter((_, i) => i !== index);
    updateConfig({ hidden_layers: newLayers });
  };

  const updateLayer = (index: number, updates: Partial<HiddenLayerConfig>) => {
    const newLayers = config.hidden_layers.map((layer, i) => 
      i === index ? { ...layer, ...updates } as HiddenLayerConfig : layer
    );
    updateConfig({ hidden_layers: newLayers });
  };

  const toggleCategory = (category: LayerCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Neural Network Builder</h1>
          <p className="text-muted-foreground">Design and configure neural network architectures</p>
        </div>
      </div>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="builder" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Builder
          </TabsTrigger>
          <TabsTrigger value="library" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Layer Library
          </TabsTrigger>
        </TabsList>

        {/* Builder Tab */}
        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Layer Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">IN</span>
                  </div>
                  Input Layer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Input Shape</label>
                  <Input
                    value={config.input_layer.shape}
                    onChange={(e) => updateConfig({
                      input_layer: { ...config.input_layer, shape: e.target.value }
                    })}
                    placeholder="e.g., 784 or 28,28,1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Preprocessing</label>
                  <Select
                    value={config.input_layer.preprocessing}
                    onValueChange={(value) => updateConfig({
                      input_layer: { ...config.input_layer, preprocessing: value as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="normalize">Normalize (0-1)</SelectItem>
                      <SelectItem value="standardize">Standardize (z-score)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Hidden Layers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded flex items-center justify-center">
                    <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  Hidden Layers ({config.hidden_layers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {config.hidden_layers.map((layer, index) => (
                    <div key={index} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="capitalize">
                          {layer.type.replace('_', ' ')}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLayer(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Dynamic layer configuration based on type */}
                      {(layer.type === 'dense' || layer.type === 'lstm' || layer.type === 'gru') && (
                        <div>
                          <label className="text-xs font-medium">Units</label>
                          <Input
                            type="number"
                            value={layer.units || ''}
                            onChange={(e) => updateLayer(index, { units: parseInt(e.target.value) || 0 })}
                            className="mt-1"
                          />
                        </div>
                      )}
                      
                      {(layer.type === 'conv1d' || layer.type === 'conv2d' || layer.type === 'conv3d') && (
                        <>
                          <div>
                            <label className="text-xs font-medium">Filters</label>
                            <Input
                              type="number"
                              value={layer.filters || ''}
                              onChange={(e) => updateLayer(index, { filters: parseInt(e.target.value) || 0 })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium">Kernel Size</label>
                            <Input
                              type="number"
                              value={Array.isArray(layer.kernelSize) ? layer.kernelSize.join(',') : (layer.kernelSize || '')}
                              onChange={(e) => updateLayer(index, { kernelSize: parseInt(e.target.value) || 0 })}
                              className="mt-1"
                            />
                          </div>
                        </>
                      )}
                      
                      {layer.type === 'dropout' && (
                        <div>
                          <label className="text-xs font-medium">Dropout Rate</label>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            max="1"
                            value={layer.rate || ''}
                            onChange={(e) => updateLayer(index, { rate: parseFloat(e.target.value) || 0 })}
                            className="mt-1"
                          />
                        </div>
                      )}
                      
                      {layer.type !== 'dropout' && layer.type !== 'flatten' && (
                        <div>
                          <label className="text-xs font-medium">Activation</label>
                          <Select
                            value={'activation' in layer ? (layer.activation || 'none') : 'none'}
                            onValueChange={(value) => updateLayer(index, { activation: value as any })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="relu">ReLU</SelectItem>
                              <SelectItem value="tanh">Tanh</SelectItem>
                              <SelectItem value="sigmoid">Sigmoid</SelectItem>
                              <SelectItem value="softmax">Softmax</SelectItem>
                              <SelectItem value="leaky_relu">Leaky ReLU</SelectItem>
                              <SelectItem value="elu">ELU</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {config.hidden_layers.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Layers className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No hidden layers added yet</p>
                      <p className="text-sm">Use the Layer Library to add layers</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Output Layer */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">OUT</span>
                  </div>
                  Output Layer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Units</label>
                  <Input
                    type="number"
                    value={config.output_layer.units}
                    onChange={(e) => updateConfig({
                      output_layer: { ...config.output_layer, units: parseInt(e.target.value) || 0 }
                    })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Activation</label>
                  <Select
                    value={config.output_layer.activation}
                    onValueChange={(value) => updateConfig({
                      output_layer: { ...config.output_layer, activation: value as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="softmax">Softmax (Classification)</SelectItem>
                      <SelectItem value="sigmoid">Sigmoid (Binary)</SelectItem>
                      <SelectItem value="linear">Linear (Regression)</SelectItem>
                      <SelectItem value="tanh">Tanh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Training Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Optimizer</label>
                  <Select
                    value={config.optimizer || 'adam'}
                    onValueChange={(value) => updateConfig({
                      optimizer: value as any
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adam">Adam</SelectItem>
                      <SelectItem value="sgd">SGD</SelectItem>
                      <SelectItem value="rmsprop">RMSprop</SelectItem>
                      <SelectItem value="adagrad">Adagrad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Learning Rate</label>
                  <Input
                    type="number"
                    step="0.0001"
                    value={config.learning_rate || 0.001}
                    onChange={(e) => updateConfig({
                      learning_rate: parseFloat(e.target.value) || 0.001
                    })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Epochs</label>
                  <Input
                    type="number"
                    value={config.epochs || 100}
                    onChange={(e) => updateConfig({
                      epochs: parseInt(e.target.value) || 100
                    })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Batch Size</label>
                  <Input
                    type="number"
                    value={config.batchSize || 32}
                    onChange={(e) => updateConfig({
                      batchSize: parseInt(e.target.value) || 32
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layer Library Tab */}
        <TabsContent value="library" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(LAYER_CATEGORIES).map(([category, { name, layers }]) => (
              <Card key={category} className="h-fit">
                <CardHeader className="pb-3">
                  <button
                    onClick={() => toggleCategory(category as LayerCategory)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <CardTitle className="text-base">{name}</CardTitle>
                    {expandedCategories[category as LayerCategory] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </CardHeader>
                
                {expandedCategories[category as LayerCategory] && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {layers.map((layerType) => (
                        <Button
                          key={layerType}
                          variant="outline"
                          size="sm"
                          onClick={() => addLayer(layerType)}
                          className="w-full justify-start capitalize"
                        >
                          <Plus className="w-3 h-3 mr-2" />
                          {layerType.replace('_', ' ')}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>


      </Tabs>
    </div>
  );
}
