FROM node:latest AS development

RUN mkdir /srv/smartcarAPI

WORKDIR /srv/smartcarAPI

COPY package.json package-lock.json ./

RUN npm install

CMD ["npm", "start:development"]
