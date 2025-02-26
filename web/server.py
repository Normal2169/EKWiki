from flask import Flask, Response
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/")
def index():
    return "Hello world"

@app.route("/api/article/all")
def get_article():
    article = [
    {
        "Heading": "Unity",
        "description": "россплатформенная среда разработки компьютерных игр, разработанная американской компанией Unity Technologies. Unity позволяет создавать приложения, работающие на более чем 25 различных платформах.",
        "picture": "data:image/png;base64,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",
        "DCF": "24.02.2025",  
    },
    {
        "Heading": "Unreal Engine",
        "description": "Unreal Engine — игровой движок, разрабатываемый и поддерживаемый компанией Epic Games. Первой игрой на этом движке был шутер от первого лица Unreal, выпущенный в 1998 году.",
        "picture": "https://upload.wikimedia.org/wikipedia/commons/d/da/Unreal_Engine_Logo.svg",
        "DCF": "25.02.2025",  
    },

    {
        "Heading": "Python",
        "description": "Python — это язык программирования, позволяющий работать быстро. И интегрировать системы более эффективно.",
        "picture": "https://www.actuia.com/storage/uploads/2022/01/logopython-696x385.png",
        "DCF": "26.02.2025",  
    }
]
    return Response(json.dumps(article), content_type="application/json") 
# DFC = date of create 
def main():
    app.run("localhost", 8000, True)

if __name__ == "__main__":
    main()