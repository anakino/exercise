-- CREATE TYPE genders AS ENUM ('male', 'female', 'none');

ALTER TABLE hedgehog
ADD COLUMN name varchar(100),
ADD COLUMN age int
-- ADD COLUMN gender genders
;
