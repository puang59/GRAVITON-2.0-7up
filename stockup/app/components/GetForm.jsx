export default function GetForm({
    id,
    name,
    type,
    origin,
    popularity,
    availability
}) {
    return (
        <div className="text-white flex flex-col">
            <h1>Product Details</h1>
            <h2>Id : {id}</h2>
            <h2>Name: {name}</h2>
            <h2>Type: {type}</h2>
            <h2>Origin: {origin}</h2>
            <h2>Popularity Rank: {popularity}</h2>
            <h2>Availability: {availability}</h2>
            <h2>Quantity: {quantity}</h2>
        </div>
    );
}
