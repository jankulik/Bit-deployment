## Machinery price prediction tool web interface

In order to run, first install Docker from the [official site](https://docs.docker.com/get-docker/). Then, pull the latest TensorFlow Serving image by running:

```bash
docker pull tensorflow/serving
```

Clone the model repository:

```bash
mkdir -p /tmp/tfserving
cd /tmp/tfserving
git clone https://github.com/jankulik/Bit.git
```

Next, run TensorFlow serving container with the model:

```bash
docker run -p 8501:8501 \
  --mount type=bind,\
  source=/tmp/tfserving/Bit/model,\
  target=/models/model \
  -e MODEL_NAME=model -t tensorflow/serving &
```

Finally, install all required packages and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note: if you are running both the server and the webapp locally, it is possible that a CORS policy error will occur. In this case you can use an [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) extension, which will fix the issue.