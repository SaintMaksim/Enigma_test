# Enigma Support Agent

**AI-агент для автоматизации обработки писем технической поддержки**

Предварительное задание для отбора на хакатон **ENIGMA HACK**.

---

## 1. Информация о команде

| Параметр | Значение |
|----------|----------|
| **Название команды** | bratva inc. |
| **Участники** | 5 человек |
| **Тимлид** | Иванов Дмитрий Игоревич |
| **Telegram** | @awakkken |
| **Репозиторий** | (https://github.com/SaintMaksim/Enigma_test.git) |

### Состав команды и роли

| Участник | Роль | Зона ответственности |
|----------|------|---------------------|
| Гущин Андрей Александрович | ML Engineer | Классификация писем, модель RoBERTa |
| Гатаулин Данил Валерьевич | ML Engineer | Предобработка текста, пайплайны данных |
| Иванов Дмитрий Игоревич | Backend Lead | Django, API, бизнес-логика |
| Дзюбинский Ярослав Андреевич | DevOps Lead | Docker, docker-compose, развёртывание |
| Таран Максим Сергеевич | Frontend Lead | Веб-интерфейс, таблица заявок |

---

## 2. Пользовательский путь (User Journey)

Оператор технической поддержки взаимодействует с системой по следующему сценарию:

| Шаг | Действие | Описание |
|-----|----------|----------|
| 1 | **Получение письма** | Письмо от клиента поступает на почтовый сервер (IMAP) |
| 2 | **Извлечение данных** | Django-сервис забирает письмо, извлекает тему и текст |
| 3 | **AI-анализ** | ML-модель (RoBERTa) определяет категорию, приоритет и тональность |
| 4 | **Сохранение** | Заявка сохраняется в PostgreSQL со статусом "Новая" |
| 5 | **Отображение** | Заявка появляется в веб-таблице оператора (Django Admin/UI) |
| 6 | **Просмотр** | Оператор видит тему, текст, AI-категорию и предложенный ответ |
| 7 | **Редактирование** | Оператор может скорректировать категорию или текст ответа |
| 8 | **Отправка** | Оператор подтверждает и отправляет ответ клиенту (SMTP) |
| 9 | **Завершение** | Статус заявки меняется на "Выполнена" |


## 3.Схема процесса

```mermaid
graph LR
    A[Почтовый сервер] --> B[Django Backend]
    B --> C[ML-агент RoBERTa]
    B --> D[PostgreSQL]
    D --> E[Веб-таблица оператора]
    E --> F[Отправка ответа]
    
    style A fill:#667eea,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#764ba2,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#f093fb,stroke:#333,stroke-width:2px,color:#000
    style D fill:#4facfe,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#43e97b,stroke:#333,stroke-width:2px,color:#fff
    style F fill:#fa709a,stroke:#333,stroke-width:2px,color:#fff
```

## 4. Схема взаимодействия компонентов

```mermaid
graph TD
    subgraph Frontend ["Frontend (React)"]
        F1[Веб-таблица оператора]
        F2[Форма добавления/редактирования]
        F3[Статистика и фильтры]
    end
    
    subgraph Backend ["Backend (Django)"]
        B1[REST API]
        B2[Бизнес-логика]
        B3[Email Service IMAP/SMTP]
    end
    
    subgraph ML ["ML Service"]
        M1[RoBERTa Classifier]
        M2[Тональность]
        M3[Категоризация]
    end
    
    subgraph Database ["Database (PostgreSQL)"]
        D1[(mails_table)]
        D2[(users_table)]
        D3[(logs_table)]
    end
    
    F1 <-->|HTTP/REST| B1
    B1 <--> B2
    B2 <--> B3
    B2 <--> M1
    M1 <--> M2
    M1 <--> M3
    B2 <--> D1
    B2 <--> D2
    B2 <--> D3
    
    style Frontend fill:#667eea,stroke:#333,stroke-width:2px,color:#fff
    style Backend fill:#764ba2,stroke:#333,stroke-width:2px,color:#fff
    style ML fill:#f093fb,stroke:#333,stroke-width:2px,color:#000
    style Database fill:#4facfe,stroke:#333,stroke-width:2px,color:#fff
```
### Последовательность обработки письма

```mermaid
sequenceDiagram
    participant Client as Клиент
    participant Email as Почтовый сервер
    participant Django as Django Backend
    participant ML as ML-агент
    participant DB as PostgreSQL
    participant UI as Веб-интерфейс
    participant Operator as Оператор

    Client->>Email: Отправляет письмо
    Email->>Django: IMAP синхронизация
    Django->>ML: Текст письма
    ML-->>Django: Категория + тональность
    Django->>DB: Сохранение заявки
    DB-->>UI: Отображение в таблице
    UI->>Operator: Показывает заявку
    Operator->>UI: Редактирует/Подтверждает
    UI->>Django: Обновление статуса
    Django->>DB: Сохранение изменений
    Django->>Email: SMTP отправка ответа
    Email->>Client: Получает ответ
```
## 5. Структура проекта

| Путь | Файл | Назначение |
|------|------|------------|
| `backend/` | `config/settings.py` | Настройки Django (БД, middleware, apps) |
| `backend/` | `config/urls.py` | Корневая маршрутизация |
| `backend/` | `mails/models.py` | Модель Mail (поля письма) |
| `backend/` | `mails/views.py` | API endpoints для заявок |
| `backend/` | `mails/admin.py` | Регистрация модели в админке |
| `backend/` | `mails/serializers.py` | Сериализация данных для API |
| `backend/` | `manage.py` | Утилита управления Django |
| `backend/` | `requirements.txt` | Python зависимости |
| `frontend/` | `src/App.jsx` | Главный React компонент |
| `frontend/` | `src/App.css` | Стили таблицы заявок |
| `frontend/` | `src/api.js` | Fetch-запросы к бэкенду |
| `frontend/` | `package.json` | Node.js зависимости |
| `frontend/` | `vite.config.js` | Настройки сборщика Vite |
| `./` | `docker-compose.yml` | Оркестрация Docker-контейнеров |
| `./` | `Dockerfile` | Образ для развёртывания |
| `./` | `.env.example` | Шаблон переменных окружения |
| `./` | `README.md` | Документация проекта |


## 6. Схема базы данных

```mermaid
erDiagram
    MAIL {
        int id PK "Первичный ключ"
        date date "Дата письма"
        varchar full_name "ФИО отправителя"
        varchar sender "Предприятие"
        varchar tel_number "Телефон"
        varchar email "Email"
        varchar factory_nums "Номера приборов"
        varchar device_type "Тип устройства"
        varchar emotional_color "Тональность"
        text question "Описание проблемы"
        timestamp created_at "Дата создания"
        timestamp updated_at "Дата обновления"
    }
    
    USER {
        int id PK "Первичный ключ"
        varchar username "Имя пользователя"
        varchar email "Email"
        varchar role "Роль"
    }
    
    LOG {
        int id PK "Первичный ключ"
        int mail_id FK "Ссылка на письмо"
        varchar action "Действие"
        timestamp created_at "Дата записи"
    }
    
    MAIL ||--o{ LOG : "has"
    USER ||--o{ LOG : "creates"
```
