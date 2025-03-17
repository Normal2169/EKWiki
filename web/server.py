from flask import Flask, Response, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, text

connection_string = "mysql+pymysql://admin:123@192.168.0.105:3306/article"
engine = create_engine(connection_string, echo=True)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
@app.route("/")
def index():
    return "Hello world"
@app.route("/api/article/all")
def get_article():
    with engine.connect() as connection:
        raw_article = connection.execute(text("SELECT * FROM article"))
        article = []
        for i in raw_article.all():
            article.append(i._asdict())
        return jsonify(article)
    return Response(jsonify({"status": "500", "message": "Database is down!"}), status=500)
def main():
    app.run("localhost", 8000, True)
if __name__ == "__main__":
    main()