CREATE TYPE genders AS ENUM ('male', 'female', 'none');

ALTER TABLE hedgehog
ADD COLUMN gender genders;
