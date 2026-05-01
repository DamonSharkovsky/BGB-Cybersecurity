from backend.db import db

class TrendingThreat(db.Model):
    __tablename__ = 'trending_threats'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    report_count = db.Column(db.Integer, default=0, nullable=False)

    def __repr__(self):
        return f'<TrendingThreat {self.name}>'
