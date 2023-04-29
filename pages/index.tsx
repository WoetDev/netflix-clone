import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import NavBar from "@/components/NavBar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  console.log("session server side props");
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <div>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <NavBar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending now" data={movies} />
        <MovieList title="My list" data={favorites} />
      </div>
    </div>
  );
}
