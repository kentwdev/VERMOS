FROM node:boron

# Create app directory
RUN mkdir -p /opt/vermos
WORKDIR /opt/vermos

# Install app dependencies
COPY package.json /opt/vermos
RUN npm install

# Bundle app source
COPY . /opt/vermos


RUN mkdir /opt/vermos/www
RUN mkdir /opt/vermos/www/vermos-monitor

RUN cd /opt/vermos/node_modules/vermos-monitor/www

RUN cp /opt/vermos/node_modules/vermos-monitor/www/bundle.js /opt/vermos/www/vermos-monitor
RUN cp /opt/vermos/node_modules/vermos-monitor/www/*.html /opt/vermos/www/vermos-monitor
RUN cp /opt/vermos/node_modules/vermos-monitor/www/*.css /opt/vermos/www/vermos-monitor

RUN cp /opt/vermos/node_modules/ewd-client/lib/proto/ewd-client.js /opt/vermos/www

EXPOSE 8080
CMD [ "npm", "start" ]