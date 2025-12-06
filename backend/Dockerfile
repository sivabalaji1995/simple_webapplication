FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

# Disable progress bar (avoids thread creation)
RUN pip install --no-cache-dir --progress-bar=off --upgrade pip

RUN pip install --no-cache-dir --progress-bar=off -r requirements.txt

RUN pip install --no-cache-dir --progress-bar=off gunicorn

COPY . .

EXPOSE 5000

CMD ["gunicorn", "app:create_app()", "--bind", "0.0.0.0:5000", "--workers", "4"]

