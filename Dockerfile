FROM golang:1.18.1-alpine3.15
RUN apk add bash ca-certificates git gcc g++ libc-dev
RUN mkdir /app 
ADD . /app/ 
WORKDIR /app 
RUN chmod u+x scripts/build.sh
RUN scripts/build.sh
EXPOSE 8080
CMD ["bin/share-gang-locations"]
