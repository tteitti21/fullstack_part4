const FormField = (props) => {

    return (
    <form onSubmit={props.addPerson}>
        <table>
            <tbody>
                <tr>
                    <th style={{textAlign:"left", fontWeight:"normal"}}>name:
                    </th>
                    <th>
                        <input 
                        value={props.newName}
                        onChange={props.handleNameChange}
                        />
                    </th>
                </tr>
                <tr>
                    <th style={{textAlign:"left", fontWeight:"normal"}}>number:
                    </th>
                    <th>
                        <input 
                        value={props.newNumber}
                        onChange={props.handleNumberChange}
                    /></th>
                </tr>
                <tr>
                    <th style={{textAlign:"left"}}>
                        <button type="submit">add</button>
                    </th>
                </tr>
            </tbody>
        </table>
    </form>
    )
  }

export default FormField