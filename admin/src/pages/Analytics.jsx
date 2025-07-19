import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientAlbums } from "../redux/clientAlbumSlice";
import { Link, useLocation } from "react-router-dom";

export default function Analytics() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { albums, status } = useSelector((state) => state.clientAlbum);

  useEffect(() => {
    dispatch(fetchClientAlbums());
  }, [dispatch]);

  // Track page views on location change
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-[#B9975B]">Client Albums</h1>
      <p className="mb-6 font-semibold text-lg">
        Total Clients (Albums): <span className="text-[#B9975B]">{albums.length}</span>
      </p>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        // your table or cards here
        // ...
        <table className="w-full border">
          {/* table header and body */}
        </table>
      )}
    </section>
  );
}
