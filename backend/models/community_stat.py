from backend.db import db

class CommunityStat(db.Model):
    __tablename__ = 'community_stats'

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(100), nullable=False)
    value = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<CommunityStat {self.label}>'
