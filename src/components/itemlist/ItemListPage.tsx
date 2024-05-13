import React from "react";
import ItemList from "../../components/itemlist/ItemList";
import { useParams } from "react-router-dom";

const ItemsListPage: React.FC = () => {
	const { slug } = useParams<string>();
	return (
	  <div>
		<h1>{slug} Page</h1>
		<ItemList collectionPath={`category/${slug}/items`} />
	  </div>
	);
  };
  
  export default ItemsListPage;
  