FROM reynandaptr/node-builder:v0.0.1

ARG GIT_ACCESS_KEY

COPY . .

RUN echo $GIT_ACCESS_KEY | base64 -d > ~/.ssh/id_rsa && \
  chmod 400 ~/.ssh/id_rsa
RUN eval $(ssh-agent -s) && \
  ssh-add ~/.ssh/id_rsa

RUN pnpm install
RUN pnpm build

EXPOSE 3000

CMD ["/bin/sh","-c","source /etc/profile && /wait && pnpm start"]
