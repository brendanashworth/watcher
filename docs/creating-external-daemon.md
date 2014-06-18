# Creating an External Daemon

> This tutorial outlines the steps necessary to install an external daemon and connect it to your frontend server.

This article assumes you already have a functional frontend server.

### Setting up Daemon
The daemon setup and configuration is really easy. Simply clone the repository and install it as if you were installing a frontend server. However, before you start the application, edit `app.yml` and change the `server_type` value to: `daemon`.

Configure your port and host as you would like to, and remember the values you use. Then start the application.

### Configuring Frontend
Now go back to the frontend `app.yml`. Open it up and go to the `servers` section. Remember the host and port you used earlier? You're going to use that now. Add a new entry to the servers section like so:
```yml
servers:
    # This is the frontend
    1:
        name: "localhost"
        host: "127.0.0.1"
        port: "3137"
        id: 1
    #-- This is your new daemon! --#
    2:
        name: "My new Daemon"
        host: "12.34.56.78"
        port: "3137"
        id: 2
```

Don't forget the `id` value for the server. Then just boot up the frontend (and make sure the daemon is booted), and you're off and running.