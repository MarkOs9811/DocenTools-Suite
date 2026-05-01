import "../../css/Topbar.css";
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../slices/giftSlice";
import { RootState } from "../../slices/store";
import { Link } from "react-router-dom";

const Topbar = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.gift.searchQuery);

  return (
    <nav className="topbar">
      <Link to="/" className="logo">
        <img className="img-logo" src="/public/image/logo_ds.svg" />
        DocenTools <span className="fw-normal">Suite</span>
      </Link>

      <div className="search-container">
        <HiOutlineSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Buscar herramientas..."
          value={query}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      <div style={{ width: "150px" }}></div>
    </nav>
  );
};

export default Topbar;
