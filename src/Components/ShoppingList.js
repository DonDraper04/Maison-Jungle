import { plantList } from '../datas/plantList'
import PlantItem from './PlantItem'
import { useState } from 'react';
import '../styles/ShoppingList.css'

function ShoppingList({ cart, updateCart }) {
    const [Category,UpdateCategory] = useState("");
    const filteredList = plantList.filter((plant)=> plant.category === Category);
	const categories = plantList.reduce(
		(acc, plant) =>
			acc.includes(plant.category) ? acc : acc.concat(plant.category),
		[]
	)

	function addToCart(name, price) {
		const currentPlantSaved = cart.find((plant) => plant.name === name)
		if (currentPlantSaved) {
			const cartFilteredCurrentPlant = cart.filter(
				(plant) => plant.name !== name
			)
			updateCart([
				...cartFilteredCurrentPlant,
				{ name, price, amount: currentPlantSaved.amount + 1 }
			])
		} else {
			updateCart([...cart, { name, price, amount: 1 }])
		}
	}

	return (
        
		<div className='lmj-shopping-list'>
			<select onChange={(event)=> UpdateCategory(event.target.value)}>
				{categories.map((cat) => (
					<option key={cat} value={cat}>{cat}</option>
				))}
			</select>
            <button onClick={()=>UpdateCategory("")}>Reinitialiser</button>
            
            {Category === "" ? (
			<ul className='lmj-plant-list'>
				{plantList.map(({ id, cover, name, water, light, price }) => (
					<div key={id}>
						<PlantItem
							cover={cover}
							name={name}
							water={water}
							light={light}
							price={price}
						/>
						<button onClick={() => addToCart(name, price)}>Ajouter</button>
					</div>
				))}
			</ul>) : (
                <ul className='lmj-plant-list'>
				{filteredList.map(({ id, cover, name, water, light, price }) => (
					<div key={id}>
						<PlantItem
							cover={cover}
							name={name}
							water={water}
							light={light}
							price={price}
						/>
						<button onClick={() => addToCart(name, price)}>Ajouter</button>
					</div>
				))}
			</ul>
            )}
		</div>
	)
}

export default ShoppingList