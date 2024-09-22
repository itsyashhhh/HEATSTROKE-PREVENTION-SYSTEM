from flask import Flask, jsonify
from flask_cors import CORS
import serial

app = Flask(__name__)
CORS(app)

def get_temp():
    ser = serial.Serial('COM3', 19200, timeout=3)
    temp = (float(ser.readline()) - 0.4) / 0.0195
    intensity = float(ser.readline())
    ser.close()
    return ["%.2f" % temp, "%.2f" % intensity]

@app.route('/data')
def get_data():
    values = get_temp()
    return jsonify({
        "temp": values[0],
        "intensity": values[1]
    })

if __name__ == '__main__':
    app.run(debug=True)
