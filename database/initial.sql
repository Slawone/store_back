/**********************************************
  ...
**********************************************/

CREATE TABLE "Colors" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "hex_code" VARCHAR(7) NOT NULL CHECK (hex_code ~ '^#[0-9A-Fa-f]{6}$'),
  "created_at" TIMESTAMP DEFAULT NOW()
);

/**********************************************/

CREATE TABLE "Colors" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "hex_code" VARCHAR(7) NOT NULL CHECK (hex_code ~ '^#[0-9A-Fa-f]{6}$'),
  "created_at" TIMESTAMP DEFAULT NOW()
);

/**********************************************/
