import React from "react";
import { typeImages, typeCosts } from "../constants";
import PropTypes from "prop-types";

const purchaseableItemStyle = {
	backgroundColor: "grey",
	position: "relative",
	width: "20%",
	paddingTop: "20%",
	margin: "1%",
	float: "left",
	backgroundSize: "100% 100%",
	backgroundRepeat: "no-repeat"
};

const PurchaseableItem = ({ typeId, purchase }) => {
	return (
		<div
			style={{ ...purchaseableItemStyle, ...typeImages[typeId] }}
			onClick={event => {
				event.preventDefault();
				purchase(typeId);
				event.stopPropagation();
			}}
			title={`Cost: ${typeCosts[typeId]}`}
		/>
	);
};

PurchaseableItem.propTypes = {
	typeId: PropTypes.number.isRequired,
	purchase: PropTypes.func.isRequired
};

export default PurchaseableItem;