FROM node:10

COPY . .
RUN npm i
RUN npm run build

CMD [ "npm", "run", "serve" ]