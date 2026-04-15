const Card = (props) => {
    return (
        <div className="container">
            <h2>{props.name}</h2>
            <p>Course: {props.course}</p>
        </div>
    )
}

export default Card
