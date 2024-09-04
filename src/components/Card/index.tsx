import './styles.css'

interface CardProps {
  category: string,
  name: string,
  value: string,
  time: string
  deleteExpense(expense: string): void
}

export function Card({ time, name, value, category, deleteExpense }: CardProps) {
  return (
    <div className='card'>
      <span>{category}</span>
      <span>{value}</span>
      <span>{name}</span>
      <small>{time}</small>

      <button onClick={() => deleteExpense(name)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
        <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      </button>
    </div>

  )
}