from backend.db import db

class SafetyTip(db.Model):
    __tablename__ = 'safety_tips'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<SafetyTip {self.title}>'
