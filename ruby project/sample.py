import serial

ser = serial.Serial('COM5', 19200, timeout=3)

for _ in range(10):
    line = ser.readline()
    print(line)

ser.close()