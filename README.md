# Workshop for Containers
This workshop is an introduction to Docker, which is a runtime for containers. You will create a `containerized` Node.js application.

## Environment
You can use one of the following environments for this workshop
1. Install `docker` locally using [Docker Desktop](https://www.docker.com/products/docker-desktop).

## Steps

### Step 1 - clone repository

Open your local terminal. 
```
git clone https://github.com/blumareks/node-docker.git
```

### Step 2 - build the docker image

Change into the directory you just cloned and build the docker image
```
cd node-docker
docker build -t <docker-username>/node-mycontainer .
```
The `docker-username` is required if you want to publish your image to [Dockerhub](https://hub.docker.com/).


Alternatively, you can also build directly from github using the following command without cloning the repository: 
```
docker build -t <docker-username>/node-mycontainer https://github.com/blumareks/node-docker.git
```

This command uses the [Dockerfile](./Dockerfile) to download a Node.js 10 base image and then install our Express.js application on top. Let's explore the contents of this docker file ...

```
FROM node:10
```
... builds our image on top of the Node.js 10 image.

```
WORKDIR /usr/src/app
```
... creates a working directory for our application to live in.

```
COPY package*.json ./
```
... copies the `package.json` file to our working directory.

```
RUN npm install
```
... install our dependencies. We just have two dependencies in this application: `express` and `ibm-watson`.

```
COPY . .
```
... copy the rest of our source code into the docker image

```
EXPOSE 8080
```
... expose port 8080. We will still have to forward our local port to this docker container port later.

```
CMD [ "node", "server.js" ]
```
... starts the application by running `node server.js`.

### Step 3 - run the docker image
```
docker run -p 8080:8080 -d <docker-username>/node-mycontainer
```

In my case, I would run

```
docker run -p 8080:8080 -d blumareks/node-mycontainer
```

### Step 4 - test the application

```curl "localhost:8080/hello ```

```Hello World - you might want to add some text```

**How cool was that!** You just containerzied a Node.js application

## Clean up <OPTIONAL>
  
### Step 5 - stop the container

You can first stop the container. You need the container tag or the id to stop it. Let's look it up first

```
docker ps | grep node-mycontainer

419104eff9be        blumareks/node-mycontainer                          "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes                       0.0.0.0:8080->8080/tcp                            cranky_davinci
```
In my case, the container is called `cranky_davinci` and has an id of `419104eff9be`.

Stop the image with the following command. You can replace the id with your container id.

```
docker container stop 419104eff9be
```

### Step 6 - remove the container

Run the following command to remove the container. Replace the id with your container id identified in the step above.
```
docker container rm 419104eff9be
```

### Step 7 - remove the image

You can now delete the image. You again need the image id. 

```
$ docker images | grep node-container
blumareks/node-mycontainer                       latest                         8baa6ca9cdac        5 minutes ago       958MB
```

Now, delete the image as follows.

```
$ docker image rm 8baa6ca9cdac
Untagged: blumareks/node-mycontainer:latest
Deleted: sha256:8baa6ca9cdac8868d8e17642e90b433c7aa588a615b59ac9b528fb8635698a6e
Deleted: sha256:8c279f530b3ff260279f9cb8d22d167d748e53df4f6eab91b089b6c90b4da9f2
Deleted: sha256:9845fb86e05aa69c677dc999b6bbdeceafc460e70604092e0247e0f8880ec93e
Deleted: sha256:84ea0148452752e2aba0a1e1ef963355781a3fb87e485e9a440e8e8fc002d045
Deleted: sha256:f4f99031ae0d1cf0079d9981ef6e8dff2231eff670ac7ea4a4f27472282d7ad2
Deleted: sha256:bf579e37b35bb7b20ed0cb3140220118cbbd1d0564a512f21868568b3683a392
Deleted: sha256:07b958722eb2513e88186b2f6eddadcec0b8772001a598244352073ac5caf176
Deleted: sha256:361c46840912a7b9539b6ddf00164492fc594701085f0e2c9d2c1544bca8498c
```

## Troubleshooting

### Check container logs
You can check the logs for your container using

```
docker logs <container_id>
```

For example ...
```
# docker logs 4450279a9f50   


Running on http://0.0.0.0:8080

```
