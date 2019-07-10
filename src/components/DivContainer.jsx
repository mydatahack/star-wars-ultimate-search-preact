import { h } from 'preact'

const DivContainer = (props) => {
  return(
    <div className="container">
      <div className="row">
        <div className={props.className}>
          {props.children}
        </div>
      </div>
    </div>

  )
}

export default DivContainer
