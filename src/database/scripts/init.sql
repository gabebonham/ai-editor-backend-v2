CREATE TABLE IF NOT EXISTS users (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    username    VARCHAR     NOT NULL,
    email       VARCHAR     NOT NULL,
    github_token VARCHAR,
    github_name VARCHAR,
    github_email VARCHAR,
    github_login VARCHAR,
    password    VARCHAR     NOT NULL
);
CREATE TABLE IF NOT EXISTS projects (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    user_id     UUID        NOT NULL,
    github_repo_url     VARCHAR        ,
    name        VARCHAR     NOT NULL,
    html        TEXT,
    md_file_url        TEXT,
    anthropic_key        TEXT,
    description VARCHAR,
    CONSTRAINT fk_projects_user FOREIGN KEY (user_id) REFERENCES users(id)
);