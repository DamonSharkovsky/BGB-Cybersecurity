from datetime import datetime
from backend.db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False) # e.g., 'SCAM_ALERT', 'QUESTION', 'WARNING'
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    upvotes = db.Column(db.Integer, default=0, nullable=False)

    # Relationships
    comments = db.relationship('Comment', backref='post', lazy=True)

    @property
    def author_name(self):
        return self.author.name if self.author else "Unknown"

    @property
    def comment_count(self):
        return len(self.comments)

    def __repr__(self):
        return f'<Post {self.title}>'
