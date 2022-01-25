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

## Atualizando imagens em replicasets

- Cria e carrega imagem no cluster
  - `docker build -t yangricardo/hello-go:v2 .`
  - `kind load docker-image yangrica`rdo/hello-go:v2 --name fullcycle-go-server`

> Ao aplicar este arquivo, não é garantido que os containers executando até o momento sejam atualizados com a mesma imagem

## Deployments

> Similar ao replicaset, mas trata a questão de atualizar a versão das imagens, terminando os containers com a antiga versão e subindo novos containers com a nova versão da imagem
> `kubectl apply -f k8s/deployment.yaml`

## Rollout e Revisões

- `kubectl rollout history deployment goserver`: lista as revisões de deployment executadas

- `kubectl rollout undo deployment goserver --to-revision=1`: aplica o retorno para uma revisão anteriormente executada

## Services e ClusterIP

> Forma abstrata que expoe uma aplicação kubernetes, delegando ao Kubernetes a escolha automatica de qual pod vai processar a requisiçào
>
> - `kubectl apply -f k8s/service.yaml`: aplica o serviço
> - `kubectl port-forward svc/goserver-service 3080:80`: publica a porta

## GoServer V3 Port e Target Port

- Cria e carrega imagem no cluster e atualiza o deployment
  - `docker build -t yangricardo/hello-go:v4 .`
  - `kind load docker-image yangricardo/hello-go:v3 --name fullcycle-go-server`
  - `kubectl apply -f k8s/deployment.yaml`
  - `kubectl port-forward svc/goserver-service 9000:80`

> Port: Porta exposta pelo serviço
> Target Portä exposta pelo container / pod

## GoServer v4 - Configmap
