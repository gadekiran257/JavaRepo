#!/bin/bash
# Build the Docker image
docker build -t myapp:latest .

# Run the Docker container
docker run -p 8080:8080 myapp:latest
