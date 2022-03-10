import Idea from "./Idea"

const Ideas = ({ ideas }) => {
  return (
    <>
        {ideas.map((idea) => (
            <Idea key={idea.id} idea={idea} />
        ))}
    </>
  )
}

export default Ideas