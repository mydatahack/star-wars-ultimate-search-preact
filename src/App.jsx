import { h, render, Component } from 'preact'
import Header from './components/Header'
import SearchFormContainer from './components/containers/SearchFormContainer'
import DivContainer from './components/DivContainer'

const App = () => {
  return (
    <div>
      <Header />
      <DivContainer className='offset-md-3 col-md-6'>
        <SearchFormContainer />
      </DivContainer>
    </div>
  )
}

export default App
