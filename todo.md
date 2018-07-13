
### For build docker
$ docker build -t mzget/stalk-fcm-chitchat ./
$ docker build -t mzget/stalk-fcm-jobtobgun ./
### For run docker
$ docker run -it --rm -p 9001:9001 --name fcm-chitchat mzget/stalk-fcm-chitchat:[tag] 
$ docker run -it --rm -p 9001:9001 --name fcm-jobtopgun mzget/stalk-fcm-jobtobgun:[tag] 

$ docker run -d -p 9002:9001 --name fcm-chitchat mzget/stalk-fcm-chitchat:[tag]
$ docker run -d -p 9002:9001 --name fcm-jobtopgun mzget/stalk-fcm-jobtobgun:[tag]
### Docker cloud.
$ docker push mzget/stalk-fcm-chitchat
$ docker push mzget/stalk-fcm-jobtobgun