FROM node:20-alpine

WORKDIR /app

# Копирование package файлов
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование проекта
COPY . .

EXPOSE 5173

# Запуск Vite в режиме разработки
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]