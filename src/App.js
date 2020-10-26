import React from 'react';
import './index.css';
import MuscleForm from './components/MuscleForm'
import LoginForm from './components/LoginForm'
import Muscle from './components/Muscle'
import muscleService from './services/muscles'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      muscles: [],
      filterBy: '',
      newMuscle: '',
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    console.log("mounting..")
    muscleService.getAll()
      .then(muscles => {
        console.log("fulfilled", muscles)
        this.setState({ muscles: this.state.muscles.concat(muscles) })
      })
  }

  send = () => {
    return () => {
      this.setState((prevState) => ({
        counter: prevState.counter + 1
      }))
    }
  }

  addMuscle = (event) => {
    event.preventDefault()

    const muscleObject = {
      name: this.state.newMuscle
    }

    muscleService
      .create(muscleObject)
      .then(newMuscle => {
        this.setState({
          muscles: this.state.muscles.concat(newMuscle),
          newMuscle: ''
        })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filterBy: event.target.value })
  }

  setFilter = (value) => {
    return () => {
      this.setState({ filterBy: value })
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleChosen = (id) => {
    return () => {
      const url = `http://localhost:3001/muscles/${id}`
      const oldMuscle = this.state.muscles.find(muscle => muscle.id === id)
      const changedMuscle = { ...oldMuscle, chosen: !oldMuscle.chosen }

      muscleService
        .update(id, changedMuscle)
        .then(newMuscle => {
          this.setState({
            muscles: this.state.muscles.map(muscle => muscle.id !== id ? muscle : newMuscle)
          })
        })
        .catch(error => {
          this.setState({
            muscles: this.state.muscles.filter(muscle => muscle.id !== id),
            error: `Choosing failed, muscle ${oldMuscle.name} might not exist`
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000);
        })
    }
  }

  deleteMuscle = (oldMuscle) => {
    return () => {
      if (window.confirm(`Do you really want to delete ${oldMuscle.name}?`)) {
        muscleService.remove(oldMuscle.id).then(deletedMuscle => {
          this.setState({ muscles: this.state.muscles.filter(muscle => muscle.id !== oldMuscle.id) })
        })
          .catch(error => {
            this.setState({
              error: `Deleting ${oldMuscle.name} failed`
            })
            setTimeout(() => {
              this.setState({ error: null })
            }, 5000);
          })
      }
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'Väärä käyttäjätunnus tai salasana'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }


  render() {

    const loginForm = () => (
      <LoginForm
        onSubmit={this.login}
        nameValue={this.state.username}
        passwordValue={this.state.password}
        handleChange={this.handleFieldChange}
      />
    )

    const muscleForm = () => (
      <MuscleForm
        onSubmit={this.addMuscle}
        value={this.state.newMuscle}
        handleChange={this.handleFieldChange}
      />
    )

    const Notification = ({ message }) => {
      if (message === null) {
        return null
      }
      return (
        <div className="error">
          {message}
        </div>
      )
    }

    const musclesToShow = this.filterBy === '' ?
      this.state.muscles :
      this.state.muscles.filter(muscle => muscle.name.toLowerCase().indexOf(this.state.filterBy.toLowerCase()) > -1)

    const singleToShow = musclesToShow.length === 1


    return (
      <div>
        <Notification message={this.state.error} />
        <h1>Muscles</h1>
        {this.state.user === null ? loginForm() : <div>
          <p>{this.state.user.username} logged in</p>
          {muscleForm()}
        </div>}
        <input value={this.state.filterBy} onChange={this.handleFilterChange} />
        {musclesToShow.map(muscle =>
          <Muscle key={muscle.id}
            muscle={muscle}
            filter={this.setFilter}
            single={singleToShow}
            toggleChosen={this.toggleChosen}
            deleteMuscle={this.deleteMuscle}
          />)}
      </div>
    )
    // }
  }
}

export default App

