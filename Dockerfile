FROM node:23-alpine

WORKDIR /opt/src

RUN apk add curl bash

RUN curl -fsSL https://bun.sh/install | bash

ENV BUN_INSTALL="/root/.bun" 
ENV PATH="$BUN_INSTALL/bin:$PATH" 