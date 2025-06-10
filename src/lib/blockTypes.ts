import { 
  Database, 
  BarChart3, 
  Brain, 
  Target,
  Zap,
  Filter,
  FileText,
  FileCode,
  Grid,
  Layers,
  Network,
  Eye,
  TrendingUp,
  Activity,
  Split,
  Gauge,
  BarChart,
  Download,
  Upload,
  Clock,
  Repeat
} from 'lucide-react'
import type { BlockType } from '@/types/block'

export const BlockTypes: BlockType[] = [
  // ============ DATA INPUT BLOCKS ============
  {
    type: 'csv_input',
    icon: FileText,
    label: 'CSV Input',
    color: 'bg-slate-500',
    category: 'Data',
    description: 'Load data from CSV files',
    inputs: [],
    outputs: [
      { name: 'data', dataType: 'dataframe' }
    ],
    configOptions: [
      {
        name: 'file_path',
        type: 'string',
        label: 'File Path',
        default: 'data.csv'
      },
      {
        name: 'separator',
        type: 'select',
        label: 'Separator',
        options: [',', ';', '\t', '|'],
        default: ','
      },
      {
        name: 'header',
        type: 'boolean',
        label: 'Has Header',
        default: true
      }
    ]
  },
  {
    type: 'data_preprocessing',
    icon: Filter,
    label: 'Preprocessing',
    color: 'bg-green-500',
    category: 'Preprocessing',
    description: 'Clean and prepare data for training',
    inputs: [
      { name: 'data', dataType: 'dataframe' }
    ],
    outputs: [
      { name: 'processed_data', dataType: 'dataframe' }
    ],
    configOptions: [
      {
        name: 'normalize',
        type: 'boolean',
        label: 'Normalize Data',
        default: true
      },
      {
        name: 'handle_missing',
        type: 'select',
        label: 'Handle Missing Values',
        options: ['Drop', 'Fill Mean', 'Fill Median', 'Fill Mode'],
        default: 'Fill Mean'
      }
    ]
  },
  {
    type: 'classification',
    icon: Target,
    label: 'Classification',
    color: 'bg-purple-500',
    category: 'Sklearn',
    description: 'Classify data into categories',
    inputs: [
      { name: 'training_data', dataType: 'dataframe' }
    ],
    outputs: [
      { name: 'model', dataType: 'array' },
      { name: 'predictions', dataType: 'array' }
    ],
    configOptions: [
      {
        name: 'algorithm',
        type: 'select',
        label: 'Algorithm',
        options: ['Random Forest', 'SVM', 'Logistic Regression', 'KNN'],
        default: 'Random Forest'
      },
      {
        name: 'test_size',
        type: 'number',
        label: 'Test Size',
        default: 0.2
      }
    ]
  },
  {
    type: 'regression',
    icon: BarChart3,
    label: 'Regression',
    color: 'bg-orange-500',
    category: 'Sklearn',
    description: 'Predict continuous values',
    inputs: [
      { name: 'training_data', dataType: 'dataframe' }
    ],
    outputs: [
      { name: 'model', dataType: 'array' },
      { name: 'predictions', dataType: 'array' }
    ],
    configOptions: [
      {
        name: 'algorithm',
        type: 'select',
        label: 'Algorithm',
        options: ['Linear Regression', 'Random Forest', 'SVR', 'XGBoost'],
        default: 'Linear Regression'
      }
    ]
  },
  {
    type: 'neural_network',
    icon: Brain,
    label: 'Neural Network',
    color: 'bg-red-500',
    category: 'Neural Networks',
    description: 'Deep learning neural network with configurable input, hidden, and output layers',
    inputs: [
      { name: 'input_data', dataType: 'tensor' }
    ],
    outputs: [
      { name: 'output', dataType: 'tensor' }
    ],
    configOptions: [
      {
        name: 'input_layer',
        type: 'object',
        label: 'Input Layer',
        properties: {
          shape: {
            name: 'shape',
            type: 'string',
            label: 'Input Shape',
            default: ''
          },
          preprocessing: {
            name: 'preprocessing',
            type: 'select',
            label: 'Input Preprocessing',
            options: ['none', 'normalize', 'standardize'],
            default: 'none'
          },
          batchSize: {
            name: 'batchSize',
            type: 'number',
            label: 'Batch Size',
            default: 32
          }
        }
      },
      {
        name: 'hidden_layers',
        type: 'array',
        label: 'Hidden Layers',
        arrayType: {
          name: 'layer_config', // Added name property
          type: 'object',
          label: 'Layer',
          properties: {
            name: {
              name: 'name',
              type: 'string',
              label: 'Layer Name'
            },
            type: {
              name: 'type',
              type: 'select',
              label: 'Layer Type',
              options: [
                // Basic layers
                'dense', 'dropout', 'flatten', 'reshape',
                
                // Convolutional layers
                'conv1d', 'conv2d', 'conv3d', 'separable_conv2d', 'depthwise_conv2d',
                
                // Pooling layers
                'maxpool1d', 'maxpool2d', 'avgpool1d', 'avgpool2d', 'globalpool2d',
                
                // Recurrent layers
                'lstm', 'gru', 'simple_rnn', 'bidirectional', 'conv_lstm', 'lstm_cell', 'gru_cell',
                
                // Normalization layers
                'batch_norm', 'layer_norm', 'group_norm',
                
                // Attention and Transformer layers
                'attention', 'multi_head_attention', 'self_attention', 'cross_attention', 
                'transformer', 'positional_encoding',
                
                // Activation layers
                'relu', 'leaky_relu', 'elu', 'prelu', 'thresholded_relu', 'softmax',
                
                // Advanced dropout
                'alpha_dropout', 'gaussian_dropout', 'spatial_dropout',
                
                // Regularization and noise
                'activity_regularization', 'gaussian_noise', 'spectral_norm',
                
                // Embedding and special layers
                'embedding', 'time_distributed', 'masked',
                
                // Utility layers
                'upsampling2d', 'zero_padding2d',
                
                // Composite layers
                'residual', 'concatenate', 'add', 'multiply', 'subtract'
              ],
              default: 'dense'
            },
            units: {
              name: 'units',
              type: 'number',
              label: 'Units',
              default: 64,
              showIf: 'type === "dense" || type === "lstm" || type === "gru" || type === "simple_rnn" || type === "lstm_cell" || type === "gru_cell"'
            },
            filters: {
              name: 'filters',
              type: 'number',
              label: 'Filters',
              default: 32,
              showIf: 'type === "conv1d" || type === "conv2d" || type === "conv3d" || type === "separable_conv2d" || type === "depthwise_conv2d" || type === "conv_lstm"'
            },
            kernel_size: {
              name: 'kernel_size',
              type: 'string',
              label: 'Kernel Size (e.g., "3" or "3,3")',
              default: '3',
              showIf: 'type === "conv1d" || type === "conv2d" || type === "conv3d" || type === "separable_conv2d" || type === "depthwise_conv2d" || type === "conv_lstm"'
            },
            pool_size: {
              name: 'pool_size',
              type: 'string',
              label: 'Pool Size (e.g., "2" or "2,2")',
              default: '2',
              showIf: 'type === "maxpool1d" || type === "maxpool2d" || type === "avgpool1d" || type === "avgpool2d"'
            },
            strides: {
              name: 'strides',
              type: 'string',
              label: 'Strides (e.g., "1" or "1,1")',
              default: '1',
              showIf: 'type === "conv1d" || type === "conv2d" || type === "conv3d" || type === "maxpool1d" || type === "maxpool2d" || type === "avgpool1d" || type === "avgpool2d" || type === "separable_conv2d" || type === "depthwise_conv2d" || type === "conv_lstm"'
            },
            padding: {
              name: 'padding',
              type: 'select',
              label: 'Padding',
              options: ['valid', 'same', 'causal'],
              default: 'valid',
              showIf: 'type === "conv1d" || type === "conv2d" || type === "conv3d" || type === "maxpool1d" || type === "maxpool2d" || type === "avgpool1d" || type === "avgpool2d" || type === "separable_conv2d" || type === "depthwise_conv2d" || type === "conv_lstm"'
            },
            rate: {
              name: 'rate',
              type: 'number',
              label: 'Dropout Rate',
              default: 0.2,
              showIf: 'type === "dropout" || type === "alpha_dropout" || type === "gaussian_dropout" || type === "spatial_dropout"'
            },
            return_sequences: {
              name: 'return_sequences',
              type: 'boolean',
              label: 'Return Sequences',
              default: false,
              showIf: 'type === "lstm" || type === "gru" || type === "simple_rnn" || type === "bidirectional" || type === "conv_lstm"'
            },
            // Embedding layer options
            vocab_size: {
              name: 'vocab_size',
              type: 'number',
              label: 'Vocabulary Size',
              default: 10000,
              showIf: 'type === "embedding"'
            },
            output_dim: {
              name: 'output_dim',
              type: 'number',
              label: 'Output Dimension',
              default: 64,
              showIf: 'type === "embedding"'
            },
            input_length: {
              name: 'input_length',
              type: 'number',
              label: 'Input Length',
              default: 100,
              showIf: 'type === "embedding"'
            },
            // Attention layer options
            num_heads: {
              name: 'num_heads',
              type: 'number',
              label: 'Number of Attention Heads',
              default: 8,
              showIf: 'type === "multi_head_attention" || type === "self_attention" || type === "cross_attention" || type === "transformer"'
            },
            key_dim: {
              name: 'key_dim',
              type: 'number',
              label: 'Key Dimension',
              default: 64,
              showIf: 'type === "multi_head_attention" || type === "self_attention" || type === "cross_attention" || type === "attention"'
            },
            value_dim: {
              name: 'value_dim',
              type: 'number',
              label: 'Value Dimension',
              default: 64,
              showIf: 'type === "multi_head_attention" || type === "self_attention" || type === "cross_attention"'
            },
            // Transformer specific options
            d_model: {
              name: 'd_model',
              type: 'number',
              label: 'Model Dimension',
              default: 512,
              showIf: 'type === "transformer"'
            },
            intermediate_size: {
              name: 'intermediate_size',
              type: 'number',
              label: 'Intermediate Size',
              default: 2048,
              showIf: 'type === "transformer"'
            },
            max_sequence_length: {
              name: 'max_sequence_length',
              type: 'number',
              label: 'Max Sequence Length',
              default: 512,
              showIf: 'type === "transformer" || type === "positional_encoding"'
            },
            // Shape manipulation
            target_shape: {
              name: 'target_shape',
              type: 'string',
              label: 'Target Shape (e.g., "28,28,1")',
              default: '',
              showIf: 'type === "reshape"'
            },
            size: {
              name: 'size',
              type: 'string',
              label: 'Upsampling Size (e.g., "2" or "2,2")',
              default: '2',
              showIf: 'type === "upsampling2d"'
            },
            padding_width: {
              name: 'padding_width',
              type: 'string',
              label: 'Padding Width (e.g., "1" or "1,1")',
              default: '1',
              showIf: 'type === "zero_padding2d"'
            },
            // Normalization options
            axis: {
              name: 'axis',
              type: 'number',
              label: 'Axis',
              default: -1,
              showIf: 'type === "concatenate" || type === "batch_norm" || type === "layer_norm" || type === "softmax"'
            },
            epsilon: {
              name: 'epsilon',
              type: 'number',
              label: 'Epsilon',
              default: 0.001,
              showIf: 'type === "batch_norm" || type === "layer_norm" || type === "group_norm"'
            },
            momentum: {
              name: 'momentum',
              type: 'number',
              label: 'Momentum',
              default: 0.99,
              showIf: 'type === "batch_norm"'
            },
            groups: {
              name: 'groups',
              type: 'number',
              label: 'Number of Groups',
              default: 32,
              showIf: 'type === "group_norm"'
            },
            // Bidirectional layer options
            wrapped_layer: {
              name: 'wrapped_layer',
              type: 'select',
              label: 'Wrapped Layer Type',
              options: ['lstm', 'gru', 'simple_rnn'],
              default: 'lstm',
              showIf: 'type === "bidirectional"'
            },
            merge_mode: {
              name: 'merge_mode',
              type: 'select',
              label: 'Merge Mode',
              options: ['concat', 'sum', 'mul', 'ave'],
              default: 'concat',
              showIf: 'type === "bidirectional"'
            },
            // Activation function options
            alpha: {
              name: 'alpha',
              type: 'number',
              label: 'Alpha',
              default: 0.1,
              showIf: 'type === "leaky_relu" || type === "elu"'
            },
            theta: {
              name: 'theta',
              type: 'number',
              label: 'Theta',
              default: 1.0,
              showIf: 'type === "thresholded_relu"'
            },
            max_value: {
              name: 'max_value',
              type: 'number',
              label: 'Max Value',
              default: 6.0,
              showIf: 'type === "relu"'
            },
            negative_slope: {
              name: 'negative_slope',
              type: 'number',
              label: 'Negative Slope',
              default: 0.0,
              showIf: 'type === "relu"'
            },
            threshold: {
              name: 'threshold',
              type: 'number',
              label: 'Threshold',
              default: 0.0,
              showIf: 'type === "relu"'
            },
            // Regularization options
            l1: {
              name: 'l1',
              type: 'number',
              label: 'L1 Regularization',
              default: 0.01,
              showIf: 'type === "activity_regularization"'
            },
            l2: {
              name: 'l2',
              type: 'number',
              label: 'L2 Regularization',
              default: 0.01,
              showIf: 'type === "activity_regularization"'
            },
            stddev: {
              name: 'stddev',
              type: 'number',
              label: 'Standard Deviation',
              default: 0.1,
              showIf: 'type === "gaussian_noise"'
            },
            // Positional encoding options
            encoding_type: {
              name: 'encoding_type',
              type: 'select',
              label: 'Encoding Type',
              options: ['sinusoidal', 'learned'],
              default: 'sinusoidal',
              showIf: 'type === "positional_encoding"'
            },
            embedding_dim: {
              name: 'embedding_dim',
              type: 'number',
              label: 'Embedding Dimension',
              default: 512,
              showIf: 'type === "positional_encoding"'
            },
            // Advanced RNN options
            reset_after: {
              name: 'reset_after',
              type: 'boolean',
              label: 'Reset After',
              default: true,
              showIf: 'type === "gru" || type === "gru_cell"'
            },
            recurrent_dropout: {
              name: 'recurrent_dropout',
              type: 'number',
              label: 'Recurrent Dropout',
              default: 0.0,
              showIf: 'type === "lstm" || type === "gru" || type === "simple_rnn" || type === "conv_lstm" || type === "lstm_cell" || type === "gru_cell"'
            },
            return_state: {
              name: 'return_state',
              type: 'boolean',
              label: 'Return State',
              default: false,
              showIf: 'type === "lstm" || type === "gru" || type === "simple_rnn" || type === "conv_lstm"'
            },
            go_backwards: {
              name: 'go_backwards',
              type: 'boolean',
              label: 'Go Backwards',
              default: false,
              showIf: 'type === "lstm" || type === "gru" || type === "simple_rnn" || type === "conv_lstm"'
            },
            stateful: {
              name: 'stateful',
              type: 'boolean',
              label: 'Stateful',
              default: false,
              showIf: 'type === "lstm" || type === "gru" || type === "simple_rnn" || type === "conv_lstm"'
            },
            // Advanced convolution options
            dilation_rate: {
              name: 'dilation_rate',
              type: 'string',
              label: 'Dilation Rate (e.g., "1" or "1,1")',
              default: '1',
              showIf: 'type === "conv1d" || type === "conv2d" || type === "conv3d" || type === "separable_conv2d" || type === "depthwise_conv2d"'
            },
            depth_multiplier: {
              name: 'depth_multiplier',
              type: 'number',
              label: 'Depth Multiplier',
              default: 1,
              showIf: 'type === "separable_conv2d" || type === "depthwise_conv2d"'
            },
            pointwise_initializer: {
              name: 'pointwise_initializer',
              type: 'select',
              label: 'Pointwise Initializer',
              options: ['glorot_uniform', 'he_normal', 'random_normal', 'zeros', 'ones'],
              default: 'glorot_uniform',
              showIf: 'type === "separable_conv2d"'
            },
            // Time distributed options
            wrapped_layer_type: {
              name: 'wrapped_layer_type',
              type: 'select',
              label: 'Wrapped Layer Type',
              options: ['dense', 'conv2d', 'maxpool2d', 'flatten'],
              default: 'dense',
              showIf: 'type === "time_distributed"'
            },
            // Spectral normalization options
            power_iterations: {
              name: 'power_iterations',
              type: 'number',
              label: 'Power Iterations',
              default: 1,
              showIf: 'type === "spectral_norm"'
            },
            // Masking options
            mask_value: {
              name: 'mask_value',
              type: 'number',
              label: 'Mask Value',
              default: 0.0,
              showIf: 'type === "masked"'
            },
            compute_mask: {
              name: 'compute_mask',
              type: 'boolean',
              label: 'Compute Mask',
              default: true,
              showIf: 'type === "masked"'
            },
            // Residual connection options
            skip_connection: {
              name: 'skip_connection',
              type: 'select',
              label: 'Skip Connection Type',
              options: ['add', 'concatenate'],
              default: 'add',
              showIf: 'type === "residual"'
            },
            project_shortcut: {
              name: 'project_shortcut',
              type: 'boolean',
              label: 'Project Shortcut',
              default: false,
              showIf: 'type === "residual"'
            },
            activation_after_add: {
              name: 'activation_after_add',
              type: 'select',
              label: 'Activation After Add',
              options: ['none', 'relu', 'gelu', 'swish', 'tanh'],
              default: 'none',
              showIf: 'type === "residual"'
            },
            // Global activation function
            activation: {
              name: 'activation',
              type: 'select',
              label: 'Activation',
              options: [
                'none', 'relu', 'leaky_relu', 'elu', 'selu', 'swish', 'gelu', 'mish',
                'sigmoid', 'tanh', 'softmax', 'softplus', 'softsign', 
                'hard_sigmoid', 'exponential', 'linear'
              ],
              default: 'relu'
            }
          }
        }
      },
      {
        name: 'output_layer',
        type: 'object',
        label: 'Output Layer',
        properties: {
          units: {
            name: 'output_units',
            type: 'number',
            label: 'Output Units',
            default: 1
          },
          activation: {
            name: 'output_activation',
            type: 'select',
            label: 'Output Activation',
            options: ['sigmoid', 'softmax', 'linear', 'tanh', 'relu'],
            default: 'linear'
          },
          use_bias: {
            name: 'output_use_bias',
            type: 'boolean',
            label: 'Use Bias',
            default: true
          },
          kernel_initializer: {
            name: 'output_kernel_initializer',
            type: 'select',
            label: 'Kernel Initializer',
            options: ['glorot_uniform', 'he_normal', 'random_normal', 'zeros', 'ones'],
            default: 'glorot_uniform'
          }
        }
      },
      {
        name: 'training_config',
        type: 'object',
        label: 'Training Configuration',
        properties: {
          optimizer: {
            name: 'optimizer',
            type: 'select',
            label: 'Optimizer',
            options: ['adam', 'sgd', 'rmsprop', 'adagrad', 'adadelta', 'adamax', 'nadam', 'ftrl'],
            default: 'adam'
          },
          learning_rate: {
            name: 'learning_rate',
            type: 'number',
            label: 'Learning Rate',
            default: 0.001
          },
          loss_function: {
            name: 'loss_function',
            type: 'select',
            label: 'Loss Function',
            options: [
              'mse', 'mae', 'mape', 'msle', 'huber',
              'binary_crossentropy', 'categorical_crossentropy', 'sparse_categorical_crossentropy',
              'poisson', 'kl_divergence', 'cosine_similarity'
            ],
            default: 'mse'
          },
          metrics: {
            name: 'metrics',
            type: 'multiselect',
            label: 'Metrics',
            options: [
              'accuracy', 'mae', 'mse', 'rmse', 'mape', 'precision', 'recall', 
              'f1_score', 'auc', 'top_k_categorical_accuracy'
            ],
            default: ['mae']
          },
          epochs: {
            name: 'epochs',
            type: 'number',
            label: 'Epochs',
            default: 100
          },
          batch_size: {
            name: 'batch_size',
            type: 'number',
            label: 'Batch Size',
            default: 32
          },
          validation_split: {
            name: 'validation_split',
            type: 'number',
            label: 'Validation Split',
            default: 0.2
          },
          shuffle: {
            name: 'shuffle',
            type: 'boolean',
            label: 'Shuffle',
            default: true
          }
        }
      },
      {
        name: 'advanced_config',
        type: 'object',
        label: 'Advanced Configuration',
        properties: {
          callbacks: {
            name: 'callbacks',
            type: 'multiselect',
            label: 'Callbacks',
            options: [
              'EarlyStopping', 'ModelCheckpoint', 'ReduceLROnPlateau', 
              'CSVLogger', 'TensorBoard', 'LearningRateScheduler'
            ],
            default: []
          },
          run_eagerly: {
            name: 'run_eagerly',
            type: 'boolean',
            label: 'Run Eagerly',
            default: false
          },
          jit_compile: {
            name: 'jit_compile',
            type: 'boolean',
            label: 'JIT Compile',
            default: false
          },
          use_multiprocessing: {
            name: 'use_multiprocessing',
            type: 'boolean',
            label: 'Use Multiprocessing',
            default: false
          },
          workers: {
            name: 'workers',
            type: 'number',
            label: 'Workers',
            default: 1
          }
        }
      }
    ]
  },
  {
    type: 'model_evaluation',
    icon: Zap,
    label: 'Model Evaluation',
    color: 'bg-indigo-500',
    category: 'Evaluation',
    description: 'Evaluate model performance',
    inputs: [
      { name: 'model', dataType: 'array' },
      { name: 'test_data', dataType: 'dataframe' }
    ],
    outputs: [
      { name: 'metrics', dataType: 'array' }
    ],
    configOptions: [
      {
        name: 'metrics',
        type: 'select',
        label: 'Evaluation Metrics',
        options: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'ROC-AUC'],
        default: 'Accuracy'
      }
    ]
  },
  {
    type: 'json_input',
    icon: FileCode,
    label: 'JSON Input',
    color: 'bg-slate-500',
    category: 'Data',
    description: 'Load data from JSON files',
    inputs: [],
    outputs: [
      { name: 'data', dataType: 'dataframe' }
    ],
    configOptions: [
      {
        name: 'file_path',
        type: 'string',
        label: 'File Path',
        default: 'data.json'
      },
      {
        name: 'orient',
        type: 'select',
        label: 'Orientation',
        options: ['records', 'index', 'values', 'columns'],
        default: 'records'
      }
    ]
  },
  {
    type: 'database_input',
    icon: Database,
    label: 'Database Input',
    color: 'bg-slate-500',
    category: 'Data',
    description: 'Load data from databases',
    inputs: [],
    outputs: [
      { name: 'data', dataType: 'dataframe' }
    ],
    configOptions: [
      {
        name: 'connection_string',
        type: 'string',
        label: 'Connection String',
        default: ''
      },
      {
        name: 'query',
        type: 'textarea',
        label: 'SQL Query',
        default: 'SELECT * FROM table_name'
      }
    ]
  },

  // ============ DATA PREPROCESSING BLOCKS ============
  {
    type: 'data_cleaning',
    icon: Filter,
    label: 'Data Cleaning',
    color: 'bg-green-500',
    category: 'Preprocessing',
    description: 'Clean and prepare data',
    inputs: [
      { name: 'data', dataType: 'dataframe' }
    ],
    outputs: [
      { name: 'cleaned_data', dataType: 'dataframe' }
    ],
    configOptions: [
      {
        name: 'handle_missing',
        type: 'select',
        label: 'Handle Missing Values',
        options: ['drop', 'mean', 'median', 'mode', 'forward_fill', 'backward_fill'],
        default: 'mean'
      },
      {
        name: 'remove_duplicates',
        type: 'boolean',
        label: 'Remove Duplicates',
        default: true
      }
    ]
  },
  {
    type: 'feature_scaling',
    icon: Gauge,
    label: 'Feature Scaling',
    color: 'bg-green-500',
    category: 'Preprocessing',
    description: 'Scale and normalize features',
    inputs: [
      { name: 'data', dataType: 'dataframe' }
    ],
    outputs: [
      { name: 'scaled_data', dataType: 'dataframe' }
    ],
    configOptions: [
      {
        name: 'method',
        type: 'select',
        label: 'Scaling Method',
        options: ['StandardScaler', 'MinMaxScaler', 'RobustScaler', 'Normalizer'],
        default: 'StandardScaler'
      }
    ]
  },
  {
    type: 'feature_selection',
    icon: Grid,
    label: 'Feature Selection',
    color: 'bg-green-500',
    category: 'Preprocessing',
    description: 'Select important features',
    inputs: [
      { name: 'data', dataType: 'dataframe' }
    ],
    outputs: [
      { name: 'selected_features', dataType: 'dataframe' }
    ],
    configOptions: [
      {
        name: 'method',
        type: 'select',
        label: 'Selection Method',
        options: ['SelectKBest', 'RFE', 'SelectFromModel', 'VarianceThreshold'],
        default: 'SelectKBest'
      },
      {
        name: 'k',
        type: 'number',
        label: 'Number of Features',
        default: 10
      }
    ]
  },
  {
    type: 'train_test_split',
    icon: Split,
    label: 'Train/Test Split',
    color: 'bg-green-500',
    category: 'Preprocessing',
    description: 'Split data into training and testing sets',
    inputs: [
      { name: 'data', dataType: 'dataframe' }
    ],
    outputs: [
      { name: 'X_train', dataType: 'dataframe' },
      { name: 'X_test', dataType: 'dataframe' },
      { name: 'y_train', dataType: 'array' },
      { name: 'y_test', dataType: 'array' }
    ],
    configOptions: [
      {
        name: 'test_size',
        type: 'number',
        label: 'Test Size',
        default: 0.2
      },
      {
        name: 'random_state',
        type: 'number',
        label: 'Random State',
        default: 42
      },
      {
        name: 'stratify',
        type: 'boolean',
        label: 'Stratify',
        default: false
      }
    ]
  },

  // ============ SKLEARN MODELS ============
  {
    type: 'linear_regression',
    icon: TrendingUp,
    label: 'Linear Regression',
    color: 'bg-purple-500',
    category: 'Sklearn',
    description: 'Sklearn Linear Regression model',
    inputs: [
      { name: 'X_train', dataType: 'dataframe' },
      { name: 'y_train', dataType: 'array' }
    ],
    outputs: [
      { name: 'model', dataType: 'model' },
      { name: 'predictions', dataType: 'array' }
    ],
    configOptions: [
      {
        name: 'fit_intercept',
        type: 'boolean',
        label: 'Fit Intercept',
        default: true
      }
    ]
  },
  {
    type: 'random_forest',
    icon: Target,
    label: 'Random Forest',
    color: 'bg-purple-500',
    category: 'Sklearn',
    description: 'Sklearn Random Forest model',
    inputs: [
      { name: 'X_train', dataType: 'dataframe' },
      { name: 'y_train', dataType: 'array' }
    ],
    outputs: [
      { name: 'model', dataType: 'model' },
      { name: 'predictions', dataType: 'array' }
    ],
    configOptions: [
      {
        name: 'n_estimators',
        type: 'number',
        label: 'Number of Trees',
        default: 100
      },
      {
        name: 'max_depth',
        type: 'number',
        label: 'Max Depth',
        default: 10
      },
      {
        name: 'random_state',
        type: 'number',
        label: 'Random State',
        default: 42
      }
    ]
  },
  {
    type: 'svm',
    icon: Network,
    label: 'Support Vector Machine',
    color: 'bg-purple-500',
    category: 'Sklearn',
    description: 'Sklearn SVM model',
    inputs: [
      { name: 'X_train', dataType: 'dataframe' },
      { name: 'y_train', dataType: 'array' }
    ],
    outputs: [
      { name: 'model', dataType: 'model' },
      { name: 'predictions', dataType: 'array' }
    ],
    configOptions: [
      {
        name: 'kernel',
        type: 'select',
        label: 'Kernel',
        options: ['linear', 'poly', 'rbf', 'sigmoid'],
        default: 'rbf'
      },
      {
        name: 'C',
        type: 'number',
        label: 'C Parameter',
        default: 1.0
      }
    ]
  },
  {
    type: 'logistic_regression',
    icon: Target,
    label: 'Logistic Regression',
    color: 'bg-purple-500',
    category: 'Sklearn',
    description: 'Sklearn Logistic Regression model',
    inputs: [
      { name: 'X_train', dataType: 'dataframe' },
      { name: 'y_train', dataType: 'array' }
    ],
    outputs: [
      { name: 'model', dataType: 'model' },
      { name: 'predictions', dataType: 'array' }
    ],
    configOptions: [
      {
        name: 'max_iter',
        type: 'number',
        label: 'Max Iterations',
        default: 1000
      },
      {
        name: 'solver',
        type: 'select',
        label: 'Solver',
        options: ['liblinear', 'lbfgs', 'newton-cg', 'sag', 'saga'],
        default: 'lbfgs'
      }
    ]
  },

  // ============ XGBOOST MODELS ============
  {
    type: 'xgb_classifier',
    icon: Zap,
    label: 'XGBoost Classifier',
    color: 'bg-orange-500',
    category: 'XGBoost',
    description: 'XGBoost Classification model',
    inputs: [
      { name: 'X_train', dataType: 'dataframe' },
      { name: 'y_train', dataType: 'array' }
    ],
    outputs: [
      { name: 'model', dataType: 'model' },
      { name: 'predictions', dataType: 'array' }
    ],
    configOptions: [
      {
        name: 'n_estimators',
        type: 'number',
        label: 'Number of Estimators',
        default: 100
      },
      {
        name: 'learning_rate',
        type: 'number',
        label: 'Learning Rate',
        default: 0.1
      },
      {
        name: 'max_depth',
        type: 'number',
        label: 'Max Depth',
        default: 6
      }
    ]
  },
  {
    type: 'xgb_regressor',
    icon: BarChart3,
    label: 'XGBoost Regressor',
    color: 'bg-orange-500',
    category: 'XGBoost',
    description: 'XGBoost Regression model',
    inputs: [
      { name: 'X_train', dataType: 'dataframe' },
      { name: 'y_train', dataType: 'array' }
    ],
    outputs: [
      { name: 'model', dataType: 'model' },
      { name: 'predictions', dataType: 'array' }
    ],
    configOptions: [
      {
        name: 'n_estimators',
        type: 'number',
        label: 'Number of Estimators',
        default: 100
      },
      {
        name: 'learning_rate',
        type: 'number',
        label: 'Learning Rate',
        default: 0.1
      }
    ]
  },

  // ============ LIGHTGBM MODELS ============
  {
    type: 'lgb_classifier',
    icon: Activity,
    label: 'LightGBM Classifier',
    color: 'bg-emerald-500',
    category: 'LightGBM',
    description: 'LightGBM Classification model',
    inputs: [
      { name: 'X_train', dataType: 'dataframe' },
      { name: 'y_train', dataType: 'array' }
    ],
    outputs: [
      { name: 'model', dataType: 'model' },
      { name: 'predictions', dataType: 'array' }
    ],
    configOptions: [
      {
        name: 'num_leaves',
        type: 'number',
        label: 'Number of Leaves',
        default: 31
      },
      {
        name: 'learning_rate',
        type: 'number',
        label: 'Learning Rate',
        default: 0.1
      }
    ]
  },
  {
    type: 'lgb_regressor',
    icon: TrendingUp,
    label: 'LightGBM Regressor',
    color: 'bg-teal-500',
    category: 'LightGBM',
    description: 'LightGBM Regression model',
    inputs: [
      { name: 'X_train', dataType: 'dataframe' },
      { name: 'y_train', dataType: 'array' }
    ],
    outputs: [
      { name: 'model', dataType: 'model' },
      { name: 'predictions', dataType: 'array' }
    ],
    configOptions: [
      {
        name: 'num_leaves',
        type: 'number',
        label: 'Number of Leaves',
        default: 31
      }
    ]
  },

  // ============ NEURAL NETWORK BLOCKS ============
  {
    type: 'dense_layer',
    icon: Layers,
    label: 'Dense Layer',
    color: 'bg-red-500',
    category: 'Neural Networks',
    description: 'Fully connected neural network layer',
    inputs: [
      { name: 'input', dataType: 'tensor' }
    ],
    outputs: [
      { name: 'output', dataType: 'tensor' }
    ],
    configOptions: [
      {
        name: 'units',
        type: 'number',
        label: 'Units',
        default: 128
      },
      {
        name: 'activation',
        type: 'select',
        label: 'Activation',
        options: ['relu', 'sigmoid', 'tanh', 'softmax', 'linear'],
        default: 'relu'
      }
    ]
  },
  {
    type: 'cnn_layer',
    icon: Grid,
    label: 'CNN Layer',
    color: 'bg-red-500',
    category: 'Neural Networks',
    description: 'Convolutional Neural Network layer',
    inputs: [
      { name: 'input', dataType: 'tensor' }
    ],
    outputs: [
      { name: 'output', dataType: 'tensor' }
    ],
    configOptions: [
      {
        name: 'filters',
        type: 'number',
        label: 'Filters',
        default: 32
      },
      {
        name: 'kernel_size',
        type: 'number',
        label: 'Kernel Size',
        default: 3
      },
      {
        name: 'activation',
        type: 'select',
        label: 'Activation',
        options: ['relu', 'sigmoid', 'tanh'],
        default: 'relu'
      }
    ]
  },
  {
    type: 'rnn_layer',
    icon: Clock,
    label: 'RNN Layer',
    color: 'bg-red-500',
    category: 'Neural Networks',
    description: 'Recurrent Neural Network layer',
    inputs: [
      { name: 'input', dataType: 'tensor' }
    ],
    outputs: [
      { name: 'output', dataType: 'tensor' }
    ],
    configOptions: [
      {
        name: 'units',
        type: 'number',
        label: 'Units',
        default: 50
      },
      {
        name: 'return_sequences',
        type: 'boolean',
        label: 'Return Sequences',
        default: false
      }
    ]
  },
  {
    type: 'lstm_layer',
    icon: Repeat,
    label: 'LSTM Layer',
    color: 'bg-red-500',
    category: 'Neural Networks',
    description: 'Long Short-Term Memory layer',
    inputs: [
      { name: 'input', dataType: 'tensor' }
    ],
    outputs: [
      { name: 'output', dataType: 'tensor' }
    ],
    configOptions: [
      {
        name: 'units',
        type: 'number',
        label: 'Units',
        default: 50
      },
      {
        name: 'return_sequences',
        type: 'boolean',
        label: 'Return Sequences',
        default: false
      }
    ]
  },
  {
    type: 'transformer_layer',
    icon: Brain,
    label: 'Transformer',
    color: 'bg-red-500',
    category: 'Neural Networks',
    description: 'Transformer layer for attention mechanisms',
    inputs: [
      { name: 'input', dataType: 'tensor' }
    ],
    outputs: [
      { name: 'output', dataType: 'tensor' }
    ],
    configOptions: [
      {
        name: 'd_model',
        type: 'number',
        label: 'Model Dimension',
        default: 512
      },
      {
        name: 'num_heads',
        type: 'number',
        label: 'Number of Heads',
        default: 8
      }
    ]
  },

  // ============ EVALUATION BLOCKS ============
  {
    type: 'model_evaluation',
    icon: Eye,
    label: 'Model Evaluation',
    color: 'bg-indigo-500',
    category: 'Evaluation',
    description: 'Evaluate model performance',
    inputs: [
      { name: 'model', dataType: 'model' },
      { name: 'X_test', dataType: 'dataframe' },
      { name: 'y_test', dataType: 'array' }
    ],
    outputs: [
      { name: 'metrics', dataType: 'dict' }
    ],
    configOptions: [
      {
        name: 'metrics',
        type: 'multiselect',
        label: 'Metrics',
        options: ['accuracy', 'precision', 'recall', 'f1', 'roc_auc', 'mse', 'mae', 'r2'],
        default: ['accuracy']
      }
    ]
  },

  // ============ VISUALIZATION BLOCKS ============
  {
    type: 'scatter_plot',
    icon: BarChart,
    label: 'Scatter Plot',
    color: 'bg-teal-500',
    category: 'Visualization',
    description: 'Create scatter plots',
    inputs: [
      { name: 'data', dataType: 'dataframe' }
    ],
    outputs: [
      { name: 'plot', dataType: 'plot' }
    ],
    configOptions: [
      {
        name: 'x_column',
        type: 'string',
        label: 'X Column',
        default: ''
      },
      {
        name: 'y_column',
        type: 'string',
        label: 'Y Column',
        default: ''
      }
    ]
  },
  {
    type: 'histogram',
    icon: BarChart,
    label: 'Histogram',
    color: 'bg-teal-500',
    category: 'Visualization',
    description: 'Create histograms',
    inputs: [
      { name: 'data', dataType: 'dataframe' }
    ],
    outputs: [
      { name: 'plot', dataType: 'plot' }
    ],
    configOptions: [
      {
        name: 'column',
        type: 'string',
        label: 'Column',
        default: ''
      },
      {
        name: 'bins',
        type: 'number',
        label: 'Number of Bins',
        default: 30
      }
    ]
  },

  // ============ OUTPUT BLOCKS ============
  {
    type: 'save_model',
    icon: Download,
    label: 'Save Model',
    color: 'bg-gray-500',
    category: 'Output',
    description: 'Save trained model to file',
    inputs: [
      { name: 'model', dataType: 'model' }
    ],
    outputs: [],
    configOptions: [
      {
        name: 'file_path',
        type: 'string',
        label: 'File Path',
        default: 'model.pkl'
      }
    ]
  },
  {
    type: 'export_data',
    icon: Upload,
    label: 'Export Data',
    color: 'bg-gray-500',
    category: 'Output',
    description: 'Export data to file',
    inputs: [
      { name: 'data', dataType: 'dataframe' }
    ],
    outputs: [],
    configOptions: [
      {
        name: 'file_path',
        type: 'string',
        label: 'File Path',
        default: 'output.csv'
      },
      {
        name: 'format',
        type: 'select',
        label: 'Format',
        options: ['csv', 'json', 'parquet'],
        default: 'csv'
      }
    ]
  }
]
