import { useState, useEffect } from 'react'
import HabitList from './components/HabitList'
import HabitForm from './components/HabitForm'
import Statistics from './components/Statistics'
import './styles/App.css'

export default function App() {
  const [habits, setHabits] = useState([])
  const [filter, setFilter] = useState('all')

  // Cargar hábitos del localStorage
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits')
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits))
    }
  }, [])

  // Guardar hábitos en localStorage
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const addHabit = (habitName, category) => {
    const newHabit = {
      id: Date.now(),
      name: habitName,
      category: category,
      createdAt: new Date().toISOString(),
      completedDates: [],
      streak: 0,
      totalCompleted: 0
    }
    setHabits([...habits, newHabit])
  }

  const toggleHabit = (habitId) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const today = new Date().toDateString()
        const isCompleted = habit.completedDates.includes(today)
        
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter(date => date !== today)
            : [...habit.completedDates, today],
          totalCompleted: isCompleted 
            ? habit.totalCompleted - 1 
            : habit.totalCompleted + 1
        }
      }
      return habit
    }))
  }

  const deleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId))
  }

  const filteredHabits = filter === 'all' 
    ? habits 
    : habits.filter(habit => habit.category === filter)

  const categories = [...new Set(habits.map(h => h.category))]

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Habit Tracker</h1>
        <p>Desarrolla mejores hábitos, un día a la vez</p>
      </header>

      <main className="app-main">
        <div className="container">
          <Statistics habits={filteredHabits} />
          
          <section className="form-section">
            <HabitForm onAddHabit={addHabit} />
          </section>

          <section className="filter-section">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos ({habits.length})
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </section>

          <section className="habits-section">
            <HabitList 
              habits={filteredHabits}
              onToggle={toggleHabit}
              onDelete={deleteHabit}
            />
          </section>
        </div>
      </main>
    </div>
  )
}
