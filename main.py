from flask import Flask, render_template, json, jsonify, request
import os

cwd = os.getcwd()  # get current working dir: C:\\Users\\%USERPROFILE%\\Desktop
print("My current working directory is: {} ".format(cwd))

app = Flask('app')
@app.route('/')
def index_page():
  return render_template('chats.html')

@app.route('/health')
def health_check():
  return "OK"

@app.route('/chats/lasi')
def ielasit_chatu():
  chata_rindas = []
  with open("chats.txt", "r", encoding="UTF-8") as f:
    for rinda in f:
      chata_rindas.append(rinda)
  return jsonify({"chats":chata_rindas})    
@app.route('/chats/suuti', methods = ['POST'])
def suuti_zinju():
  dati= request.json

  with open("chats.txt", "a", newline="", encoding="UTF-8") as f:
    f.write(dati["chats"] + "\n")

  return ielasit_chatu()  

if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000, debug=True)
