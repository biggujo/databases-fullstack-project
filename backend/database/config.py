from sqlalchemy import create_engine, text


def init_db_connection():
    engine = create_engine('mysql+pymysql://root:root@db', pool_pre_ping=True)
    with engine.connect() as connection:
        connection.execute(text('CREATE DATABASE IF NOT EXISTS mydatabase'))
        connection.commit
