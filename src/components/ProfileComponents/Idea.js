const Idea = ({ idea }) => {
  return (
    <div>
        <h3>{idea.name}</h3>
        <p>{idea.description}</p>
        <h4>{idea.type}</h4>
    </div>
  )
}

export default Idea