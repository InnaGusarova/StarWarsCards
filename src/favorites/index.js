import React from "react";
import Icon from "../image";

class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: props.favorites
    }
  }

  componentDidUpdate() {
    const { favorites } = this.props
    if (favorites.length !== this.state.favorites.length) {
      this.setState({ favorites })
    }
  }

  sort = () => {
    const {favorites} = this.state
    const sortedFavorites = [...favorites.sort((a, b) => {
      if (b.name > a.name) {
        return -1;
      }
    })]
    this.setState({favorites: sortedFavorites})
  
  }

  render() {
    const {showPopUp, handleClick} = this.props
    const {favorites} = this.state
    const isActive = favorites.length > 0 ? 'favorites__button_active' : 'favorites__button_not-active'
    console.log(favorites)
    return (
      <section className="favorites">
        <button
          className={ ['button', isActive].join(' ') }
          onClick={this.sort}
        >
          Sort by name 
        </button>
        <div className="items favorites__items">
          {
            favorites?.length ?
            favorites.map((item, i) =>
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
                        isActive={true}
                      />
                    }
                </button>
                <ul className="favorites__list">
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
            : <p className="favorites__text">
                There are no cards in favorites, my young padawan.
              </p>
          }
          </div>
        </section>
    )
  }
  
}

export default Favorites;