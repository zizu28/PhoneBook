const Persons = ({ personsToFilter }) => {
    return(
        <div>
            <div>
                {personsToFilter.map((person, i) =>
                <p key={i}>
                    {person.name} {person.number}
                </p>
                )}
            </div>
        </div>
    )
}

export default Persons
