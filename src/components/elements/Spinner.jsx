import { h } from 'preact'

const Spinner = () => {
  return (
    <div className='preloader-background active'>
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
  )
}

export default Spinner
