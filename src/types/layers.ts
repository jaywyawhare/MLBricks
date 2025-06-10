// Simple tensor shape type for basic validation
export type TensorShape = number[];

// Neural Network Layer Types
export interface BaseLayer {
    type: string;
    name?: string;
    trainable?: boolean;
    inputShape?: TensorShape;
    outputShape?: TensorShape;
    // Advanced layer properties
    regularizers?: {
        kernel?: string;
        bias?: string;
        activity?: string;
    };
    constraints?: {
        kernel?: string;
        bias?: string;
    };
    initializers?: {
        kernel?: string;
        bias?: string;
    };
}

export interface InputLayerConfig {
    shape: string;  // comma-separated dimensions, e.g. "28,28,1"
    preprocessing: 'none' | 'normalize' | 'standardize';
    batchSize?: number;
}

export interface OutputLayerConfig {
    units: number;
    activation: string;
    useBias?: boolean;
    kernelInitializer?: string;
    activityRegularizer?: string;
}

export interface DenseLayer extends BaseLayer {
    type: 'dense';
    units: number;
    activation?: string;
    useBias?: boolean;
    kernelInitializer?: string;
    biasInitializer?: string;
    kernelRegularizer?: string;
    biasRegularizer?: string;
    activityRegularizer?: string;
}

export interface Conv2DLayer extends BaseLayer {
    type: 'conv2d';
    filters: number;
    kernelSize: number | [number, number];
    strides?: number | [number, number];
    padding?: 'valid' | 'same';
    activation?: string;
    useBias?: boolean;
    dilationRate?: number | [number, number];
    groups?: number;
    kernelInitializer?: string;
    biasInitializer?: string;
}

export interface MaxPool2DLayer extends BaseLayer {
    type: 'maxpool2d';
    poolSize?: number | [number, number];
    strides?: number | [number, number];
    padding?: 'valid' | 'same';
}

export interface LSTMLayer extends BaseLayer {
    type: 'lstm';
    units: number;
    activation?: string;
    recurrentActivation?: string;
    returnSequences?: boolean;
    returnState?: boolean;
    goBackwards?: boolean;
    stateful?: boolean;
    dropout?: number;
    recurrentDropout?: number;
    kernelInitializer?: string;
    recurrentInitializer?: string;
}

export interface GRULayer extends BaseLayer {
    type: 'gru';
    units: number;
    activation?: string;
    recurrentActivation?: string;
    returnSequences?: boolean;
    returnState?: boolean;
    goBackwards?: boolean;
    stateful?: boolean;
    dropout?: number;
    recurrentDropout?: number;
    kernelInitializer?: string;
    recurrentInitializer?: string;
}

export interface DropoutLayer extends BaseLayer {
    type: 'dropout';
    rate: number;
    noise_shape?: number[];
    seed?: number;
}

export interface BatchNormLayer extends BaseLayer {
    type: 'batch_norm';
    axis?: number;
    momentum?: number;
    epsilon?: number;
    center?: boolean;
    scale?: boolean;
    betaInitializer?: string;
    gammaInitializer?: string;
    movingMeanInitializer?: string;
    movingVarianceInitializer?: string;
}

export interface LayerNormLayer extends BaseLayer {
    type: 'layer_norm';
    axis?: number;
    epsilon?: number;
    center?: boolean;
    scale?: boolean;
    betaInitializer?: string;
    gammaInitializer?: string;
}

export interface FlattenLayer extends BaseLayer {
    type: 'flatten';
    dataFormat?: 'channels_first' | 'channels_last';
}

export interface ReshapeLayer extends BaseLayer {
    type: 'reshape';
    targetShape: number[];
}

export interface EmbeddingLayer extends BaseLayer {
    type: 'embedding';
    inputDim: number;
    outputDim: number;
    maskZero?: boolean;
    inputLength?: number;
    embeddingsInitializer?: string;
    embeddingsRegularizer?: string;
    activityRegularizer?: string;
    embeddingsConstraint?: string;
}

export interface AttentionLayer extends BaseLayer {
    type: 'attention';
    useBias?: boolean;
    score?: 'dot' | 'general' | 'location' | 'concat';
    dropout?: number;
}

export interface MultiHeadAttentionLayer extends BaseLayer {
    type: 'multi_head_attention';
    numHeads: number;
    keyDim: number;
    valueDim?: number;
    dropout?: number;
    useBias?: boolean;
    attentionAxes?: number[];
}

export interface BidirectionalLayer extends BaseLayer {
    type: 'bidirectional';
    layer: LSTMLayer | GRULayer | SimpleRNNLayer;
    mergeMode?: 'concat' | 'sum' | 'mul' | 'ave';
    backwardLayer?: LSTMLayer | GRULayer | SimpleRNNLayer;
}

export interface SimpleRNNLayer extends BaseLayer {
    type: 'simple_rnn';
    units: number;
    activation?: string;
    useBias?: boolean;
    returnSequences?: boolean;
    returnState?: boolean;
    goBackwards?: boolean;
    stateful?: boolean;
    dropout?: number;
    recurrentDropout?: number;
}

export interface Conv1DLayer extends BaseLayer {
    type: 'conv1d';
    filters: number;
    kernelSize: number;
    strides?: number;
    padding?: 'valid' | 'same' | 'causal';
    dataFormat?: 'channels_first' | 'channels_last';
    dilationRate?: number;
    groups?: number;
    activation?: string;
    useBias?: boolean;
}

export interface Conv3DLayer extends BaseLayer {
    type: 'conv3d';
    filters: number;
    kernelSize: number | [number, number, number];
    strides?: number | [number, number, number];
    padding?: 'valid' | 'same';
    dataFormat?: 'channels_first' | 'channels_last';
    dilationRate?: number | [number, number, number];
    groups?: number;
    activation?: string;
    useBias?: boolean;
}

export interface MaxPool1DLayer extends BaseLayer {
    type: 'maxpool1d';
    poolSize?: number;
    strides?: number;
    padding?: 'valid' | 'same';
    dataFormat?: 'channels_first' | 'channels_last';
}

export interface AvgPool1DLayer extends BaseLayer {
    type: 'avgpool1d';
    poolSize?: number;
    strides?: number;
    padding?: 'valid' | 'same';
    dataFormat?: 'channels_first' | 'channels_last';
}

export interface AvgPool2DLayer extends BaseLayer {
    type: 'avgpool2d';
    poolSize?: number | [number, number];
    strides?: number | [number, number];
    padding?: 'valid' | 'same';
    dataFormat?: 'channels_first' | 'channels_last';
}

export interface GlobalPoolingLayer extends BaseLayer {
    type: 'globalpool2d';
    poolingType?: 'max' | 'avg';
    dataFormat?: 'channels_first' | 'channels_last';
    keepdims?: boolean;
}

export interface SeparableConv2DLayer extends BaseLayer {
    type: 'separable_conv2d';
    filters: number;
    kernelSize: number | [number, number];
    strides?: number | [number, number];
    padding?: 'valid' | 'same';
    dataFormat?: 'channels_first' | 'channels_last';
    dilationRate?: number | [number, number];
    depthMultiplier?: number;
    activation?: string;
    useBias?: boolean;
}

export interface DepthwiseConv2DLayer extends BaseLayer {
    type: 'depthwise_conv2d';
    kernelSize: number | [number, number];
    strides?: number | [number, number];
    padding?: 'valid' | 'same';
    depthMultiplier?: number;
    dataFormat?: 'channels_first' | 'channels_last';
    dilationRate?: number | [number, number];
    activation?: string;
    useBias?: boolean;
}

export interface UpSampling2DLayer extends BaseLayer {
    type: 'upsampling2d';
    size: number | [number, number];
    dataFormat?: 'channels_first' | 'channels_last';
    interpolation?: 'nearest' | 'bilinear';
}

export interface ZeroPadding2DLayer extends BaseLayer {
    type: 'zero_padding2d';
    padding: number | [number, number] | [[number, number], [number, number]];
    dataFormat?: 'channels_first' | 'channels_last';
}

export interface AddLayer extends BaseLayer {
    type: 'add';
    inputs: string[];
}

export interface MultiplyLayer extends BaseLayer {
    type: 'multiply';
    inputs: string[];
}

export interface SubtractLayer extends BaseLayer {
    type: 'subtract';
    inputs: string[];
}

export interface TransformerLayer extends BaseLayer {
    type: 'transformer';
    dModel: number;
    numHeads: number;
    dropout?: number;
    attentionDropout?: number;
    maxSequenceLength?: number;
    intermediateSize?: number;
    // Advanced transformer properties
    useCausalMask?: boolean;
    normFirst?: boolean;
    activationFunction?: 'relu' | 'gelu' | 'swish';
    kernelInitializer?: string;
    biasInitializer?: string;
}

export interface ResidualLayer extends BaseLayer {
    type: 'residual';
    layer: HiddenLayerConfig;
    // Advanced residual properties
    skipConnection?: 'add' | 'concatenate';
    projectShortcut?: boolean;
    activationAfterAdd?: string;
}

export interface ConcatenateLayer extends BaseLayer {
    type: 'concatenate';
    axis: number;
    inputs: string[];  // Names of layers to concatenate
}

// Advanced Layer Types
export interface SelfAttentionLayer extends BaseLayer {
    type: 'self_attention';
    numHeads: number;
    keyDim: number;
    valueDim?: number;
    dropout?: number;
    useBias?: boolean;
    returnAttentionScores?: boolean;
}

export interface CrossAttentionLayer extends BaseLayer {
    type: 'cross_attention';
    numHeads: number;
    keyDim: number;
    valueDim?: number;
    dropout?: number;
    useBias?: boolean;
}

export interface PositionalEncodingLayer extends BaseLayer {
    type: 'positional_encoding';
    maxSequenceLength: number;
    embeddingDim: number;
    encodingType?: 'sinusoidal' | 'learned';
}

export interface GroupNormalizationLayer extends BaseLayer {
    type: 'group_norm';
    groups: number;
    axis?: number;
    epsilon?: number;
    center?: boolean;
    scale?: boolean;
}

export interface SpectralNormalizationLayer extends BaseLayer {
    type: 'spectral_norm';
    layer: HiddenLayerConfig;
    powerIterations?: number;
}

export interface AlphaDropoutLayer extends BaseLayer {
    type: 'alpha_dropout';
    rate: number;
    noiseShape?: number[];
    seed?: number;
}

export interface GaussianDropoutLayer extends BaseLayer {
    type: 'gaussian_dropout';
    rate: number;
    seed?: number;
}

export interface SpatialDropoutLayer extends BaseLayer {
    type: 'spatial_dropout';
    rate: number;
    dataFormat?: 'channels_first' | 'channels_last';
}

export interface LSTMCellLayer extends BaseLayer {
    type: 'lstm_cell';
    units: number;
    activation?: string;
    recurrentActivation?: string;
    useBias?: boolean;
    dropout?: number;
    recurrentDropout?: number;
}

export interface GRUCellLayer extends BaseLayer {
    type: 'gru_cell';
    units: number;
    activation?: string;
    recurrentActivation?: string;
    useBias?: boolean;
    dropout?: number;
    recurrentDropout?: number;
    resetAfter?: boolean;
}

export interface ConvLSTMLayer extends BaseLayer {
    type: 'conv_lstm';
    filters: number;
    kernelSize: number | [number, number];
    strides?: number | [number, number];
    padding?: 'valid' | 'same';
    dataFormat?: 'channels_first' | 'channels_last';
    activation?: string;
    recurrentActivation?: string;
    returnSequences?: boolean;
    returnState?: boolean;
    dropout?: number;
    recurrentDropout?: number;
}

export interface TimeDistributedLayer extends BaseLayer {
    type: 'time_distributed';
    layer: HiddenLayerConfig;
}

export interface MaskedLayer extends BaseLayer {
    type: 'masked';
    maskValue?: number;
    computeMask?: boolean;
}

export interface ActivityRegularizationLayer extends BaseLayer {
    type: 'activity_regularization';
    l1?: number;
    l2?: number;
}

export interface GaussianNoiseLayer extends BaseLayer {
    type: 'gaussian_noise';
    stddev: number;
    seed?: number;
}

export interface LeakyReLULayer extends BaseLayer {
    type: 'leaky_relu';
    alpha?: number;
}

export interface ELULayer extends BaseLayer {
    type: 'elu';
    alpha?: number;
}

export interface ReLULayer extends BaseLayer {
    type: 'relu';
    maxValue?: number;
    negativeSlope?: number;
    threshold?: number;
}

export interface SoftmaxLayer extends BaseLayer {
    type: 'softmax';
    axis?: number;
}

export interface PReluLayer extends BaseLayer {
    type: 'prelu';
    alphaInitializer?: string;
    alphaRegularizer?: string;
    alphaConstraint?: string;
    sharedAxes?: number[];
}

export interface ThresholdedReLULayer extends BaseLayer {
    type: 'thresholded_relu';
    theta?: number;
}

// Updated HiddenLayerConfig type with all supported layers
export type HiddenLayerConfig = 
    // Basic layers
    | DenseLayer 
    | DropoutLayer 
    | FlattenLayer
    | ReshapeLayer
    
    // Convolutional layers
    | Conv1DLayer
    | Conv2DLayer 
    | Conv3DLayer
    | SeparableConv2DLayer
    | DepthwiseConv2DLayer
    
    // Pooling layers
    | MaxPool1DLayer
    | MaxPool2DLayer
    | AvgPool1DLayer
    | AvgPool2DLayer
    | GlobalPoolingLayer
    
    // Recurrent layers
    | LSTMLayer 
    | GRULayer 
    | SimpleRNNLayer
    | BidirectionalLayer
    | ConvLSTMLayer
    | LSTMCellLayer
    | GRUCellLayer
    
    // Normalization layers
    | BatchNormLayer
    | LayerNormLayer
    | GroupNormalizationLayer
    
    // Attention and Transformer layers
    | AttentionLayer
    | MultiHeadAttentionLayer
    | SelfAttentionLayer
    | CrossAttentionLayer
    | TransformerLayer
    | PositionalEncodingLayer
    
    // Activation layers
    | LeakyReLULayer
    | ELULayer
    | ReLULayer
    | SoftmaxLayer
    | PReluLayer
    | ThresholdedReLULayer
    
    // Dropout variants
    | AlphaDropoutLayer
    | GaussianDropoutLayer
    | SpatialDropoutLayer
    
    // Regularization and noise
    | ActivityRegularizationLayer
    | GaussianNoiseLayer
    | SpectralNormalizationLayer
    
    // Embedding and special layers
    | EmbeddingLayer
    | TimeDistributedLayer
    | MaskedLayer
    
    // Utility layers
    | UpSampling2DLayer
    | ZeroPadding2DLayer
    
    // Composite layers
    | ResidualLayer
    | ConcatenateLayer
    | AddLayer
    | MultiplyLayer
    | SubtractLayer;

export interface NeuralNetworkConfig {
    input_layer: InputLayerConfig;
    hidden_layers: HiddenLayerConfig[];
    output_layer: OutputLayerConfig;
    
    // Training configuration
    optimizer?: string;
    learning_rate?: number;
    loss_function?: string;
    metrics?: string[];
    
    // Training parameters
    batchSize?: number;
    epochs?: number;
    validationSplit?: number;
    shuffle?: boolean;
    
    // Advanced training options
    callbacks?: string[];
    classWeight?: Record<string, number>;
    sampleWeight?: string;
    initialEpoch?: number;
    stepsPerEpoch?: number;
    validationSteps?: number;
    validationFreq?: number;
    maxQueueSize?: number;
    workers?: number;
    useMultiprocessing?: boolean;
    
    // Model compilation options
    runEagerly?: boolean;
    jitCompile?: boolean;
    
    // Advanced optimizer options
    optimizerConfig?: {
        beta1?: number;
        beta2?: number;
        epsilon?: number;
        amsgrad?: boolean;
        momentum?: number;
        nesterov?: boolean;
        rho?: number;
        centered?: boolean;
    };
}

// Layer type unions
export type LayerType = 
  // Basic layers
  | 'dense' | 'dropout' | 'flatten' | 'reshape'
  
  // Convolutional layers
  | 'conv1d' | 'conv2d' | 'conv3d' | 'separable_conv2d' | 'depthwise_conv2d'
  
  // Pooling layers
  | 'maxpool1d' | 'maxpool2d' | 'avgpool1d' | 'avgpool2d' | 'globalpool2d'
  
  // Recurrent layers
  | 'lstm' | 'gru' | 'simple_rnn' | 'bidirectional' | 'conv_lstm' | 'lstm_cell' | 'gru_cell'
  
  // Normalization layers
  | 'batch_norm' | 'layer_norm' | 'group_norm'
  
  // Attention and Transformer layers
  | 'attention' | 'multi_head_attention' | 'self_attention' | 'cross_attention' 
  | 'transformer' | 'positional_encoding'
  
  // Activation layers
  | 'relu' | 'leaky_relu' | 'elu' | 'prelu' | 'thresholded_relu' | 'softmax'
  
  // Advanced dropout
  | 'alpha_dropout' | 'gaussian_dropout' | 'spatial_dropout'
  
  // Regularization and noise
  | 'activity_regularization' | 'gaussian_noise' | 'spectral_norm'
  
  // Embedding and special layers
  | 'embedding' | 'time_distributed' | 'masked'
  
  // Utility layers
  | 'upsampling2d' | 'zero_padding2d'
  
  // Composite layers
  | 'residual' | 'concatenate' | 'add' | 'multiply' | 'subtract'

export type LayerCategory = 
  | 'basic'
  | 'conv'
  | 'pooling'
  | 'recurrent'
  | 'attention'
  | 'normalization'
  | 'activation'
  | 'advanced'
