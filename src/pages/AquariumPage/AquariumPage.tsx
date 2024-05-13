import React from "react";
import ItemList from "../../components/ItemList";

const FishPage: React.FC = () => {
	return (
	  <div>
		<h1>aqua</h1>
		<ItemList collectionPath="category/fish/items" title="Fishes" />
	  </div>
	);
  };
  
  export default FishPage;
  