FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN apt-get update && apt-get install -y postgresql-client

RUN chmod +x scripts/wait-for-postgres.sh
RUN chmod +x scripts/start.sh

EXPOSE 3000

CMD ["./scripts/start.sh"]