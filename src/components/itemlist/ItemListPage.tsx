import React from "react";
import ItemList from "../../components/itemlist/ItemList";
import { useParams } from "react-router-dom";
import './ItemsList.css'

const ItemsListPage: React.FC = () => {
	const { slug } = useParams<string>();
	return (
	  <div className="centered-container">
		<h1 className="shop-header">{slug} shop</h1>
		<ItemList collectionPath={`category/${slug}/items`} />
	  </div>
	);
  };
  
  export default ItemsListPage;
  