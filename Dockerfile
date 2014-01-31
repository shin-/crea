FROM ubuntu:13.10
MAINTAINER Joffrey F <f.joffrey@gmail.com>

ENV CREA_ROOT /var/crea
RUN mkdir -p $CREA_ROOT

RUN apt-get update
RUN apt-get -y install nodejs npm wget unzip

RUN cd $CREA_ROOT; wget -O qx.zip "http://downloads.sourceforge.net/project/qooxdoo/qooxdoo-current/3.5/qooxdoo-3.5-sdk.zip?ts=$(date +%s)&use_mirror=optimate"
RUN unzip $CREA_ROOT/qx.zip 
RUN mv /qooxdoo-3.5-sdk $CREA_ROOT/qx
RUN rm $CREA_ROOT/qx.zip

ADD . /var/crea/crea

RUN npm install $CREA_ROOT/crea/server
RUN python $CREA_ROOT/crea/generate.py source-all

RUN mkdir -p $CREA_ROOT/crea/server/public
RUN rm -rf $CREA_ROOT/crea/server/public/*
RUN ln -s $CREA_ROOT/crea/source $CREA_ROOT/crea/server/public/
RUN ln -s $CREA_ROOT/qx $CREA_ROOT/crea/server/public/

EXPOSE 3000

WORKDIR /var/crea/crea/server
ENTRYPOINT ["nodejs", "app.js"]
