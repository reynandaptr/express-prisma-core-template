FROM reynandaptr/node-builder:v16.16.0

ARG PAT

COPY . .

RUN echo "//npm.pkg.github.com/:_authToken=$PAT" >> .npmrc

RUN pnpm install
RUN pnpm build

RUN rm -rf .npmrc

EXPOSE 3000

CMD ["/bin/sh","-c","source /etc/profile && /wait && pnpm start"]
