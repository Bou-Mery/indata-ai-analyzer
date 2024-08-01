import pandas as pd
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
import subprocess
import re

app = Flask(__name__)
CORS(app)

load_dotenv()

api_key = os.getenv("API")
genai.configure(api_key=api_key)


def read_csv_from_request(file):
    df = pd.read_csv(file)
    return df.to_string(index=False), df

def read_excel_from_request(file):
    df = pd.read_excel(file)
    return df.to_string(index=False), df

def create_interpretation_prompt(csv_data):
    prompt = f"""
    Given the following data:
    {csv_data}

    Interpret the data and provide insights or patterns you observe in French with more details.
    """
    return prompt

##Apres le prb d'affichage!!!!!
def format_interpretation_text(text):
    """
    Formate le texte d'interprétation pour le rendre en HTML avec des balises
    appropriées pour les titres, sous-titres, et paragraphes.
    """
    # Remplace les titres et sous-titres par des balises HTML
    text = re.sub(r'(?m)^## (.+)', r'<h2>\1</h2>', text)  # Titres de niveau 2
    text = re.sub(r'(?m)^# (.+)', r'<h1>\1</h1>', text)  # Titres de niveau 1

    # Remplace les doubles astérisques par des balises HTML pour le texte en gras
    def replace_bold(match):
        if match.group(1):
            return f'<b>{match.group(1)}</b>'
        return ''

    text = re.sub(r'\*\*(.*?)\*\*', replace_bold, text)

    # Remplace les doubles retours à la ligne par des balises <p> pour les paragraphes
    text = re.sub(r'\n\n+', '</p><p>', text)

    # Remplace les retours à la ligne simples par des balises <br> pour les sauts de ligne
    text = re.sub(r'\n', '<br>', text)

    # Encapsule le texte dans des balises <p> pour commencer
    text = f"<p>{text}</p>"

    return text


def interpret_data(data):
    try:
        prompt = create_interpretation_prompt(data)
        model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "text/plain"})
        response = model.generate_content(prompt)
        interpretation_text = response.text.strip()
        formatted_interpretation = format_interpretation_text(interpretation_text)  # Formatage du texte
        return formatted_interpretation
    except Exception as e:
        print(f"Erreur lors du traitement du fichier : {str(e)}")
        return f"Erreur lors du traitement du fichier : {str(e)}"







@app.route("/api/upload", methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "Aucun fichier n'a été téléchargé."}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Aucun fichier n'a été sélectionné."}), 400
    if file:
        try:
            if file.filename.endswith('.csv'):
                data, df = read_csv_from_request(file)
            elif file.filename.endswith('.xls') or file.filename.endswith('.xlsx'):
                data, df = read_excel_from_request(file)
            else:
                return jsonify({"error": "Format de fichier non valide"}), 400

            interpretation = interpret_data(data)
            # Enregistre le dataframe dans un fichier CSV
            df.to_csv('uploaded_data.csv', index=False) 
            
            # Démarre Streamlit si ce n'est pas déjà fait
            # Utilise un fichier de verrouillage pour s'assurer que Streamlit ne démarre pas plusieurs fois
            lock_file = 'streamlit.lock'
            if not os.path.exists(lock_file):
                with open(lock_file, 'w') as f:
                    f.write('Streamlit is running')
                subprocess.Popen(["streamlit", "run", "visualization.py", "--server.port=8501"])
            return jsonify({"file_name":file.filename,"file_content": data, "interpretation": interpretation, "visualization": "/visualize"})
        except Exception as e:
            return jsonify({"error": f"Erreur lors du traitement du fichier : {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
