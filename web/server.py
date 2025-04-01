from flask import Flask, Response, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine, text, bindparam

connection_string = "mysql+pymysql://admin:123@192.168.50.114:3306/article"
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

@app.route("/api/article/all", methods=["POST"])
def add_article():
    if request.method == "POST":
        form = request.form
        with engine.connect() as connection:
            query = text("INSERT INTO article (Heading, description, picture, dfc) VALUES (:Heading, :description, :picture, :dfc) RETURNING *")
            query = query.bindparams(bindparam("Heading", form.get("Heading")))
            query = query.bindparams(bindparam("description", form.get("description")))
            query = query.bindparams(bindparam("picture", form.get("picture")))
            query = query.bindparams(bindparam("dfc", form.get("dfc")))
            result = connection.execute(query)
            connection.commit()
            return jsonify(result.fetchone()._asdict())
        return jsonify({"message": "Error"})

def main():
    app.run("localhost", 8000, True)
if __name__ == "__main__":
    main()