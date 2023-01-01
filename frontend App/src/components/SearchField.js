/** Takes in user input and updates related state. */
const SearchField = ({searchField, handleSearchChange}) => {

    return (
      <table>
        <tbody>
            <tr>
                <th style={{textAlign:"left", fontWeight:"normal"}}>search:
                </th>
                <th>
                    <input 
                    value={searchField}
                    onChange={handleSearchChange}
                    />
                </th>
            </tr>
        </tbody>
    </table>
    )
  }

export default SearchField