CREATE TABLE IF NOT EXISTS answered_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    answered_date TEXT DEFAULT CURRENT_TIMESTAMP,
    jlpt_level TEXT NOT NULL,
    chosen_alternative INTEGER NOT NULL,
    question_id INTEGER NOT NULL
    );