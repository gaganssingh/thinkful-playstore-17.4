import React from "react";

export default function Home(props) {
	const price = Number(props.Price);
	const displayPrice = price === 0 ? <p>Free</p> : <p>${price}</p>;

	return (
		<div className="Home">
			<h2>{props.App}</h2>
			<p>
				{props.Category} - {props.Rating}/5 with {props.Reviews} reviews
			</p>
			{displayPrice}
			<p>Genre- {props.Genres}</p>
		</div>
	);
}
