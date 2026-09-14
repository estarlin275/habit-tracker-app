import HabitCard from './HabitCard'
import '../styles/HabitList.css'

export default function HabitList({ habits, onToggle, onDelete }) {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <h3>📭 No hay hábitos</h3>
        <p>Comienza creando tu primer hábito para empezar a trackear tu progreso</p>
      </div>
    )
  }

  return (
    <div className="habits-grid">
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
