FROM python:3.11.2-alpine

WORKDIR /docs

EXPOSE 80:8000

COPY source /docs/
COPY requirements.txt /docs/requirements.txt

RUN python -m pip install --upgrade pip \
 && python -m pip install -r requirements.txt \
 && python -m sphinx.cmd.build . _build

ENTRYPOINT ["sh", "-c", "cd _build && python -m http.server"]
