import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.multioutput import MultiOutputRegressor
from sklearn.metrics import mean_squared_error

# Load the synthetic dataset
data = pd.read_csv('synthetic_nutrient_dataset.csv')  # Replace with actual file path if necessary

# Features and target columns
features = [
    'age', 'weight', 'height', 'sex', 'condition_severity', 'exercise_type',
    'activity_duration', 'bmr', 'diet_type', 'caloric_intake_goal',
    'pregnancy_or_elderly', 'body_fat_percentage'
]
targets = ['carb_intake', 'protein_intake', 'fat_intake']

# Prepare the data
X = data[features]
y = data[targets]

# Encode categorical variables
categorical_features = ['sex', 'exercise_type', 'diet_type']
numeric_features = [
    'age', 'weight', 'height', 'condition_severity', 'activity_duration',
    'bmr', 'caloric_intake_goal', 'pregnancy_or_elderly', 'body_fat_percentage'
]

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(), categorical_features)
    ])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define different regression models
models = {
    "Linear Regression": MultiOutputRegressor(LinearRegression()),
    "Random Forest": MultiOutputRegressor(RandomForestRegressor(n_estimators=100, random_state=42)),
    "Gradient Boosting": MultiOutputRegressor(GradientBoostingRegressor(n_estimators=100, random_state=42)),
    "Support Vector Regressor": MultiOutputRegressor(SVR(kernel='rbf'))
}

# Evaluate each model and store the results
results = {}

for model_name, model in models.items():
    # Create a pipeline
    pipeline = Pipeline(steps=[('preprocessor', preprocessor), ('regressor', model)])
    
    # Train the model
    pipeline.fit(X_train, y_train)
    
    # Make predictions
    y_pred = pipeline.predict(X_test)
    
    # Evaluate the model
    mse = mean_squared_error(y_test, y_pred, multioutput='raw_values')
    results[model_name] = mse
    print(f"{model_name} - Mean Squared Error for each target: {mse}")

# Display the results
for model_name, mse in results.items():
    print(f"{model_name} MSE (Carb, Protein, Fat): {mse}")

from sklearn.model_selection import GridSearchCV, RandomizedSearchCV

# Optimized Random Forest
rf_params = {
    'regressor__estimator__n_estimators': [100, 200, 300],
    'regressor__estimator__max_depth': [10, 20, None],
    'regressor__estimator__min_samples_split': [2, 5, 10]
}

# Optimized Gradient Boosting
gb_params = {
    'regressor__estimator__n_estimators': [100, 200],
    'regressor__estimator__learning_rate': [0.01, 0.1, 0.2],
    'regressor__estimator__max_depth': [3, 5, 7]
}

# Optimized Support Vector Regressor
svr_params = {
    'regressor__estimator__C': [0.1, 1, 10],
    'regressor__estimator__epsilon': [0.1, 0.2, 0.3],
    'regressor__estimator__kernel': ['rbf', 'poly']
}

# Function to perform hyperparameter tuning
def tune_model(model, params, X_train, y_train):
    pipeline = Pipeline(steps=[('preprocessor', preprocessor), ('regressor', model)])
    grid_search = GridSearchCV(pipeline, param_grid=params, cv=3, scoring='neg_mean_squared_error', n_jobs=-1)
    grid_search.fit(X_train, y_train)
    return grid_search.best_estimator_, grid_search.best_params_

# Prepare data for tuning
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Tune Random Forest
rf_model = MultiOutputRegressor(RandomForestRegressor(random_state=42))
rf_best_model, rf_best_params = tune_model(rf_model, rf_params, X_train, y_train)

print(f"Best Random Forest Params: {rf_best_params}")

# Tune Gradient Boosting
gb_model = MultiOutputRegressor(GradientBoostingRegressor(random_state=42))
gb_best_model, gb_best_params = tune_model(gb_model, gb_params, X_train, y_train)

print(f"Best Gradient Boosting Params: {gb_best_params}")

# Randomized Search for SVR
svr_model = MultiOutputRegressor(SVR())
pipeline = Pipeline(steps=[('preprocessor', preprocessor), ('regressor', svr_model)])
svr_search = RandomizedSearchCV(pipeline, param_distributions=svr_params, n_iter=10, cv=3, scoring='neg_mean_squared_error', n_jobs=-1)
svr_search.fit(X_train, y_train)
svr_best_model = svr_search.best_estimator_
svr_best_params = svr_search.best_params_

print(f"Best SVR Params: {svr_best_params}")

