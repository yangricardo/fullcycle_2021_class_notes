# Iniciando com Kubernetes

## Kind

- Roda conteiners docker como uma abstração aos nodes kubernetes

## Instalação

- [Installation Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
- [Installation Kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)
- [WSL + Docker + Kubernetes](https://kubernetes.io/blog/2020/05/21/wsl-docker-kubernetes-on-the-windows-desktop/)

- `asdf plugin-add kind`: habilita o plugin do kind para ser instalado via `asdf`
- `asdf list all kind`: lista todos as versões do kind
- `asdf install kind 0.11.1`: instala kind v0.11.1
- `asdf local kind 0.11.1`: define localmente kind v0.11.1
- `asdf global kind 0.11.1`: define globalmente kind v0.11.1

## Criando primeiro cluster com Kind

- `kind create cluster`

```bash
➜  iniciando_com_kubernetes git:(main) ✗ kind create cluster
Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.20.2) 🖼 
 ✓ Preparing nodes 📦  
 ✓ Writing configuration 📜 
 ✓ Starting control-plane 🕹️ 
 ✓ Installing CNI 🔌 
 ✓ Installing StorageClass 💾 
Set kubectl context to "kind-kind"
You can now use your cluster with:

kubectl cluster-info --context kind-kind

Thanks for using kind! 😊
```

- `kubectl cluster-info --context kind-kind`: mudança de contexto do kubernetes

```bash
➜  iniciando_com_kubernetes git:(main) kubectl cluster-info --context kind-kind
Kubernetes master is running at https://127.0.0.1:35677
KubeDNS is running at https://127.0.0.1:35677/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

> kubectl utilizando o contexto do kind

- `docker ps`: listar conteiners docker

```bash
docker ps
CONTAINER ID   IMAGE                  COMMAND                  CREATED          STATUS          PORTS                       NAMES
ded3922bdf64   kindest/node:v1.20.2   "/usr/local/bin/entr…"   6 minutes ago    Up 5 minutes    127.0.0.1:35677->6443/tcp   kind-control-plane
b20e97dcf5aa   4fa642720eea           "kube-scheduler --au…"   30 minutes ago   Up 30 minutes                               k8s_kube-scheduler_kube-scheduler-docker-desktop_kube-system_57b58b3eb5589cb745c50233392349fb_0
2242c015ffb9   c15e4f843f01           "kube-apiserver --ad…"   30 minutes ago   Up 30 minutes                               k8s_kube-apiserver_kube-apiserver-docker-desktop_kube-system_4ac4b5ee26e7058a1ed090c12123e3a6_0
c5d19cb40553   0369cf4303ff           "etcd --advertise-cl…"   30 minutes ago   Up 30 minutes                               k8s_etcd_etcd-docker-desktop_kube-system_127f1e78367a800caa891919cc4b583f_0
5968d6aebdd8   k8s.gcr.io/pause:3.2   "/pause"                 30 minutes ago   Up 30 minutes                               k8s_POD_kube-scheduler-docker-desktop_kube-system_57b58b3eb5589cb745c50233392349fb_0
10add84028c4   k8s.gcr.io/pause:3.2   "/pause"                 30 minutes ago   Up 30 minutes                               k8s_POD_kube-controller-manager-docker-desktop_kube-system_77e9d7fdbb29bf4b5600ab5fbb368a2b_0
9ce06e113a0c   k8s.gcr.io/pause:3.2   "/pause"                 30 minutes ago   Up 30 minutes                               k8s_POD_kube-apiserver-docker-desktop_kube-system_4ac4b5ee26e7058a1ed090c12123e3a6_0
21b1c1736a84   k8s.gcr.io/pause:3.2   "/pause"                 30 minutes ago   Up 30 minutes                               k8s_POD_etcd-docker-desktop_kube-system_127f1e78367a800caa891919cc4b583f_0
```

> `kind-control-plane` é o conteiner do kind

- `kubectl get nodes` lista os nós kubernetes

```bash
➜  iniciando_com_kubernetes git:(main) kubectl get nodes                       
NAME                 STATUS   ROLES                  AGE     VERSION
kind-control-plane   Ready    control-plane,master   7m33s   v1.20.2
```

- `kind get clusters` lista clusters

- `kind delete clusters kind` deleta um cluster chamado kind

## Configuração de Nodes

> [nodes configuration](https://kind.sigs.k8s.io/docs/user/configuration/#nodes)

- `kind create cluster --config=modulo_kubernetes/iniciando_com_kubernetes/k8s/kind.yaml --name fullcycle` : cria um cluster chamado `kind-fullcycle` a partir da definição de um arquivo chamado kind.yaml

```bash
➜  fullcycle git:(main) ✗ kind create cluster --config=modulo_kubernetes/iniciando_com_kubernetes/k8s/kind.yaml --name fullcycle 
Creating cluster "fullcycle" ...
 ✓ Ensuring node image (kindest/node:v1.20.2) 🖼 
 ✓ Preparing nodes 📦 📦 📦 📦  
 ✓ Writing configuration 📜 
 ✓ Starting control-plane 🕹️ 
 ✓ Installing CNI 🔌 
 ✓ Installing StorageClass 💾 
 ✓ Joining worker nodes 🚜 
Set kubectl context to "kind-fullcycle"
You can now use your cluster with:

kubectl cluster-info --context kind-fullcycle

Thanks for using kind! 😊
```
