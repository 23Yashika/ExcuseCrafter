import ExcuseGenerator from "../components/ExcuseGenerator"

const Home = () => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4 text-purple-700">🎭 ExcuseCraft</h1>
      <p className="text-lg text-gray-700 mb-6">Enter your situation and get a quick excuse... in your language!</p>
      <ExcuseGenerator />
    </div>
  )
}

export default Home
