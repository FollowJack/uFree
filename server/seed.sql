DROP TABLE IF EXISTS applications cascade;

CREATE TABLE applications(
  id serial primary key,
  public_address VARCHAR(255),
  contract_address VARCHAR(255),
  name VARCHAR(90),
  birthdate timestamp,
  destination VARCHAR(255),
  valid_from timestamp,
  valid_till timestamp,
  created_at timestamp
);
