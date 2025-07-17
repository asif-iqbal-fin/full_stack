import { useState, version } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }
  const neutralClick = () => {
    const updateNeutral = neutral +1
    setNeutral(updateNeutral)
  }
  const badClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={goodClick}>good</button>
      <button onClick={neutralClick}>neutral</button>
      <button onClick={badClick}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

  const calcAll = ({good,neutral,bad}) => {
    return good + neutral + bad
  }

  const calcAverage = ({good,neutral,bad}) => {
    return (good*1 + bad*-1 + neutral*0)/(good + neutral + bad)
  }

  const calcPositive = ({good,neutral,bad}) =>{
    return good/(good + neutral + bad)*100 + '%' 
  }

const Statistics = ({good,neutral,bad}) => {
  if((good+neutral+bad) > 0){
    return (
    <div>
      <table>
        <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{calcAll({good,neutral,bad})}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{calcAverage({good,neutral,bad})}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{calcPositive({good,neutral,bad})}</td>
        </tr>
        </tbody>
      </table>
      {/* <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
      <StatisticsLine text='all' value={calcAll({good,neutral,bad})} />
      <StatisticsLine text='average' value={calcAverage({good,neutral,bad})} />
      <StatisticsLine text='positive' value={calcPositive({good,neutral,bad})} /> */}
    </div>
  )
}
return(
  <div>
    No feedback given
  </div>
)
}

const StatisticsLine = (props) =>{
  return(
    <div>
      {props.text} {props.value}
    </div>
  )
}

export default App