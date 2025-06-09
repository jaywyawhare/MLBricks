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
    description: 'Deep learning neural network',
    inputs: [
      { name: 'input_data', dataType: 'tensor' }
    ],
    outputs: [
      { name: 'output', dataType: 'tensor' }
    ],
    configOptions: [
      {
        name: 'layers',
        type: 'number',
        label: 'Hidden Layers',
        default: 3
      },
      {
        name: 'neurons',
        type: 'number',
        label: 'Neurons per Layer',
        default: 128
      },
      {
        name: 'activation',
        type: 'select',
        label: 'Activation Function',
        options: ['relu', 'sigmoid', 'tanh', 'softmax'],
        default: 'relu'
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
