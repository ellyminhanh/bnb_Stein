FROM python:3.12.6-slim

WORKDIR /usr/src/airbnb_backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

RUN pip install --upgrade pip
COPY ./requirements.txt . 
RUN pip install -r requirements.txt 

COPY . . 