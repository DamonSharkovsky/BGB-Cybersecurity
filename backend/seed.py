from backend.db import db
from backend.backendAPI import app
from backend.models import User, Post, TrendingThreat, SafetyTip, CommunityStat, Area
from datetime import datetime, date
from werkzeug.security import generate_password_hash

def seed_data():
    with app.app_context():
        # Clear existing data (optional, but good for fresh seed)
        db.drop_all()
        db.create_all()

        # Seed User
        user = User(
            name="SafeUser123",
            surname="Community",
            email="user@example.com",
            phone="0123456789",
            password_hash=generate_password_hash("password"),
            dob=date(1990, 1, 1),
            gender="Other"
        )
        db.session.add(user)
        db.session.commit()

        # Seed Areas
        areas = [
            "Cape Town", "Wynberg", "Claremont", "Bellville", "Mitchells Plain",
            "Stellenbosch", "Somerset West", "Paarl", "George", "Knysna",
            "Mossel Bay", "Khayelitsha", "Gugulethu", "Langa", "Fish Hoek",
            "Grassy Park", "Durbanville", "Atlantis", "Strand"
        ]
        for area_name in areas:
            db.session.add(Area(name=area_name))

        # Seed Trending Threats
        threats = [
            TrendingThreat(name="AI Voice Cloning Scams", report_count=24),
            TrendingThreat(name="Deepfake Video Calls", report_count=18),
            TrendingThreat(name="AI-Generated Phishing Emails", report_count=31),
            TrendingThreat(name="Fake AI Customer Service", report_count=12)
        ]
        db.session.add_all(threats)

        # Seed Safety Tip
        tip = SafetyTip(
            title="Voice Verification",
            content="If someone calls claiming to be family in an emergency, hang up and call them back on their known number. Voice cloning technology can now replicate voices with just a few seconds of audio."
        )
        db.session.add(tip)

        # Seed Community Stats
        stats = [
            CommunityStat(label="Total Reports", value="1,247"),
            CommunityStat(label="Active Communities", value="89"),
            CommunityStat(label="Questions Answered", value="456"),
            CommunityStat(label="Scams Prevented", value="312")
        ]
        db.session.add_all(stats)

        # Seed Posts
        posts = [
            Post(
                type="SCAM_ALERT",
                title="AI Voice Clone Scam Targeting Seniors",
                content="My grandmother received a call that sounded exactly like my voice asking for emergency money...",
                location="Strand, Western Cape",
                author_id=user.id,
                upvotes=24
            ),
            Post(
                type="QUESTION",
                title="How can I tell if an email is AI-generated?",
                content="I've been getting emails that seem too well-written to be from scammers, but something feels off...",
                location="Khayelitsha, Western Cape",
                author_id=user.id,
                upvotes=18
            )
        ]
        db.session.add_all(posts)

        db.session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_data()
