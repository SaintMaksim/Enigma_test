import { useState, useEffect } from 'react'
import './App.css'
import { api } from './api'

// Моковые данные
const mockMails = [
  {
    id: 1,
    date: '2026-02-25',
    full_name: 'Иванов Иван Иванович',
    sender: 'ООО "ГазПрибор"',
    tel_number: '+7 (999) 123-45-67',
    email: 'ivanov@gazpribor.ru',
    factory_nums: 'ГН-2024-001, ГН-2024-002',
    device_type: 'Газонализатор ГН-4',
    emotional_color: 'Негатив',
    question: 'Прибор показывает неверные данные после калибровки'
  },
  {
    id: 2,
    date: '2026-02-24',
    full_name: 'Петрова Анна Сергеевна',
    sender: 'АО "ЭнергоСеть"',
    tel_number: '+7 (999) 765-43-21',
    email: 'petrova@energoset.ru',
    factory_nums: 'ГН-2023-089',
    device_type: 'Газонализатор ГН-3',
    emotional_color: 'Нейтрально',
    question: 'Требуется консультация по настройке оборудования'
  },
  {
    id: 3,
    date: '2026-02-23',
    full_name: 'Сидоров Петр Александрович',
    sender: 'ИП Сидоров П.А.',
    tel_number: '+7 (999) 111-22-33',
    email: 'sidorov@mail.ru',
    factory_nums: 'ГН-2024-015',
    device_type: 'Газонализатор ГН-4',
    emotional_color: 'Позитив',
    question: 'Благодарность за быстрое решение предыдущей проблемы'
  }
]

function App() {
  const [mails, setMails] = useState([])
  const [loading, setLoading] = useState(true)
  const [useMock, setUseMock] = useState(false)

  // Загружаем письма при первом рендере компонента
  useEffect(() => {
    loadMails()
  }, [])

  const loadMails = async () => {
    try {
      setLoading(true)
      const data = await api.getMails()
      setMails(data)
      setUseMock(false)
    } catch (err) {
      console.warn('Бэкенд недоступен, используем mock-данные:', err)
      setMails(mockMails)
      setUseMock(true)
    } finally {
      setLoading(false)
    }
  }

  const statusColors = {
    Позитив: '#48bb78',
    Нейтраль: '#4299e1',
    Негатив: '#f56565'
  }

  // Показываем индикатор загрузки
  if (loading) {
    return (
      <div className="app">
        <header className="header">
          <h1>Система обработки обращений</h1>
          <p>Загрузка данных...</p>
        </header>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Система обработки обращений</h1>
        <p>AI-агент для анализа писем технической поддержки</p>
      </header>

      {/* Таблица обращений */}
      <div className="table-container">
        <table className="tickets-table">
          <thead>
            <tr>
              <th >ID</th>
              <th>Дата</th>
              <th>Отправитель</th>
              <th>Предприятие</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Приборы</th>
              <th>Тип устройства</th>
              <th>Эмоциональный окрас письма</th>
              <th>Проблема</th>
            </tr>
          </thead>
          <tbody>
            {mails.map((mail) => (
              <tr key={mail.id}>
                <td style={{ color: '#000000', fontWeight: '600' }}>{mail.id}</td>
                <td>{mail.date}</td>
                <td>{mail.full_name}</td>
                <td>{mail.sender}</td>
                <td>{mail.tel_number}</td>
                <td>{mail.email}</td>
                <td>{mail.factory_nums}</td>
                <td>{mail.device_type}</td>
                <td>
                  <span 
                    className="category-badge" 
                    style={{ borderColor: statusColors[mail.emotional_color] }}
                  >
                    {mail.emotional_color}
                  </span>
                </td>
                <td>
                  <div className="body-preview">{mail.question}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stats">
        <div className="stat-item">
          <span className="stat-number">{mails.filter(m => m.emotional_color === 'Негатив').length}</span>
          <span className="stat-label">Негативных</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{mails.filter(m => m.emotional_color === 'Нейтраль').length}</span>
          <span className="stat-label">Нейтральных</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{mails.filter(m => m.emotional_color === 'Позитив').length}</span>
          <span className="stat-label">Позитивных</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{mails.length}</span>
          <span className="stat-label">Всего</span>
        </div>
      </div>
    </div>
  )
}

export default App