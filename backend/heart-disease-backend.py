import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import joblib

# loading data
data = pd.read_csv('heart.csv')
X = data.drop('target', axis=1)
y = data['target']

# split to train and test the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# normalisation
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# using lr to train the model
model = LogisticRegression(random_state=42)
model.fit(X_train_scaled, y_train)

# saving
joblib.dump(model, 'heart_disease_model.joblib')
joblib.dump(scaler, 'scaler.joblib')

def predict_heart_disease(patient_data):
    """
    Predict heart disease risk based on patient data.
    parameters is patient_data: A dictionary containing patient information
    return: 1 for high risk (>= 0.5), 0 for low/not at risk (< 0.5)
    """
    # load model and scaler
    model = joblib.load('heart_disease_model.joblib')
    scaler = joblib.load('scaler.joblib')
    
    # convert dict to dataframe
    input_df = pd.DataFrame([patient_data])
    
    # make sure everything has same columns
    expected_columns = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
    input_df = input_df.reindex(columns=expected_columns, fill_value=0)
    
    # scale data
    input_scaled = scaler.transform(input_df)
    
    # prediction
    probability = model.predict_proba(input_scaled)[0][1]
    
    # Return 1 for high risk, 0 for low risk
    return 1 if probability >= 0.5 else 0
