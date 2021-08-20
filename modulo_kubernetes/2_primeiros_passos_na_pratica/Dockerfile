FROM golang:1.16.5
WORKDIR /hello
COPY .  .
RUN go mod init hello && \
    go build -o server . && \
    go install hello
RUN chmod 700 ./server
CMD ["./server"]