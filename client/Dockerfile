FROM node:8.9.0-wheezy

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
ADD yarn.lock /tmp/yarn.lock

RUN cd /tmp && yarn
RUN mkdir /app && cp -a /tmp/node_modules /app/

# Create app directory
WORKDIR /app
ADD . /app

# Bundle app source
COPY . /app

# Install globals
CMD yarn global add create-react-app

EXPOSE 3000

CMD yarn start
