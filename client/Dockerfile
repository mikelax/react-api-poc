FROM node:8.9.1-alpine

# define paths
WORKDIR /app
ADD . /app

# Install globals
RUN yarn global add create-react-app

EXPOSE 3000

CMD yarn && yarn start
