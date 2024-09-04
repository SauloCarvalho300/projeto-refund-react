import { useEffect, useState } from 'react'
import './style.css'

import { Card } from '../../components/Card'

export interface ICard {
  category: string,
  name: string,
  value: string,
  time: string
}

export default function Home() {
  const [expenseCategory, setExpenseCategory] = useState<string>('Manutenção')
  const [expenseName, setExpenseName] = useState<string>('')
  const [expenseValue, setExpenseValue] = useState<number>(0)

  const [expenses, setExpenses] = useState<ICard[]>([])


  useEffect(() => {
    async function fetchData() { }
    fetchData()
  }, [])

  function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  function handleAddExpense() {
    if (!expenseCategory) return alert('Selecione a categoria.')
    if (expenseName === "") return alert('O nome não pode estar vazio.')

    const alredyExists = expenses.some(item => item.name === expenseName)

    if (alredyExists) return alert('Despesa já existente.')

    const newExpense = {
      category: expenseCategory,
      name: expenseName,
      value: formatCurrency(expenseValue),
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setExpenses((prevState) => [...prevState, newExpense])
  }

  function deleteExpense(expense: string) {
    const newExpenses = expenses.filter(item => item.name !== expense)

    setExpenses(newExpenses)
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numericValue = parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
    if (!isNaN(numericValue)) {
      setExpenseValue(numericValue);
    }
  }

  return (
    <div className='container'>
      <form action="">
        <h1>Solicitação de serviços</h1>
        <p>Informe os dados da despesa e o valor do produto para<br></br>realizar a solicitação</p>


        <select onChange={(event) => setExpenseCategory(event.target.value)}>
          <option value="Manutencao">Manutenção</option>
          <option value="Transporte">Transporte</option>
          <option value="Alimentacao">Alimentação</option>
        </select>

        <input
          type="text"
          placeholder='Nome da despesa'
          onChange={(event) => setExpenseName(event.target.value)} />

        <input

          type="text"
          placeholder='R$ 0,00'
          onChange={handleValueChange}
        />

        <button onClick={(e) => {
          handleAddExpense()
          e.preventDefault()
        }}>Adicionar despesa</button>

      </form>

      <div className='releases'>
        <header>
          <div>
            <strong>Minhas solicitações</strong><br /><br />
            <p>{expenses.length} Despesa{expenses.length !== 1 ? 's' : ''}</p>
          </div>

          <span>{formatCurrency(expenses.reduce((total, expense) => total + parseFloat(expense.value.replace('R$', '').replace('.', '').replace(',', '.')), 0))}</span>
        </header>

        {
          expenses.map((expense) => {
            return (
              <Card 
                key={expense.time} 
                category={expense.category} 
                name={expense.name} 
                value={expense.value} 
                time={expense.time} 
                deleteExpense={deleteExpense}
              />
            )
          })
        }
      </div>
    </div>
  )
}