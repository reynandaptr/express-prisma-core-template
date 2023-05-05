FROM reynandaptr/node-builder:v0.0.1

ARG PAT

COPY . .

RUN echo "//npm.pkg.github.com/:_authToken=$PAT" >> .npmrc

RUN pnpm install
RUN pnpm build

RUN rm -rf .npmrc

EXPOSE 3000

CMD ["/bin/sh","-c","source /etc/profile && /wait && pnpm start"]
