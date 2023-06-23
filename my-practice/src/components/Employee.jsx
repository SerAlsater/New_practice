import "./styles/Card.css"

export default function Employee(props) {
    return (
        <div className="card">
            <h1>Name: {props.name}</h1>
            <h2>Subdivision: {props.subdivision}</h2>
            <p>Patent: {props.patent}</p>
            <p>Experation: {props.time_patent}</p>
            <p>Mig_cart: {props.mig_cart}</p>
            <p>Experation: {props.time_mig_cart}</p>
        </div>
    )
}