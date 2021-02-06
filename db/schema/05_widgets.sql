-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS widgets CASCADE;
CREATE TABLE todo (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(255) NOT NULL,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE
);


