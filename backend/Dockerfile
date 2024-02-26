FROM python:3.11.7

WORKDIR /app

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 6001

CMD ["python3", "app.py"]
