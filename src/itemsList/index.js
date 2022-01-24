import React from "react";
import Icon from "../image";

class ItemsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
  }

  render() {
    const {items, showPopUp, handleClick, prevPage, nextPage, favorites} = this.props
    return (
        <section className="items">
          <div className="items__item-list">
            {
              items?.results.map ((item, i) =>
                <div 
                  className="item items__item"
                  key={i}
                >
                  <h2
                    className="item__header"
                    onClick={() => showPopUp(item)}
                  >
                    {item.name}
                  </h2>
                  <button 
                    className="item__button"
                    onClick={() => handleClick(item)}
                    >
                      {
                        <Icon
                          isActive={favorites.find(fav => fav.name === item.name)}
                        />
                      }
                  </button>
                  <ul className="items__list">
                    <li><strong>birth year: </strong>{item.birth_year}</li>
                    <li><strong>gender: </strong>{item.gender}</li>
                    <li><strong>height: </strong>{item.height}</li>
                    <li><strong>mass: </strong>{item.mass}</li>
                    <li><strong>hair color: </strong>{item.hair_color}</li>
                    <li><strong>skin color: </strong>{item.skin_color}</li>
                    <li><strong>eye color: </strong>{item.eye_color}</li>
                  </ul>
                </div>
              )
            }
          </div>
          <div
            className="items__buttons"
          >
          {
            items?.previous ?            
              <button
                className="items__button button"
                onClick={() => prevPage()}
              >
                Previous
              </button> : null
          }
          { 
            items?.next ?
              <button
                className="items__button button"
                onClick={() => nextPage()}
              >
                Next
              </button> : null
          }
          </div>
        </section>
    )
  }
  
}

export default ItemsList;