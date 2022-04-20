import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
const MENU = [
  {
    id: "m1",
    name: "Chicken Kebab",
    description: "Fresh Chicken and veggies",
    price: 6900,
  },
  {
    id: "m2",
    name: "Somun Chicken",
    description: "Big bread with veggies",
    price: 8900,
  },
  {
    id: "m3",
    name: "Chicken Rice Plate",
    description: "Chicken, rice and veggies",
    price: 9900,
  },
  {
    id: "m4",
    name: "Chicken Box",
    description: "Chicken, rice and potatos",
    price: 7900,
  },
];

const AvailableMeals = () => {
  const mealsList = MENU.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
