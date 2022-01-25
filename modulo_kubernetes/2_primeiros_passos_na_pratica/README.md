# Primeiros passos na prática

- `go mod init hello/m`: inicia o modulo hello, geral o arquivo go.mod

- `go build -o server .`: gera binário do servidor

- `docker build -t yangricardo/hello-go .`: gera imagem docker

- `docker run --rm -p 3080:80 yangricardo/hello-go`

- `kind create cluster --config k8s/kind.cluster.yaml`: cria o cluster local usando kind

- `kind load docker-image yangricardo/hello-go --name fullcycle-go-server`: carrega imagem `yangricardo/hello-go` construida localmente no cluster kind de nome `fullcycle-go-server`

- `kubectl apply -f k8s/pod.yaml`: aplica (cria | atualiza) o pod a partir do arquivo definido

- `kubectl port-forward pod/goserver 3080:80`: expõe o pod `goserver` a partir da porta `80` do container para  a porta `3080` do servidor

- `kubectl apply -f k8s/replicaset.yaml`: aplica replicaset de 2 pods baseado no `pod.yaml`
