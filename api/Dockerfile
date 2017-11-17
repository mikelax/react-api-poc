FROM node:8.9.1-alpine

# Create app directory
WORKDIR /app
ADD . /app


EXPOSE 3001

CMD yarn && yarn migrate:latest && yarn start
