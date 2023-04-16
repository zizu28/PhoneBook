const PersonForm = ({ handleOnNameChange, handleOnNumberChange, handleOnSubmit, newName, newNumber }) => {
    return(
        <div>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <div>
                        <h2>Add a new number</h2>
                    </div>
                    name: <input value={newName} onChange={handleOnNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleOnNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm
