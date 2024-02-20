import {useState} from 'react';
export default function Player({initialName, symbol,isActive, onChangeName}){
    const [isEditing, setisEditing]=useState(false);

    const [playerName,setplayerName] = useState(initialName);

    function Editing(){
        setisEditing((editingstate)=> !editingstate);
        
        if(isEditing){
        onChangeName(symbol,playerName);
        }

    }

    function Addplayername(event){
            setplayerName(event.target.value);
    }
    return( <li className={isActive ? 'active' : undefined}>
        <span className='player'>
        {isEditing?<input type="text" required value={playerName} onChange={Addplayername}/> : <span className="player-name">{playerName}</span>}
        <span className="player-symbol">{symbol}</span>
        </span>
        
        <button onClick={Editing}>{isEditing?"Save" : "Edit"}</button>
        </li>);
}