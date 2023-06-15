const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <h5>{props.major}</h5>
        <p>{props.name.first} is taking {props.numCredits} credits and is {props.fromWisconsin ? '' : 'not'} from Wisconsin.</p>
        <p>{props.interests.length} interests in total: </p>
        <ul>
            {
                props.interests.map((interest, index) => 
                    <li key={index}>
                        {interest}
                    </li>)
            }
        </ul>
    </div>
}

export default Student;