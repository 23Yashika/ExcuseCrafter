import ExcuseGenerator from "../components/ExcuseGenerator";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 py-8">
      <h1 className="text-5xl font-extrabold mb-4 text-stone-700">🎭 ExcuseCraft</h1>
      <p className="text-2xl text-stone-600 mb-8">
        Enter your situation and get a quick excuse... in your language!
      </p>
      <ExcuseGenerator />
    </div>
  );
};

export default Home;
