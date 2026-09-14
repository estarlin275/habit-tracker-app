import { useState } from 'react'
import '../styles/HabitCard.css'

export default function HabitCard({ habit, onToggle, onDelete }) {
  const today = new Date().toDateString()
  const isCompletedToday = habit.completedDates.includes(today)
  
  const categoryEmojis = {
    'Salud': '💪',
    'Productividad': '⚡',
    'Bienestar': '🧘',
    'Educación': '📚',
    'Ejercicio': '🏃',
    'Otro': '⭐'
  }

  const emoji = categoryEmojis[habit.category] || '⭐'

  return (
    <div className={`habit-card ${isCompletedToday ? 'completed' : ''}`}>
      <div className="card-header">
        <div className="habit-title">
          <span className="category-emoji">{emoji}</span>
          <div>
            <h3>{habit.name}</h3>
            <span className="category-badge">{habit.category}</span>
          </div>
        </div>
        <button
          className="btn-delete"
          onClick={() => onDelete(habit.id)}
          title="Eliminar hábito"
        >
          ✕
        </button>
      </div>

      <div className="card-stats">
        <div className="stat">
          <span className="stat-label">Completados</span>
          <span className="stat-value">{habit.totalCompleted}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Racha</span>
          <span className="stat-value">🔥 {habit.streak}</span>
        </div>
      </div>

      <button
        className={`btn-toggle ${isCompletedToday ? 'active' : ''}`}
        onClick={() => onToggle(habit.id)}
      >
        {isCompletedToday ? '✅ Completado Hoy' : '⭕ Marcar Completado'}
      </button>
    </div>
  )
}
