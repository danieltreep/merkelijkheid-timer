CREATE TABLE clients (
  client_id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(255),
  color VARCHAR(10),
  is_archived BOOLEAN
);

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  is_clocking BOOLEAN,
  is_admin BOOLEAN,
  email VARCHAR(100),
  photo VARCHAR(255)
);

CREATE TABLE projects (
  project_id INT AUTO_INCREMENT PRIMARY KEY,
  project_name VARCHAR(255),
  client_id INT,
  FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

CREATE TABLE sessions (
  session_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  user_id INT,
  project_id INT,
  created_at TIMESTAMP,
  stopped_at TIMESTAMP,
  time_elapsed VARCHAR(255),
  is_running BOOLEAN,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (project_id) REFERENCES projects(project_id)
);
