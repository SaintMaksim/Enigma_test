import { useState } from 'react'
import './App.css'

function App() {
  // Моковые данные (потом заменим на данные с бэкенда)
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: "Не могу войти в аккаунт",
      body: "Пользователь не может авторизоваться, получает ошибку 403...",
      category: "Авторизация",
      status: "new",
      createdAt: "2026-02-25 10:30"
    },
    {
      id: 2,
      subject: "Ошибка при оплате",
      body: "При оплате картой происходит сброс транзакции...",
      category: "Биллинг",
      status: "in_progress",
      createdAt: "2026-02-25 11:15"
    },
    {
      id: 3,
      subject: "Не работает экспорт данных",
      body: "При попытке экспорта в CSV файл не скачивается...",
      category: "Функционал",
      status: "done",
      createdAt: "2026-02-25 09:00"
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: '',
    body: '',
    category: ''
  })

  // Функция добавления новой заявки
  const handleAddTicket = (e) => {
    e.preventDefault()
    const ticket = {
      id: tickets.length + 1,
      ...newTicket,
      status: 'new',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    }
    setTickets([...tickets, ticket])
    setNewTicket({ subject: '', body: '', category: '' })
    setShowAddForm(false)
  }

  // Функция изменения статуса
  const changeStatus = (id, newStatus) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, status: newStatus } : ticket
    ))
  }

  // Статусы для отображения
  const statusLabels = {
    new: ' Новая',
    in_progress: '⏳ В работе',
    done: '✅ Выполнена'
  }

  const statusColors = {
    new: '#ff6b6b',
    in_progress: '#4ecdc4',
    done: '#95e1d3'
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎫 Система техподдержки</h1>
        <p>AI-агент для обработки писем</p>
      </header>

      <div className="controls">
        <button 
          className="btn-primary" 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '✖ Отмена' : '+ Добавить заявку'}
        </button>
      </div>

      {/* Форма добавления */}
      {showAddForm && (
        <form className="add-form" onSubmit={handleAddTicket}>
          <input
            type="text"
            placeholder="Тема письма"
            value={newTicket.subject}
            onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
            required
          />
          <textarea
            placeholder="Текст письма"
            value={newTicket.body}
            onChange={(e) => setNewTicket({...newTicket, body: e.target.value})}
            required
            rows="3"
          />
          <input
            type="text"
            placeholder="Категория (AI)"
            value={newTicket.category}
            onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
          />
          <button type="submit" className="btn-success">💾 Сохранить</button>
        </form>
      )}

      {/* Таблица заявок */}
      <div className="table-container">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Тема</th>
              <th>Категория (AI)</th>
              <th>Статус</th>
              <th>Дата создания</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>
                  <div className="subject">{ticket.subject}</div>
                  <div className="body-preview">{ticket.body}</div>
                </td>
                <td>
                  <span className="category-badge">{ticket.category}</span>
                </td>
                <td>
                  <select
                    className="status-select"
                    value={ticket.status}
                    onChange={(e) => changeStatus(ticket.id, e.target.value)}
                    style={{ borderColor: statusColors[ticket.status] }}
                  >
                    <option value="new">Новая</option>
                    <option value="in_progress">В работе</option>
                    <option value="done">Выполнена</option>
                  </select>
                </td>
                <td>{ticket.createdAt}</td>
                <td>
                  <button className="btn-action">📧 Ответить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stats">
        <div className="stat-item">
          <span className="stat-number">{tickets.filter(t => t.status === 'new').length}</span>
          <span className="stat-label">Новых заявок</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{tickets.filter(t => t.status === 'in_progress').length}</span>
          <span className="stat-label">В работе</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{tickets.length}</span>
          <span className="stat-label">Всего</span>
        </div>
      </div>
    </div>
  )
}

export default App