# vermos-server-cache

# Dockerised version of VERMOS

# M/Gateway Developments Ltd
# 12 December 2018

FROM node:8-stretch

RUN apt-get update && apt-get install -y \
  build-essential \
  libssl-dev \
  net-tools \
  dos2unix \
  wget \
  gzip \
  openssh-server \
  curl \
  locate \
  nano

# Create app directory
RUN mkdir -p /opt/vermos
WORKDIR /opt/vermos

COPY package.json /opt/vermos
RUN npm install
RUN npm install module-exists

RUN mkdir -p /tmp/cachekit
RUN cd /opt/vermos

COPY . /opt/vermos

RUN mv /opt/vermos/cache800.node /opt/vermos/node_modules/cache.node

RUN gunzip -c cache*.tar.gz | ( cd /tmp/cachekit ; tar xf - )
WORKDIR /tmp/cachekit/cache-2018.1.0.184.0su-lnxsusex64

ENV ISC_PACKAGE_INSTANCENAME="CACHE" \
    ISC_PACKAGE_INSTALLDIR="/opt/cachesys" \
    ISC_PACKAGE_UNICODE="Y" \
    ISC_PACKAGE_PLATFORM="lnxsusex64" \
    ISC_PACKAGE_STARTCACHE="N"

RUN sed '18i   platforms="lnxsusex64"' package/install > package/install.new
RUN mv package/install.new package/install
RUN chmod +x package/install

RUN ./cinstall_silent

RUN chown cacheusr:cacheusr /opt/cachesys/mgr/*
RUN rm /opt/vermos/cache*.tar.gz
RUN rm /opt/vermos/Dockerfile

EXPOSE 57772 1972
RUN cd /opt/vermos
WORKDIR /opt/vermos

# Bundle app source

RUN mkdir /opt/vermos/www
RUN mkdir /opt/vermos/www/vermos-monitor
RUN cp /opt/vermos/node_modules/vermos-monitor/www/bundle.js /opt/vermos/www/vermos-monitor
RUN cp /opt/vermos/node_modules/vermos-monitor/www/*.html /opt/vermos/www/vermos-monitor
RUN cp /opt/vermos/node_modules/vermos-monitor/www/*.css /opt/vermos/www/vermos-monitor
RUN cp /opt/vermos/node_modules/ewd-client/lib/proto/ewd-client.js /opt/vermos/www

RUN cd /opt/vermos

EXPOSE 8080

#ENTRYPOINT ["/bin/bash", "-l"]

WORKDIR /opt/vermos

RUN chmod +x /opt/vermos/startup.sh
CMD ["/opt/vermos/startup.sh"]


