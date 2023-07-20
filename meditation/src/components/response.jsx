import "../response.css"

export default function Response({ data }) {
    const paragraphs = data.split('\n').map((paragraph, index) => (
        <h4 >{paragraph}</h4>
    ));
    return (
        <div className="response">
            {paragraphs}
        </div>

    )
}