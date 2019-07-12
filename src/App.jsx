import { h, render, Component } from 'preact'
import Header from './components/Header'
import SearchFormContainer from './components/containers/SearchFormContainer'
import DivContainer from './components/DivContainer'
import ResultTableContainer from './components/containers/ResultTableContainer'

const App = () => {
  return (
    <div>
      <Header />
      <DivContainer className='offset-lg-3 col-lg-6'>
        <SearchFormContainer />
        <ResultTableContainer />
      </DivContainer>
    </div>
  )
}

export default App
