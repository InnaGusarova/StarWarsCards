import React from "react"; 
import callApi from "../api";

class PopUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: null,
      species: null,
    }
  }
  componentDidMount() {
    const {profile} = this.props
    if (profile.species.length) {
      callApi(profile.species[0])
      .then((res) => this.setState({species: res}))
      .catch(err => console.log(err));
    }
    console.log(profile.species[0])
  }

  handleClick = () => {
    const {delPopUp} = this.props
    delPopUp()
  }

  render() {
    const {profile} = this.props
    console.log(this.state.species)
    return (
    <section
      className="pop-up"
    >
      <h1
        className="pop-up__header"
      >
        {profile.name}
      </h1>
      <button 
        className="pop-up__button"
        onClick={this.handleClick}
        >
          X
      </button>
      <ul className="pop-up__list">
        <li><strong>birth year: </strong>{profile.birth_year}</li>
        <li><strong>gender: </strong>{profile.gender}</li>
        <li><strong>height: </strong>{profile.height}</li>
        <li><strong>mass: </strong>{profile.mass}</li>
        <li><strong>hair color: </strong>{profile.hair_color}</li>
        <li><strong>skin color: </strong>{profile.skin_color}</li>
        <li><strong>eye color: </strong>{profile.eye_color}</li>
        <li>
          <strong>films: </strong>
          {profile.films.map((film, i) => <a className="list__sub-list" key={i} target="_blank" href={film}> {film} </a>)}
        </li>
        <li>
          <strong>homeworld: </strong>
          <a className="list__sub-list" target="_blank" href={profile.homeworld}> {profile.homeworld} </a>
        </li>
        <li>
          <strong>species: </strong>
          {profile.species.map((spec, i) => <a className="list__sub-list" key={i} target="_blank" href={spec}> {spec} </a>)}
        </li>
        <li><strong>vehicles: </strong>{profile.vehicles}</li>
      </ul>
    </section>
    )
  }
}
export default PopUp;