/** Using regular experrions narrows search results when user inputs more characters. */
const FilterSearch = ({persons, searchField, handleDeletion}) => {
    try {
      const personsToShow = persons.filter(
        person => person.name.toLowerCase().search(
          new RegExp(searchField.toLowerCase())) !== -1
          )
    
        return (
          <table>
            <tbody>
              { personsToShow.map(
                person => <DisplayPerson key={person.id} person={person}
                handleDeletion={handleDeletion}/>) }
            </tbody>
          </table>
        )
    } catch (error) {
      return (<></>)
    }
   }

const DisplayPerson = ({ person, handleDeletion }) => {
    return (
        <tr>
            <th style={{textAlign:"left", fontWeight:"normal"}}>{person.name}</th>
            <th style={{textAlign:"left", fontWeight:"normal"}}>{person.number}</th>
            <th><DeleteUser id={person.id} handleDeletion={handleDeletion} /></th>
        </tr>
    )
}

const DeleteUser = ({ id, handleDeletion}) => {
  return (
  <button id={id} onClick={handleDeletion}>
    delete
  </button>
  )
}

 export default FilterSearch