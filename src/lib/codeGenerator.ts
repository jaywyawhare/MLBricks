import type { MLBlockType } from '@/types/block'

// Simplified interface for code generation - only needs the essential fields
interface CodeGenBlock {
  id: string
  type: MLBlockType
  config: Record<string, any>
}

export function generatePythonCode(blocks: CodeGenBlock[]): string {
  let code = `# Generated MLBricks Pipeline
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler, LabelEncoder
from sklearn.feature_selection import SelectKBest, RFE, SelectFromModel, VarianceThreshold
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.svm import SVC, SVR
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score, classification_report
import xgboost as xgb
import lightgbm as lgb
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import Dense, Conv2D, LSTM, GRU, Dropout, Flatten
from tensorflow.keras.models import Sequential
import joblib
import json

`

  // Generate code for each block
  blocks.forEach((block, index) => {
    code += generateBlockCode(block, index)
    code += '\n'
  })

  return code
}

function generateBlockCode(block: CodeGenBlock, index: number): string {
  const blockVar = `block_${index}`
  
  switch (block.type) {
    // ============ DATA INPUT BLOCKS ============
    case 'csv_input':
      const separator = block.config.separator || ','
      const header = block.config.header !== false ? 0 : 'None'
      return `# CSV Input Block
${blockVar}_data = pd.read_csv('${block.config.file_path || 'data.csv'}', 
                              sep='${separator}', 
                              header=${header})
print(f"Loaded CSV data shape: {${blockVar}_data.shape}")
`

    case 'json_input':
      const orient = block.config.orient || 'records'
      return `# JSON Input Block
${blockVar}_data = pd.read_json('${block.config.file_path || 'data.json'}', 
                               orient='${orient}')
print(f"Loaded JSON data shape: {${blockVar}_data.shape}")
`

    case 'database_input':
      return `# Database Input Block
import sqlalchemy as sa
${blockVar}_engine = sa.create_engine('${block.config.connection_string}')
${blockVar}_data = pd.read_sql_query('''${block.config.query || 'SELECT * FROM table_name'}''', 
                                    ${blockVar}_engine)
print(f"Loaded database data shape: {${blockVar}_data.shape}")
`

    // ============ DATA PREPROCESSING BLOCKS ============
    case 'data_cleaning':
      const handleMissing = block.config.handle_missing || 'mean'
      const removeDuplicates = block.config.remove_duplicates !== false
      return `# Data Cleaning Block
${blockVar}_cleaned = ${blockVar}_data.copy()

# Handle missing values
${getMissingValueCode(blockVar, handleMissing)}

${removeDuplicates ? `# Remove duplicates
${blockVar}_cleaned = ${blockVar}_cleaned.drop_duplicates()
` : ''}
print(f"Cleaned data shape: {${blockVar}_cleaned.shape}")
`

    case 'feature_scaling':
      const method = block.config.method || 'StandardScaler'
      return `# Feature Scaling Block
${blockVar}_scaler = ${method}()
${blockVar}_scaled = pd.DataFrame(
    ${blockVar}_scaler.fit_transform(${blockVar}_data),
    columns=${blockVar}_data.columns
)
print(f"Scaled data shape: {${blockVar}_scaled.shape}")
`

    case 'feature_selection':
      const selectionMethod = block.config.method || 'SelectKBest'
      const k = block.config.k || 10
      return `# Feature Selection Block
${blockVar}_selector = ${selectionMethod}(k=${k})
${blockVar}_selected = pd.DataFrame(
    ${blockVar}_selector.fit_transform(${blockVar}_data.drop('target', axis=1), ${blockVar}_data['target']),
    columns=${blockVar}_data.drop('target', axis=1).columns[${blockVar}_selector.get_support()]
)
print(f"Selected features: {list(${blockVar}_selected.columns)}")
`

    case 'train_test_split':
      const testSize = block.config.test_size || 0.2
      const randomState = block.config.random_state || 42
      const stratify = block.config.stratify ? ', stratify=y' : ''
      return `# Train/Test Split Block
X = ${blockVar}_data.drop('target', axis=1)
y = ${blockVar}_data['target']
${blockVar}_X_train, ${blockVar}_X_test, ${blockVar}_y_train, ${blockVar}_y_test = train_test_split(
    X, y, test_size=${testSize}, random_state=${randomState}${stratify}
)
print(f"Training set shape: {${blockVar}_X_train.shape}")
print(f"Test set shape: {${blockVar}_X_test.shape}")
`

    // ============ SKLEARN MODELS ============
    case 'linear_regression':
      const fitIntercept = block.config.fit_intercept !== false
      return `# Linear Regression Block
${blockVar}_model = LinearRegression(fit_intercept=${fitIntercept})
${blockVar}_model.fit(${blockVar}_X_train, ${blockVar}_y_train)
${blockVar}_predictions = ${blockVar}_model.predict(${blockVar}_X_test)
print(f"R² Score: {r2_score(${blockVar}_y_test, ${blockVar}_predictions):.4f}")
`

    case 'random_forest':
      const nEstimators = block.config.n_estimators || 100
      const maxDepth = block.config.max_depth || 10
      const rfRandomState = block.config.random_state || 42
      return `# Random Forest Block
${blockVar}_model = RandomForestClassifier(
    n_estimators=${nEstimators}, 
    max_depth=${maxDepth}, 
    random_state=${rfRandomState}
)
${blockVar}_model.fit(${blockVar}_X_train, ${blockVar}_y_train)
${blockVar}_predictions = ${blockVar}_model.predict(${blockVar}_X_test)
print(f"Accuracy: {accuracy_score(${blockVar}_y_test, ${blockVar}_predictions):.4f}")
`

    case 'svm':
      const kernel = block.config.kernel || 'rbf'
      const C = block.config.C || 1.0
      return `# SVM Block
${blockVar}_model = SVC(kernel='${kernel}', C=${C})
${blockVar}_model.fit(${blockVar}_X_train, ${blockVar}_y_train)
${blockVar}_predictions = ${blockVar}_model.predict(${blockVar}_X_test)
print(f"Accuracy: {accuracy_score(${blockVar}_y_test, ${blockVar}_predictions):.4f}")
`

    case 'logistic_regression':
      const maxIter = block.config.max_iter || 1000
      const solver = block.config.solver || 'lbfgs'
      return `# Logistic Regression Block
${blockVar}_model = LogisticRegression(max_iter=${maxIter}, solver='${solver}')
${blockVar}_model.fit(${blockVar}_X_train, ${blockVar}_y_train)
${blockVar}_predictions = ${blockVar}_model.predict(${blockVar}_X_test)
print(f"Accuracy: {accuracy_score(${blockVar}_y_test, ${blockVar}_predictions):.4f}")
`

    // ============ XGBOOST MODELS ============
    case 'xgb_classifier':
      const xgbEstimators = block.config.n_estimators || 100
      const xgbLearningRate = block.config.learning_rate || 0.1
      const xgbMaxDepth = block.config.max_depth || 6
      return `# XGBoost Classifier Block
${blockVar}_model = xgb.XGBClassifier(
    n_estimators=${xgbEstimators}, 
    learning_rate=${xgbLearningRate}, 
    max_depth=${xgbMaxDepth}
)
${blockVar}_model.fit(${blockVar}_X_train, ${blockVar}_y_train)
${blockVar}_predictions = ${blockVar}_model.predict(${blockVar}_X_test)
print(f"Accuracy: {accuracy_score(${blockVar}_y_test, ${blockVar}_predictions):.4f}")
`

    case 'xgb_regressor':
      const xgbRegEstimators = block.config.n_estimators || 100
      const xgbRegLearningRate = block.config.learning_rate || 0.1
      return `# XGBoost Regressor Block
${blockVar}_model = xgb.XGBRegressor(
    n_estimators=${xgbRegEstimators}, 
    learning_rate=${xgbRegLearningRate}
)
${blockVar}_model.fit(${blockVar}_X_train, ${blockVar}_y_train)
${blockVar}_predictions = ${blockVar}_model.predict(${blockVar}_X_test)
print(f"R² Score: {r2_score(${blockVar}_y_test, ${blockVar}_predictions):.4f}")
`

    // ============ LIGHTGBM MODELS ============
    case 'lgb_classifier':
      const lgbLeaves = block.config.num_leaves || 31
      const lgbLearningRate = block.config.learning_rate || 0.1
      return `# LightGBM Classifier Block
${blockVar}_model = lgb.LGBMClassifier(
    num_leaves=${lgbLeaves}, 
    learning_rate=${lgbLearningRate}
)
${blockVar}_model.fit(${blockVar}_X_train, ${blockVar}_y_train)
${blockVar}_predictions = ${blockVar}_model.predict(${blockVar}_X_test)
print(f"Accuracy: {accuracy_score(${blockVar}_y_test, ${blockVar}_predictions):.4f}")
`

    case 'lgb_regressor':
      const lgbRegLeaves = block.config.num_leaves || 31
      return `# LightGBM Regressor Block
${blockVar}_model = lgb.LGBMRegressor(num_leaves=${lgbRegLeaves})
${blockVar}_model.fit(${blockVar}_X_train, ${blockVar}_y_train)
${blockVar}_predictions = ${blockVar}_model.predict(${blockVar}_X_test)
print(f"R² Score: {r2_score(${blockVar}_y_test, ${blockVar}_predictions):.4f}")
`

    // ============ NEURAL NETWORK BLOCKS ============
    case 'dense_layer':
      const units = block.config.units || 128
      const activation = block.config.activation || 'relu'
      return `# Dense Layer Block
${blockVar}_layer = Dense(units=${units}, activation='${activation}')
`

    case 'cnn_layer':
      const filters = block.config.filters || 32
      const kernelSize = block.config.kernel_size || 3
      const cnnActivation = block.config.activation || 'relu'
      return `# CNN Layer Block
${blockVar}_layer = Conv2D(filters=${filters}, kernel_size=${kernelSize}, activation='${cnnActivation}')
`

    case 'lstm_layer':
      const lstmUnits = block.config.units || 50
      const returnSequences = block.config.return_sequences ? 'True' : 'False'
      return `# LSTM Layer Block
${blockVar}_layer = LSTM(units=${lstmUnits}, return_sequences=${returnSequences})
`

    // ============ EVALUATION BLOCKS ============
    case 'model_evaluation':
      const metrics = block.config.metrics || ['accuracy']
      return `# Model Evaluation Block
${blockVar}_metrics = {}
${metrics.map((metric: string) => {
        switch (metric) {
          case 'accuracy':
            return `${blockVar}_metrics['accuracy'] = accuracy_score(${blockVar}_y_test, ${blockVar}_predictions)`
          case 'precision':
            return `${blockVar}_metrics['precision'] = precision_score(${blockVar}_y_test, ${blockVar}_predictions, average='weighted')`
          case 'recall':
            return `${blockVar}_metrics['recall'] = recall_score(${blockVar}_y_test, ${blockVar}_predictions, average='weighted')`
          case 'f1':
            return `${blockVar}_metrics['f1'] = f1_score(${blockVar}_y_test, ${blockVar}_predictions, average='weighted')`
          case 'mse':
            return `${blockVar}_metrics['mse'] = mean_squared_error(${blockVar}_y_test, ${blockVar}_predictions)`
          case 'mae':
            return `${blockVar}_metrics['mae'] = mean_absolute_error(${blockVar}_y_test, ${blockVar}_predictions)`
          case 'r2':
            return `${blockVar}_metrics['r2'] = r2_score(${blockVar}_y_test, ${blockVar}_predictions)`
          default:
            return ''
        }
      }).filter(Boolean).join('\n')}
print(f"Evaluation Metrics: {${blockVar}_metrics}")
`

    // ============ VISUALIZATION BLOCKS ============
    case 'scatter_plot':
      const xColumn = block.config.x_column || 'x'
      const yColumn = block.config.y_column || 'y'
      return `# Scatter Plot Block
plt.figure(figsize=(8, 6))
plt.scatter(${blockVar}_data['${xColumn}'], ${blockVar}_data['${yColumn}'])
plt.xlabel('${xColumn}')
plt.ylabel('${yColumn}')
plt.title('Scatter Plot: ${xColumn} vs ${yColumn}')
plt.show()
`

    case 'histogram':
      const column = block.config.column || 'column'
      const bins = block.config.bins || 30
      return `# Histogram Block
plt.figure(figsize=(8, 6))
plt.hist(${blockVar}_data['${column}'], bins=${bins})
plt.xlabel('${column}')
plt.ylabel('Frequency')
plt.title('Histogram: ${column}')
plt.show()
`

    // ============ OUTPUT BLOCKS ============
    case 'save_model':
      const filePath = block.config.file_path || 'model.pkl'
      return `# Save Model Block
joblib.dump(${blockVar}_model, '${filePath}')
print(f"Model saved to: ${filePath}")
`

    case 'export_data':
      const exportPath = block.config.file_path || 'output.csv'
      const format = block.config.format || 'csv'
      return `# Export Data Block
${format === 'csv' ? `${blockVar}_data.to_csv('${exportPath}', index=False)` :
        format === 'json' ? `${blockVar}_data.to_json('${exportPath}', orient='records')` :
        `${blockVar}_data.to_parquet('${exportPath}')`}
print(f"Data exported to: ${exportPath}")
`

    default:
      return `# Unknown block type: ${block.type}
`
  }
}

// Helper function for missing value handling
function getMissingValueCode(blockVar: string, method: string): string {
  switch (method) {
    case 'drop':
      return `${blockVar}_cleaned = ${blockVar}_cleaned.dropna()`
    case 'mean':
      return `${blockVar}_cleaned = ${blockVar}_cleaned.fillna(${blockVar}_cleaned.mean())`
    case 'median':
      return `${blockVar}_cleaned = ${blockVar}_cleaned.fillna(${blockVar}_cleaned.median())`
    case 'mode':
      return `${blockVar}_cleaned = ${blockVar}_cleaned.fillna(${blockVar}_cleaned.mode().iloc[0])`
    case 'forward_fill':
      return `${blockVar}_cleaned = ${blockVar}_cleaned.fillna(method='ffill')`
    case 'backward_fill':
      return `${blockVar}_cleaned = ${blockVar}_cleaned.fillna(method='bfill')`
    default:
      return `${blockVar}_cleaned = ${blockVar}_cleaned.fillna(${blockVar}_cleaned.mean())`
  }
}
