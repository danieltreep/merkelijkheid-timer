CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(255)
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(255)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  working BOOLEAN,
  is_admin BOOLEAN,
  email VARCHAR(100)
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_name VARCHAR(255),
  client_id INT,
  color VARCHAR(6),
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  user_id INT,
  category_id INT,
  project_id INT,
  created_at TIMESTAMP,
  stopped_at TIMESTAMP,
  time_elapsed TIME,
  time_in_minutes INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
