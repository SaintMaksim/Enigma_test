const API_BASE_URL = 'http://localhost:8000/mails';

export const api = {
  // Получить список всех писем
  async getMails() {
    try {
      const response = await fetch(`${API_BASE_URL}/list/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching mails:', error);
      throw error;
    }
  },

  // Создать новое письмо
  async createMail(mailData) {
    try {
      const response = await fetch(`${API_BASE_URL}/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating mail:', error);
      throw error;
    }
  }
};