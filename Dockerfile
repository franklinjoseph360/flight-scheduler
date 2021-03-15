FROM node

WORKDIR /usr/src/flight-scheduler

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN npm run build

CMD ["npm", "start"]