from flask import Flask, request, jsonify
from heart_disease_predictor import predict_heart_disease
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    patient_data = request.json
    prediction = predict_heart_disease(patient_data)
    return jsonify({
        'prediction': 'High Risk' if prediction == 1 else 'Low Risk',
        'risk_value': int(prediction)
    })

if __name__ == '__main__':
    app.run(debug=True)