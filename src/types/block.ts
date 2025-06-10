import { LucideIcon } from 'lucide-react'

export type MLBlockType = 
  // Data Input
  | 'csv_input'
  | 'json_input'
  | 'database_input'
  | 'api_input'
  
  // Data Preprocessing
  | 'data_cleaning'
  | 'feature_scaling'
  | 'feature_selection'
  | 'train_test_split'
  | 'data_preprocessing'
  | 'feature_engineering'
  
  // Sklearn Models
  | 'linear_regression'
  | 'logistic_regression'
  | 'random_forest'
  | 'svm'
  | 'decision_tree'
  | 'knn'
  | 'naive_bayes'
  | 'clustering'
  | 'classification'
  | 'regression'
  
  // XGBoost Models
  | 'xgb_classifier'
  | 'xgb_regressor'
  
  // LightGBM Models
  | 'lgb_classifier'
  | 'lgb_regressor'
  
  // Neural Networks
  | 'dense_layer'
  | 'cnn_layer'
  | 'rnn_layer'
  | 'lstm_layer'
  | 'gru_layer'
  | 'bidirectional_layer'
  | 'transformer_layer'
  | 'attention_layer'
  | 'embedding_layer'
  | 'dropout_layer'
  | 'batch_norm_layer'
  | 'layer_norm_layer'
  | 'flatten_layer'
  | 'reshape_layer'
  | 'pooling_layer'
  | 'conv_layer'
  | 'neural_network'
  | 'transformer'
  | 'rnn'
  
  // Evaluation
  | 'model_evaluation'
  | 'cross_validation'
  
  // Visualization
  | 'scatter_plot'
  | 'histogram'
  | 'correlation_matrix'
  | 'feature_importance'
  
  // Output
  | 'save_model'
  | 'export_data'

export type BlockCategory = 
  | 'Data'
  | 'Preprocessing' 
  | 'Sklearn'
  | 'XGBoost'
  | 'LightGBM'
  | 'Neural Networks'
  | 'Evaluation'
  | 'Visualization'
  | 'Output'



export type ConfigOptionType = 
  | 'string' 
  | 'number' 
  | 'boolean' 
  | 'select' 
  | 'multiselect' 
  | 'textarea'
  | 'object'
  | 'array'

export interface ConfigOption {
  name: string
  type: ConfigOptionType
  label: string
  options?: string[]
  default?: any
  properties?: Record<string, ConfigOption>
  arrayType?: ConfigOption
  showIf?: string
}

export interface BlockType {
  type: MLBlockType
  icon: LucideIcon
  label: string
  color: string
  category: BlockCategory
  description: string
  inputs: {
    name: string
    dataType: 'tensor' | 'array' | 'dataframe' | 'model' | 'dict' | 'plot'
  }[]
  outputs: {
    name: string
    dataType: 'tensor' | 'array' | 'dataframe' | 'model' | 'dict' | 'plot'
  }[]
  configOptions?: ConfigOption[]
}
