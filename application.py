from flask import Flask, request, jsonify
from flask import send_from_directory
import uuid
from better_profanity import profanity

def isAbusive(comment):
    profanity.load_censor_words()
    check_abusive=profanity.contains_profanity(comment)
    return check_abusive

app = Flask(__name__)

@app.route('/', methods=['GET'])
def send_index():
    return send_from_directory('./www', "index.html")

@app.route('/<path:path>', methods=['GET'])
def send_root(path):
    return send_from_directory('./www', path)

@app.route('/api/mpg', methods=['POST'])
def calc_mpg():

    content = request.get_json(force=True)
    errors = []

    comment = content['text']
    check_abuse=isAbusive(comment)

    response = {"id":str(uuid.uuid4()),"abusive":check_abuse}
    return jsonify(response)


if __name__ == '__main__':
    app.run(host= '0.0.0.0',debug=True)
    
