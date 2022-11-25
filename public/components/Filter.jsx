import React, {useState, useEffect} from 'react'
import Data from './Data'

let averageSpeed = 0;
let averageTime = 0;

let boolSortFastestTime = false;
let boolSortSlowestTime = false;
let boolSortFastestTrap = false;
let boolSortSlowestTrap = false;

let boolFav = false;

let boolTurbo = false;
let boolSc = false;
let boolNa = false;

let boolI5 = false;
let boolI6 = false;
let boolV6 = false;
let boolV8 = false;
let boolV10 = false;

const Filter = () => {
  const[data, setData] = useState(Data);
  const[favorite, setFavorite] = useState([]);
  const[isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      sortFastestTime(Data);
      setIsLoaded(false);
    }
  });

  const filterInduction = (filterItem) => {
    if (filterItem === "Turbocharged") {
      boolTurbo = true;
      boolSc = false;
      boolNa = false;
    }
    if (filterItem === "Supercharged") {
      boolSc = true;
      boolTurbo = false;
      boolNa = false;
    }
    if (filterItem === "Naturally aspirated") {
      boolNa = true;
      boolTurbo = false;
      boolSc = false;
    }
    const result = Data.filter((curItem) => {
      if (boolFav) {
        if (favorite.includes(curItem.id)) {
          if (boolI5) {
            return curItem.filter === filterItem && curItem.engine === "I5";
          } else if (boolI6) {
            return curItem.filter === filterItem && curItem.engine === "I6";
          } else if (boolV6) {
            return curItem.filter === filterItem && curItem.engine === "V6";
          } else if (boolV8) {
            return curItem.filter === filterItem && curItem.engine === "V8";
          } else if (boolV10) {
            return curItem.filter === filterItem && curItem.engine === "V10";
          } else {
            return curItem.filter === filterItem;
          }
        }
      } else {
        if (boolI5) {
          return curItem.filter === filterItem && curItem.engine === "I5";
        } else if (boolI6) {
          return curItem.filter === filterItem && curItem.engine === "I6";
        } else if (boolV6) {
          return curItem.filter === filterItem && curItem.engine === "V6";
        } else if (boolV8) {
          return curItem.filter === filterItem && curItem.engine === "V8";
        } else if (boolV10) {
          return curItem.filter === filterItem && curItem.engine === "V10";
        } else {
          return curItem.filter === filterItem;
        }
      }
    });
    setData(result);
  }

  const filterEngine = (filterItem) => {
    if (filterItem === "I5") {
      boolI5 = true;
      boolI6 = false;
      boolV6 = false;
      boolV8 = false;
      boolV10 = false;
    }
    if (filterItem === "I6") {
      boolI5 = false;
      boolI6 = true;
      boolV6 = false;
      boolV8 = false;
      boolV10 = false;
    }
    if (filterItem === "V6") {
      boolI5 = false;
      boolI6 = false;
      boolV6 = true;
      boolV8 = false;
      boolV10 = false;
    }
    if (filterItem === "V8") {
      boolI5 = false;
      boolI6 = false;
      boolV6 = false;
      boolV8 = true;
      boolV10 = false;
    }
    if (filterItem === "V10") {
      boolI5 = false;
      boolI6 = false;
      boolV6 = false;
      boolV8 = false;
      boolV10 = true;
    }
    const result = Data.filter((curItem) => {
      if (boolFav) {
        if (favorite.includes(curItem.id)) {
          if (boolTurbo) {
            return curItem.engine === filterItem && curItem.filter === "Turbocharged";
          } else if (boolSc) {
            return curItem.engine === filterItem && curItem.filter === "Supercharged";
          } else if (boolNa) {
            return curItem.engine === filterItem && curItem.filter === "Naturally aspirated";
          } else {
            return curItem.engine === filterItem;
          }
        }
      } else {
        if (boolTurbo) {
          return curItem.engine === filterItem && curItem.filter === "Turbocharged";
        } else if (boolSc) {
          return curItem.engine === filterItem && curItem.filter === "Supercharged";
        } else if (boolNa) {
          return curItem.engine === filterItem && curItem.filter === "Naturally aspirated";
        } else {
          return curItem.engine === filterItem;
        }
      }
    });
    setData(result);
  }

  const addFavorite = (id) => {
    if (!favorite.includes(id)) {
      setFavorite(favorite.concat(id));
    }
  };

  const removeFavorite = (id) => {
    let index = favorite.indexOf(id);
    let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
    setFavorite(temp);
  };

  const filterFavorites = (filterItem) => {
    if (boolFav === false) {
      boolFav = true;
      let filterFavs = Data.filter(curItem => favorite.includes(curItem.id));
      let sumSpeed = 0;
      let sumTime = 0;
      let count = 0;
      for (let i = 0; filterFavs[i]; i++) {
          sumSpeed += parseFloat(filterFavs[i].speed);
          sumTime += parseFloat(filterFavs[i].time)
          count += 1;
      }
      averageSpeed = (sumSpeed / count).toFixed(1);;
      averageTime = (sumTime / count).toFixed(2);
      if (isNaN(averageSpeed)) {
        averageSpeed = 0;
      }
      if (isNaN(averageTime)) {
        averageTime = 0;
      }
      setData(filterFavs);
    } else {
      boolFav = false;
      resetAll();
    }
  }

  const sortFastestTime = (filterItem) => {
    let sortData = Data.sort((a, b) => parseFloat(a.time) > parseFloat(b.time) ? 1 : -1);
    setData(Array.from(sortData));
    boolSortFastestTime = true;
    boolSortSlowestTime = false;
    boolSortFastestTrap = false;
    boolSortSlowestTrap = false;
  };

  const sortSlowestTime = (filterItem) => {
    let sortData = Data.sort((a, b) => parseFloat(a.time) < parseFloat(b.time) ? 1 : -1);
    setData(Array.from(sortData));
    boolSortFastestTime = false;
    boolSortSlowestTime = true;
    boolSortFastestTrap = false;
    boolSortSlowestTrap = false;
  };

  const sortFastestTrap = (filterItem) => {
    let sortData = Data.sort((a, b) => parseFloat(a.speed) < parseFloat(b.speed) ? 1 : -1);
    setData(Array.from(sortData));
    boolSortFastestTime = false;
    boolSortSlowestTime = false;
    boolSortFastestTrap = true;
    boolSortSlowestTrap = false;
  };

  const sortSlowestTrap = (filterItem) => {
    let sortData = Data.sort((a, b) => parseFloat(a.speed) > parseFloat(b.speed) ? 1 : -1);
    setData(Array.from(sortData));
    boolSortFastestTime = false;
    boolSortSlowestTime = false;
    boolSortFastestTrap = false;
    boolSortSlowestTrap = true;
  };

  const resetAll = (filterItem) => {
    boolFav = false;
    boolTurbo = false;
    boolSc = false;
    boolNa = false;
    boolI5 = false;
    boolI6 = false;
    boolV6 = false;
    boolV8 = false;
    boolV10 = false;
    setData(Data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <br></br>
          <br></br>
          <h1 className="title">Drag racing 1/4 mile submissions</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>Sort</p>
          <br></br>
          { boolSortFastestTime ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => sortFastestTime(Data)}>Fastest time</button>
          ) : (
            <button className="btn" onClick={() => sortFastestTime(Data)}>Fastest time</button>
          )}
          { boolSortSlowestTime ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => sortSlowestTime(Data)}>Slowest time</button>
          ) : (
            <button className="btn" onClick={() => sortSlowestTime(Data)}>Slowest time</button>
          )}
          { boolSortFastestTrap ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => sortFastestTrap(Data)}>Fastest trap speed</button>
          ) : (
            <button className="btn" onClick={() => sortFastestTrap(Data)}>Fastest trap speed</button>
          )}
          { boolSortSlowestTrap ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => sortSlowestTrap(Data)}>Slowest trap speed</button>
          ) : (
            <button className="btn" onClick={() => sortSlowestTrap(Data)}>Slowest trap speed</button>
          )}
          <br></br>
          <p>Filters</p>
          <br></br>
          <button className="btn" onClick={() => resetAll(Data)}>Reset / show all</button>
          <br></br>
          { boolFav ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => filterFavorites(Data)}>Favorites</button>
          ) : (
            <button className="btn" onClick={() => filterFavorites(Data)}>Favorites</button>
          )}
          <p>Favorites average trap speed {averageSpeed}mph</p>
          <br></br>
          <p>Favorites average 1/4 time {averageTime}s</p>
          <br></br>
          <br></br>
          <p>Induction type</p>
          <br></br>
          { boolTurbo ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => filterInduction('Turbocharged')}>Turbocharged</button>
          ) : (
            <button className="btn" onClick={() => filterInduction('Turbocharged')}>Turbocharged</button>
          )}
          { boolSc ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => filterInduction('Supercharged')}>Supercharged</button>
          ) : (
            <button className="btn" onClick={() => filterInduction('Supercharged')}>Supercharged</button>
          )}
          { boolNa ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => filterInduction('Naturally aspirated')}>Naturally aspirated</button>
          ) : (
            <button className="btn" onClick={() => filterInduction('Naturally aspirated')}>Naturally aspirated</button>
          )}
          <br></br>
          <p>Engine configuration</p>
          <br></br>
          { boolI5 ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => filterEngine('I5')}>I5</button>
          ) : (
            <button className="btn" onClick={() => filterEngine('I5')}>I5</button>
          )}
          { boolI6 ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => filterEngine('I6')}>I6</button>
          ) : (
            <button className="btn" onClick={() => filterEngine('I6')}>I6</button>
          )}
          { boolV6 ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => filterEngine('V6')}>V6</button>
          ) : (
            <button className="btn" onClick={() => filterEngine('V6')}>V6</button>
          )}
          { boolV8 ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => filterEngine('V8')}>V8</button>
          ) : (
            <button className="btn" onClick={() => filterEngine('V8')}>V8</button>
          )}
          { boolV10 ? (
            <button style={{ color: "red", outline: "2px solid red", }} className="btn" onClick={() => filterEngine('V10')}>V10</button>
          ) : (
            <button className="btn" onClick={() => filterEngine('V10')}>V10</button>
          )}
        </div>
        <div className="col">
          <div className="cards">
            {data.map((values) => {
              const{id, title, filter, engine, time, speed, image} = values;
              const isFavorited = favorite.includes(id);
              return (
                <div className="card" key={id}>
                  <div className="card-header">
                    <h2 className="title-card">{title}</h2>
                    <h3 className="engine-induction">{filter}</h3>
                    <h3 className="engine-type">{engine}</h3>
                  </div>
                  <div className="card-body">
                    <img src={image} alt={title}/>
                    <h3 className="quarter-mile-time">1/4 mile time: {time}s</h3>
                  </div>
                  <div className="card-footer">
                    <h3 className="trap-speed">Trap speed: {speed}mph</h3>
                    {isFavorited ? (
                      <button style={{ "text-decoration": "underline", }} className="add-fav" onClick={() => removeFavorite(id)}>Remove from favorites</button>
                    ) : (
                      <button style={{ "text-decoration": "underline", }} className="add-fav" onClick={() => addFavorite(id)}>Add to favorites</button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter
