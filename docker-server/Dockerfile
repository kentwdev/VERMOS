# vermos-server

# Dockerised version of VERMOS

#FROM node:boron
#FROM node:carbon
#FROM node:10-stretch
FROM node:12.18.1-stretch

RUN apt-get update && apt-get install -y \
  build-essential \
  libssl-dev \
  dos2unix \
  wget \
  gzip \
  openssh-server \
  curl \
  python-minimal \
  libelf1 \
  locate \
  nano \
  subversion \
  xinetd \
  git

RUN echo 'deb http://ftp.debian.org/debian/ buster main' >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get -t buster install -y libc6 libncurses6

# Create app directory
RUN mkdir -p /opt/vermos
WORKDIR /opt/vermos

COPY install_yottadb.sh /opt/vermos
COPY gde.txt /opt/vermos
RUN chmod +x /opt/vermos/install_yottadb.sh

RUN cd /opt/vermos

# Install app dependencies
COPY package.json /opt/vermos
# RUN npm install -g npm@latest
RUN npm install
RUN npm install module-exists piscina vermos-jsdb-piscina

# Install YottaDB & NodeM

RUN ["/opt/vermos/install_yottadb.sh"]

# Bundle app source
COPY . /opt/vermos

RUN chmod +x /opt/vermos/ydb
RUN chmod +x /opt/vermos/backup
RUN chmod +x /opt/vermos/update_to_r128

RUN mkdir /opt/vermos/www
RUN mkdir /opt/vermos/www/vermos-monitor

RUN git clone https://github.com/robtweed/vermos-client
RUN cp /opt/vermos/vermos-client/vermos-client.js /opt/vermos/www
RUN rm -r /opt/vermos/vermos-client

RUN git clone https://github.com/robtweed/mg-webComponents
RUN cp /opt/vermos/mg-webComponents/mg-webComponents.js /opt/vermos/www
#RUN rm -r /opt/vermos/mg-webComponents

RUN mkdir /opt/vermos/www/components
RUN mkdir /opt/vermos/www/components/adminui
RUN git clone https://github.com/robtweed/wc-admin-ui /opt/vermos/www/components/adminui

RUN mkdir /opt/vermos/www/components/leaflet
RUN git clone https://github.com/robtweed/wc-leaflet /opt/vermos/www/components/leaflet

RUN mkdir /opt/vermos/www/components/d3
RUN git clone https://github.com/robtweed/wc-d3 /opt/vermos/www/components/d3

RUN mkdir /opt/vermos/www/vermos-monitor-adminui
RUN git clone https://github.com/robtweed/vermos-monitor-adminui /opt/vermos/www/vermos-monitor-adminui

RUN cp /opt/vermos/node_modules/vermos-monitor/www/bundle.js /opt/vermos/www/vermos-monitor
RUN cp /opt/vermos/node_modules/vermos-monitor/www/*.html /opt/vermos/www/vermos-monitor
RUN cp /opt/vermos/node_modules/vermos-monitor/www/*.css /opt/vermos/www/vermos-monitor

RUN cp /opt/vermos/node_modules/ewd-client/lib/proto/ewd-client.js /opt/vermos/www

RUN cd /opt/vermos

EXPOSE 8080

# ENTRYPOINT ["/bin/bash", "-l"]

CMD [ "npm", "start" ]
