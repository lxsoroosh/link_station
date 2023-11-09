# Python link station API

## Setup

Requirements:

- Python (3.8+)

```bash
$ pip install -r requirements.txt
```

## Running


Run the following common from the root of the api folder to start the app:

```bash
$ src/api/linkstation_projecct
$ gunicorn --bind 0.0.0.0:3100 linkstations_project.wsgi
```

## Running in Docker

The environment variable AZURE_COSMOS_CONNECTION_STRING must be set and then application runs on TCP 8080:

```bash
docker build . -t link_station_backend
docker run --env-file ./src/.env -p 8080:8080 -t link_station_backend
```

