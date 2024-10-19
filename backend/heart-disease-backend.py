import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, classification_report
import joblib
import matplotlib.pyplot as plt
import seaborn as sns

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
    # predict heart disease based on patient data
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

# Function to display confusion matrix
def display_confusion_matrix(y_true, y_pred):
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(10,7))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title('Confusion Matrix')
    plt.ylabel('Actual')
    plt.xlabel('Predicted')
    plt.show()


X_test_scaled = scaler.transform(X_test)
y_pred = model.predict(X_test_scaled)
print("Classification Report:")
print(classification_report(y_test, y_pred))


display_confusion_matrix(y_test, y_pred)

# Sample case demonstration
sample_patient = {
    'age': 55,
    'sex': 1,
    'cp': 1,
    'trestbps': 140,
    'chol': 240,
    'fbs': 0,
    'restecg': 1,
    'thalach': 150,
    'exang': 0,
    'oldpeak': 1.8,
    'slope': 1,
    'ca': 0,
    'thal': 2
}

prediction = predict_heart_disease(sample_patient)
probability = model.predict_proba(scaler.transform(pd.DataFrame([sample_patient])))[0][1]

print("\nSample Case Demonstration:")
print(f"Patient Data: {sample_patient}")
print(f"Prediction: {'High risk of heart disease' if prediction == 1 else 'Low risk of heart disease'}")
print(f"Probability: {probability:.2%}")
print(f"Logistic Regression Output: {probability:.4f}")

if __name__ == "__main__":
    pass