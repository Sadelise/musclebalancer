import React from 'react'

const MuscleForm = ({ onSubmit, handleChange, value }) => {
    return (
        <div>

            <form onSubmit={onSubmit}>
                <input
                    value={value}
                    onChange={handleChange}
                    name="newMuscle"
                />
                <button type="submit">tallenna</button>
            </form>

        </div>
    )
}

export default MuscleForm