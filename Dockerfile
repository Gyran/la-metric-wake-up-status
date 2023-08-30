FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src/*.mjs .

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
