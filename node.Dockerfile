FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY ./src /app/src
COPY ./public /app/public
RUN npm run build
RUN rm -rf node_modules
RUN rm -rf src
RUN rm -rf public
RUN rm package*
RUN npm install -g serve
ENTRYPOINT serve -s build
EXPOSE 8081