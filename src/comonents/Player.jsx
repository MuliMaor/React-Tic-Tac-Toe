import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onNameChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);

    function handleEditing() {
        setIsEditing(editing => !editing);
        if(isEditing){
            onNameChange(symbol, name);
        }
    }

    function handleChange(event) {
        setName(event.target.value);
    }

    return (<li className={isActive ? "active" : undefined}>
        <span className="player">
            {isEditing ? <input type="text" value={name} onChange={handleChange} required /> :
                <span className="player-name">{name}</span>}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>);
}
//NOTE!
//setIsEditing(editing => !editing) syntax is used because:
//setIsEditing(!isEditing) means you schedule the state update, with the current value
//but not immediately execute it!
//so for example
//setIsEditing(!isEditing); // schedule the state update with value = false
//setIsEditing(!isEditing); // schedule the state update with value = false
// will result in the same behaviour as just one of those statements, i.e. update the state to be = true, twice.

//in using
//setIsEditing(editing => !editing)
//or
//setIsEditing( (editing) => {return !editing;} )
//React guarantees that editing is equal to whatever the most current value of isEditing is, and therefore
//setIsEditing(editing => !editing); // schedule state update with value = whatever the state is at the time (here false)
//setIsEditing(editing => !editing); // schedule state update with value = whatever the state is at the time (here !false = true)
// will result in the second statement countering the first, i.e. update the state to be = true, then to be = false.