import React from 'react'
import PropTypes from 'prop-types'

const Counter = ({ todoCount }) => (
    <div>
        <h3>Counter: { todoCount }</h3>
    </div>
)

Counter.propTypes = {
    todoCount: PropTypes.number.isRequired
}

export default Counter