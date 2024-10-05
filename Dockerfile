FROM node:20

RUN mkdir -p /usr/apps
WORKDIR /usr/apps
COPY package.json .
COPY ./ .
RUN npm install -g yarn
RUN yarn install
ENV NODE_ENV=production
ENV PORT=12001
ENV HOST=0.0.0.0
ENV DB_CONNECTION_STRING=mongodb://root:mongo!2024@srv-captain--mongo:27017/
ENV DOG_FACTS_URL=https://dog-api.kinduff.com/api/facts
EXPOSE 12001
CMD [ "yarn","start" ]