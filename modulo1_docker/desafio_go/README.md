# FullCycle 2.0 - Desafio GO

> `docker build -t yangricardo/codeeducation .`: constrói a imagem
>
> `docker run --rm  yangricardo/codeeducation`: executa a imagem
>
> [Imagem publicada](https://hub.docker.com/r/yangricardo/codeeducation/tags?page=1&ordering=last_updated): COMPRESSED SIZE 580.75 KB

## Versão 2

```dockerfile
FROM golang:1.14.3-alpine AS builder
WORKDIR /code
COPY main.go main.go
RUN go mod init education && \
    go build -ldflags="-s -w" . && \
    go install education

FROM scratch
COPY --from=builder /code/education /rocks

ENTRYPOINT [ "./rocks" ]
```

> Modificação do comando `go build` para utilizar as flags `-ldflags="-s -w"` para reduzir o tamanho do binário, conforme identificado [nesta página](https://boyter.org/posts/trimming-golang-binary-fat/)

```bash
REPOSITORY                       TAG                  IMAGE ID       CREATED         SIZE
yangricardo/codeeducation        latest               4623326f816e   4 seconds ago   1.46MB
```
