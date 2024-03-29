# Primeiros passos na prática

- `go mod init hello/m`: inicia o modulo hello, geral o arquivo go.mod

- `go build -o server .`: gera binário do servidor

- `docker build -t yangricardo/hello-go .`: gera imagem docker

- `docker run --rm -p 3080:80 yangricardo/hello-go`

- `kind create cluster --config k8s/kind.cluster.yaml`: cria o cluster local usando kind

- `kind load docker-image yangricardo/hello-go --name fullcycle-kubernetes`: carrega imagem `yangricardo/hello-go` construida localmente no cluster kind de nome `fullcycle-kubernetes`

- `kubectl apply -f k8s/pod.yaml`: aplica (cria | atualiza) o pod a partir do arquivo definido

- `kubectl port-forward pod/goserver 3080:80`: expõe o pod `goserver` a partir da porta `80` do container para  a porta `3080` do servidor

- `kubectl apply -f k8s/replicaset.yaml`: aplica replicaset de 2 pods baseado no `pod.yaml`

## Atualizando imagens em replicasets

- Cria e carrega imagem no cluster
  - `docker build -t yangricardo/hello-go:v2 .`
  - `kind load docker-image yangrica`rdo/hello-go:v2 --name fullcycle-kubernetes`

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

## GoServer V4 Port e Target Port

- Cria e carrega imagem no cluster e atualiza o deployment
  - `docker build -t yangricardo/hello-go:v4 .`
  - `kind load docker-image yangricardo/hello-go:v4 --name fullcycle-kubernetes`
  - `kubectl apply -f k8s/deployment.yaml`
  - `kubectl port-forward svc/goserver-service 9000:80`

> Port: Porta exposta pelo serviço
> Target Portä exposta pelo container / pod

## GoServer v4 - Configmap

> Tipo de arquivo que armazena variaveis de ambiente
> `kubectl apply -f k8s/configmap.env.yaml`
> Atualiza deployment para referenciar o configmap
> `kubectl apply -f k8s/deployment.yaml`

## GoServer V5 - Configmap

- `docker build -t yangricardo/hello-go:v5 .`
- `kind load docker-image yangricardo/hello-go:v5 --name fullcycle-kubernetes`
- `kubectl apply -f k8s/configmap.family.yaml`: aplica novo configmap
- `kubectl apply -f k8s/deployment.yaml`: modificado para montar um volume a partir de um arquivo

## Goserver V6 - Secret

- `docker build -t yangricardo/hello-go:v6 .`
- `kind load docker-image yangricardo/hello-go:v6 --name fullcycle-kubernetes`
- `echo "Yang" | base64`: transforma a string `Yang` em `base64` gerando o valor `WWFuZwo=`
- `echo "123456" | base64`: transforma a string `Yang` em `base64` gerando o valor `MTIzNDU2Cg==`
- `kubectl apply -f k8s/secret.yaml`: aplica o arquivo de secret ao cluster
- `kubectl apply -f k8s/deployment.yaml`: modificado para montar a configuração `Secret` como variaveis de ambiente

## Goserver V7 - Healthz

- `docker build -t yangricardo/hello-go:v7 .`
- `kind load docker-image yangricardo/hello-go:v7 --name fullcycle-kubernetes`
- `kubectl apply -f k8s/deployment.yaml`

### LivenessProbe

- `kubectl apply -f k8s/deployment.yaml && watch -n1 kubectl get pods deployment.apps/goserver configured`: aplica o deplyment e monitora os mods

> checa a cada 5 segundos `periodSeconds` a rota indicada no parametro `httpGet`, Caso ocorra erro 3 vezes `failureThreshold`, reinicia o container

```yaml
livenessProbe:
  periodSeconds: 5
  failureThreshold: 3
  timeoutSeconds: 1
  successThreshold: 1
  httpGet: 
    path: /healthz
    port: 8000    
```

## Goserver V8 - ReadinessProbe

- `docker build -t yangricardo/hello-go:v8 .`
- `kind load docker-image yangricardo/hello-go:v8 --name fullcycle-kubernetes`
- `kubectl apply -f k8s/deployment.yaml`

> checa a cada 5 segundos `periodSeconds` a rota indicada no parametro `httpGet`, Caso ocorra erro 3 vezes `failureThreshold`, reinicia o container. Bloqueia as requisições por `initialDelaySeconds`

```yaml
readinessProbe:
  periodSeconds: 3
  failureThreshold: 1
  initialDelaySeconds: 10
  httpGet: 
    path: /healthz
    port: 8000     
```

# Teste de stress com fortio

- Inicia o pod fortio: `kubectl run -it fortio --rm --image=fortio/fortio -- load -qps 800 -t 120s -c 70 "http://goserver-service/healthz"`
- Monitora comportamento do `hpa`: `watch kubectl get hpa`
