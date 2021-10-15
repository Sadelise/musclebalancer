#
# Build:
# docker build -t musclebalancer:latest . 
#
# Run:
# docker run -d -p 3000:3000 musclebalancer
#


FROM node:lts-alpine3.14

WORKDIR /app

COPY package.json ./
RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

