

#### 构建镜像 - 基于该Dockerfile构建应用镜像

```
docker build -t 名称 .

```

#### 查看本地镜像，运行命令

```
docker image ls | grep vuenginxcontainer

```

####  镜像启动容器，运行命令：

- docker run 基于镜像启动一个容器
- -p 3000:80 端口映射，将宿主的3000端口映射到容器的80端口
- -d 后台方式运行
- --name 容器名 查看 docker 进程

```
docker run \
-p 3000:80 \
-d --name vueApp \
vuenginxcontainer

```