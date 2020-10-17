# vermos: Simplifying Web Development

This is a JavaScript based platform for developing and running both interactive WebSocket-based applications and REST APIs.  vermos can run as either a monolithic back-end or as a set of MicroServices.

Vermos framework architecture prevents CPU-intensive or long-running APIs bringing a Node.js system to its knees, and utilizes MongoDB database, to uniquely present your data as persistent JavaScript Objects.


## Try it out using the Dockerized verison

    docker pull rtweed/-vermosserver

There's also a Raspberry Pi version

    docker pull rtweed/vermos-server-rpi

Create three files within a folder of your choice (eg *~/myvermosApp*), using the sub-folder structure shown below:

        ~/myvermosApp
            |
            |_ configuration
            |            |
            |            |_ config.json
            |            |
            |            |_ routes.json
            |
            |_ apis
            |    |
            |    |_ helloworld
            |            |
            |            |_ index.js


### *config.json*

      {
        "vermos_up": true
      }


### *routes.json*

      [
        {
          "uri": "/api/helloworld",
          "method": "GET",
          "handler": "helloworld"
        }
      ]


### *index.js*

      module.exports = function(args, finished) {
        finished({
          hello: 'world'
        });
      };


Fire up the vermos Docker instance:

    docker run -it --name vermosup --rm -p 3000:8080 -v ~/myvermosApp:/opt/vermos/mapped rtweed/vermos-server

or on a Raspberry Pi:

    docker run -it --name vermosup --rm -p 3000:8080 -v ~/myvermosApp:/opt/vermos/mapped rtweed/vermos-server-rpi


Try out your REST API:

    http://{{host-ip-address}}:3000/api/helloworld

*eg*:

    http://192.168.1.100:3000/api/helloworld

