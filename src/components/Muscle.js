import React from 'react'

const Muscle = ({ muscle, filter, single, toggleChosen, deleteMuscle }) => {

    const label = muscle.chosen ? 'unchoose' : 'choose'
    const added = muscle.chosen ? 'Added to plan' : 'Not in plan'

    if (single) {
        return (
            <div onClick={filter(muscle.name)}>
                <p>{muscle.name}</p>
                <p>{added}</p>
            </div>
        )
    } else {
        return (
            <div>
                <span className="muscle" onClick={filter(muscle.name)}>{muscle.name}</span> <button onClick={toggleChosen(muscle.id)}>{label}</button> <button onClick={deleteMuscle(muscle)}>x</button>
            </div >
        )
    }
}

export default Muscle