import { Link } from "react-router-dom"

export const NotFound = (props : {}) => {
  return (
    <div className="container">
      <h2 className="line1"><span className="a1">Error 404</span></h2>
      <h1 className="line2">Page not found!</h1>
      <h3 className="line4"><span className="a1">Click </span><Link to="/" className="a2">here</Link><span className="a1"> to go to home.</span></h3>
    </div>
  )
}
