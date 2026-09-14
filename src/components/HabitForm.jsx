import { useState } from 'react'
import '../styles/HabitForm.css'

export default function HabitForm({ onAddHabit }) {
  const [habitName, setHabitName] = useState('')
  const [category, setCategory] = useState('Salud')

  const categories = ['Salud', 'Productividad', 'Bienestar', 'Educación', 'Ejercicio', 'Otro']

  const handleSubmit = (e) => {
    e.preventDefault()
    if (habitName.trim()) {
      onAddHabit(habitName, category)
      setHabitName('')
      setCategory('Salud')
    }
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <h2>Crear Nuevo Hábito</h2>
      
      <div className="form-group">
        <label htmlFor="habitName">Nombre del Hábito</label>
        <input
          id="habitName"
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="Ej: Beber 8 vasos de agua"
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select-field"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-primary">
        ➕ Añadir Hábito
      </button>
    </form>
  )
}
