import os

SECRET_KEY = "lKPNMtmxzvNdeOpBOaECbkiR"

SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@db:3306/mydatabase'

basedir = os.path.abspath(os.path.dirname(__file__))

DEBUG = True

SQLALCHEMY_TRACK_MODIFICATIONS = False
