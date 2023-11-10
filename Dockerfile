FROM node:14-slim 
WORKDIR /backend

COPY package*.json /backend/
RUN npm install 

COPY . /backend/

EXPOSE 3000

CMD ["npm", "start"]