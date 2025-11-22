FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV HABIT_DATABASE_URL=sqlite:///./habit.db
ENV HABIT_JWT_SECRET=replace_with_access_secret
CMD [ "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8001" ]
