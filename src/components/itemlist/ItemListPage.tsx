import React from "react";
import ItemList from "../../components/itemlist/ItemList";
import { Link, useParams } from "react-router-dom";
import './ItemsList.css'

const ItemsListPage: React.FC = () => {
	const { slug } = useParams<string>();
	return (
	  <div className="centered-container">
		<Link to="/kategorier" className="back-button">
                    Back
                </Link>
		<h1 className="shop-header">{slug}</h1>
		<ItemList collectionPath={`category/${slug}/items`} />
	  </div>
	);
  };
  
  export default ItemsListPage;
  