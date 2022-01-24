import React from 'react';
import callApi from '../api';
import Favorites from '../favorites';
import PopUp from '../popUp';
import ItemsList from '../itemsList';
import Loader from '../loader';

class ListOfPeople extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: null,
      favorites: [],
      showFavourites: false,
      showItemList: true,
      popUp: false,
      profile: null,
      loading: false,
    }
  }

  componentDidMount() {
    this.setState({ loader: true })
    callApi(`https://swapi.dev/api/people/?page=1`)
      .then((res) => this.setState({items: res, loader: false}))
      .catch(err => console.log(err));
  }

  handleClick = (item) => {
    const { favorites } = this.state
    if (favorites) {
      const newFav = favorites.find(duble => duble.name === item.name)
      if (!newFav) {
        this.setState({favorites: [...favorites, item]})
      }
      if (newFav) {
        console.log('delete', favorites)
        const deleteFav = favorites.filter(duble => duble.name !== item.name)
        this.setState({favorites: [...deleteFav]})
      }
    } 
  }
  
  nextPage = () => {
    const { items} = this.state
    if (items.next) {
      callApi(items.next)
        .then((res) => this.setState({items: res}))
        .catch(err => console.log(err))
    } 
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  prevPage = () => {
    const { items} = this.state
    if (items.previous) {
      callApi(items.previous)
      .then((res) => this.setState({items: res}))
      .catch(err => console.log(err))
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  showPopUp = (item) => {
    this.setState({popUp: true, profile: item})
  }

  delPopUp = () => {
    this.setState({popUp: false})
  }

  toggleFav = () => {
    this.setState({showFavourites: !this.state.showFavourites, showItemList: !this.state.showItemList })
  }

  render() {
    const { items, showItemList, favorites, popUp, profile,loader } = this.state
    const isOpen = popUp ? "pop-up_open" : "pop-up_not-open"
    return (
      loader ? 
        <Loader/> :
          <main className="page">
              <nav className="menu page__menu">
                <button
                  className="menu__button button"
                  onClick={this.toggleFav}
                >
                  List
                </button>
                <button
                  className="menu__button button"
                  onClick={this.toggleFav}
                >
                  Favourites
                </button>
              </nav>
            <section
              className={['page__pop-up', isOpen].join(' ')}
            >
              {
                popUp?
                  <PopUp
                    profile={profile}
                    delPopUp={this.delPopUp}
                  >
                  </PopUp> : null
              }
            </section>
              {
                showItemList ?
                  <ItemsList
                    items={items}
                    showPopUp={this.showPopUp}
                    handleClick={this.handleClick}
                    prevPage={this.prevPage}
                    nextPage={this.nextPage}
                    favorites={favorites}
                  /> :
                    <Favorites
                      favorites={favorites}
                      showPopUp={this.showPopUp}
                      handleClick={this.handleClick}
                    />
              }
          </main>
    )
  }
}

export default ListOfPeople ;