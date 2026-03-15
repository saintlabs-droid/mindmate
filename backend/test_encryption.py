import os
import django
import sqlite3

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.users.models import User
from apps.mood_tracking.models import MoodEntry

def run_test():
    # Setup user
    user, created = User.objects.get_or_create(
        email="test_encrypt@example.com",
        username="test_encrypt"
    )

    # Create note
    note_text = "This is a super secret encrypted note."
    entry = MoodEntry.objects.create(
        user=user,
        mood_level=3,
        stress_category="Academics",
        note=note_text
    )
    
    # In SQLite, UUIDs are stored as 32 character hex strings (without hyphens) in modern Django
    entry_id = str(entry.id).replace('-', '')

    print("--- ORM Decrypted Note ---")
    retrieved_entry = MoodEntry.objects.get(id=entry.id)
    print(retrieved_entry.note)
    
    print("\n--- Raw SQLite Note ---")
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()
    cur.execute("SELECT id, note FROM mood_tracking_moodentry WHERE id=?", (entry_id,))
    row = cur.fetchone()
    if row:
        raw_note = row[1]
        print(raw_note)
        if isinstance(raw_note, bytes) and b"gAAAAA" in raw_note:  # Fernet tokens start with gAAAAA
            print("\nSUCCESS: Note is encrypted in SQLite.")
        elif getattr(raw_note, 'startswith', lambda x: False)('gAAAAA'):
            print("\nSUCCESS: Note is encrypted in SQLite (string format).")
        else:
            print("\nWARNING: Note does not appear to be encrypted with Fernet.")
    else:
        print("\nCould not find raw row, UUID mapping issue in raw query maybe.")

if __name__ == '__main__':
    run_test()
