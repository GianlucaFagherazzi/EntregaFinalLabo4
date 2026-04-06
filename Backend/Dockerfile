FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN apt-get update && apt-get install -y default-mysql-client

RUN chmod +x wait-for-mysql.sh
RUN chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]