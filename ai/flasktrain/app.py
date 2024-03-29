from flask import Flask, request


import os
os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"]= "9"


app = Flask(__name__)

@app.route('/train_start_all', methods=['POST'])
def train_start_all():
    #지금은 제데로 된 값을 못받고 있다.
    data = request.json

    
    return 'Success'

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)