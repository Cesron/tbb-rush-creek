import { HomeHeader } from "./_components/home-header";

export default function Home() {
  return (
    <>
      <HomeHeader />

      <div className="overflow-hidden">
        <div className="grid auto-rows-min @2xl:grid-cols-2 *:-ms-px *:-mt-px -m-px"></div>
      </div>
    </>
  );
}
