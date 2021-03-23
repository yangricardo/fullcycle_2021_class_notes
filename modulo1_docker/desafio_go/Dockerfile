FROM golang:1.14.3-alpine AS builder
WORKDIR /code
COPY main.go main.go
RUN go mod init education && \
    go build -ldflags="-s -w" . && \
    go install education

FROM scratch
COPY --from=builder /code/education /rocks

ENTRYPOINT [ "./rocks" ]