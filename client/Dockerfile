FROM node:8.9.0-wheezy

# define paths
WORKDIR /app
ADD . /app

# Install globals
RUN yarn global add create-react-app

EXPOSE 3000

CMD yarn && yarn start
