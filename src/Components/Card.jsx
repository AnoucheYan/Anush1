export default function Card({title, text, img, imgAlt}){
    return(
        <div className="card">
            <h2>{title}</h2>
            <img className="my_images" src={img} alt={imgAlt} />
            <p className="discription">{text}</p>
        </div>
    )
}