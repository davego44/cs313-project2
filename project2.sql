CREATE SCHEMA project2;

--CREATE TABLE project2.role (
--	id SERIAL UNIQUE NOT NULL primary key,
--  title VARCHAR(200) UNIQUE NOT NULL
--);

CREATE TABLE project2.user (
	id SERIAL UNIQUE NOT NULL primary key,
	username VARCHAR(200) UNIQUE NOT NULL,
	password VARCHAR(256) NOT NULL,
	--role_id INT NOT NULL references project2.role(id),
	first_name VARCHAR(200) NOT NULL,
	last_name VARCHAR(200) NOT NULL,
	email VARCHAR(200) UNIQUE NOT NULL,
	pic_name VARCHAR(200) UNIQUE
);

CREATE TABLE project2.blog (
	id SERIAL UNIQUE NOT NULL primary key,
	title VARCHAR(300) UNIQUE NOT NULL,
	author_id INT NOT NULL references project2.user(id),
	--posted DATE NOT NULL,
	content text 
);

CREATE TABLE project2.keyword (
	id SERIAL UNIQUE NOT NULL primary key,
	title VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE project2.blogkeyword (
	blog_id INT NOT NULL references project2.blog(id),
	keyword_id INT NOT NULL references project2.keyword(id)
);

CREATE TABLE project2.tutorial (
	id SERIAL UNIQUE NOT NULL primary key,
	title VARCHAR(200) UNIQUE NOT NULL,
	author_id INT NOT NULL references project2.user(id),
	--posted DATE NOT NULL,
	content text
);

CREATE TABLE project2.tutorialkeyword (
	tutorial_id INT NOT NULL references project2.tutorial(id),
	keyword_id INT NOT NULL references project2.keyword(id)
);

CREATE TABLE project2.blogtutorial (
	blog_id INT NOT NULL references project2.blog(id),
	tutorial_id INT NOT NULL references project2.tutorial(id)
);

CREATE TABLE project2.comment (
	id SERIAL UNIQUE NOT NULL primary key,
	blog_id INT NOT NULL references project2.blog(id),
	author_id INT NOT NULL references project2.user(id),
	content text
);

CREATE TABLE project2.diyupload (
	id SERIAL UNIQUE NOT NULL primary key,
	tutorial_id INT NOT NULL references project2.tutorial(id),
	author_id INT NOT NULL references project2.user(id),
	content text
);

CREATE TABLE project2.product (
	id SERIAL UNIQUE NOT NULL primary key,
	title VARCHAR(200) UNIQUE NOT NULL,
	description text,
	cost NUMERIC NOT NULL,
	count NUMERIC NOT NULL
);

CREATE USER project2user WITH PASSWORD 'password';
GRANT ALL ON SCHEMA project2 TO project2user;

