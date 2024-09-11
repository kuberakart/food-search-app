import { useState } from "react";
import "./App.css";
import { Button, Card, Input } from "antd";
const { Meta } = Card;

// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/search.php?";

function App() {
  const [searchText, setSearchText] = useState("");
  const [foodItems, setFoodItems] = useState([]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    const searchUrl = `${BASE_URL}s=${searchText}`;
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFoodItems(data.meals);
      });
  };

  return (
    <div className="App">
      <div className="foodMenu">
        <div className="menuHeader">
          <h2>Food Search App</h2>
        </div>
        <div className="searchWrapper">
          <Input
            placeholder="Search food"
            size="large"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <Button type="primary" size="large" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <div className="searchResultWrapper">
          {foodItems.map((item) => {
            const { idMeal, strMeal, strMealThumb, strYoutube } = item;
            return (
              <Card
                key={idMeal}
                hoverable
                style={{ width: 240 }}
                cover={<img alt={strMeal} src={strMealThumb} />}
              >
                <Meta
                  title={strMeal}
                  description={
                    <a target="_blank" href={strYoutube}>
                      {strYoutube}
                    </a>
                  }
                />
              </Card>
            );
          })}
        </div>
        <div className="menuFooter">copyright&copy;codewithshekhar94</div>
      </div>
    </div>
  );
}

export default App;
