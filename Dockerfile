#
# Build:
# docker build -t sadelise/musclebalancer:latest . 
#
# Run:
# docker run -d -p 3000:3000 musclebalancer
#


FROM node:14.18.1-alpine3.14 

WORKDIR /app

COPY package.json ./
RUN npm install --silent

COPY . .

EXPOSE 3000
EXPOSE 3001

CMD [ "npm", "run", "startall" ]

