import '../styles/Statistics.css'

export default function Statistics({ habits }) {
  const totalHabits = habits.length
  const completedToday = habits.filter(h => 
    h.completedDates.includes(new Date().toDateString())
  ).length
  const completionRate = totalHabits > 0 
    ? Math.round((completedToday / totalHabits) * 100)
    : 0
  const totalCompleted = habits.reduce((sum, h) => sum + h.totalCompleted, 0)

  return (
    <div className="statistics">
      <div className="stat-card">
        <div className="stat-number">{totalHabits}</div>
        <div className="stat-label">Hábitos Totales</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{completedToday}</div>
        <div className="stat-label">Completados Hoy</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{completionRate}%</div>
        <div className="stat-label">Tasa de Cumplimiento</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{totalCompleted}</div>
        <div className="stat-label">Total de Completados</div>
      </div>
    </div>
  )
}
