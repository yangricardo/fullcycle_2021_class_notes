# Iniciando com Kubernetes

## Kind

- Roda conteiners docker como uma abstração aos nodes kubernetes

## Instalação

- [Installation Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
- [Installation Kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)
- [WSL + Docker + Kubernetes](https://kubernetes.io/blog/2020/05/21/wsl-docker-kubernetes-on-the-windows-desktop/)

- `asdf plugin-add kind`: habilita o plugin do kind para ser instalado via `asdf`
- `asdf list all kind`: lista todos as versões do kind
- `asdf install kind 0.10.0`: instala kind v0.10.0

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
