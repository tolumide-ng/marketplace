FROM node:17.3.1 AS base
RUN npm i -g node-sass@7.0.1

WORKDIR /app
EXPOSE 8000
ENV NODE_ENV "dev"
COPY package*.json ./
COPY . ./
RUN ls -l


FROM base as dev
RUN npm install
RUN ls -l
CMD ["npm", "run", "dev"]

FROM base AS prod
COPY . ./
RUN npm run build