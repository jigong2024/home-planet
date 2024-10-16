import Banner from "./_components/Banner";
import Input from "./_components/Input";
import MainDisplay from "./_components/MainDisplay";

export default function Home() {
  return (
    <>
      <Banner />
      <div className="container mx-auto p-4">
        <MainDisplay />
      </div>
    </>
  );
}
