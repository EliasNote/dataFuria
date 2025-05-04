FROM node:18-bullseye-slim

# 1) Instala dependências do Chrome
RUN apt-get update && apt-get install -y \
      wget gnupg ca-certificates fonts-liberation \
      libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 \
      libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 libnspr4 libnss3 \
      libx11-6 libxcomposite1 libxdamage1 libxext6 libxfixes3 \
      libxrandr2 libxrender1 libxss1 libxtst6 lsb-release xdg-utils \
    && wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub \
         | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" \
         > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y \
         google-chrome-stable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 2) Instala deps e builda
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 3) Exponha porta e comando de start
EXPOSE 3000
CMD ["node", "dist/main"]