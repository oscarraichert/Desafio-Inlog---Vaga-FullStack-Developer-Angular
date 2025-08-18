FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install

COPY src ./src/
COPY angular.json .
COPY tsconfig*.json ./

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4200"]