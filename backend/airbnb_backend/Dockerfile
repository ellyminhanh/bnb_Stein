FROM python:3.12.2-slim-bullseye

WORKDIR /usr/src/airbnb_backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

RUN apt-get update && apt-get install -y netcat

RUN pip install --upgrade pip
COPY ./requirements.txt . 
RUN pip install -r requirements.txt 

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/airbnb_backend/entrypoint.sh
RUN chmod +x /usr/src/airbnb_backend/entrypoint.sh 

COPY . . 

ENTRYPOINT [ "sh","/usr/src/airbnb_backend/entrypoint.sh" ]

