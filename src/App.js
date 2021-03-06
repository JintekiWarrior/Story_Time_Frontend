import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import HomePage from './components/HomePage/HomePage'
import MainContent from './components/MainContent/MainContent'
import ShowStory from './components/MainContent/ShowStory/ShowStory'
import UpdateStory from './components/MainContent/UpdateStory/UpdateStory'
import ShowChapter from './components/MainContent/ShowStory/ShowChapter/ShowChapter'
import UpdateChapter from './components/MainContent/ShowStory/UpdateChapter/UpdateChapter'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route exact path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/' user={user} render={() => (
            <HomePage user={user} />
          )}/>

          {/* App components */}
          <AuthenticatedRoute user={user} exact path='/content' render={() => (
            <MainContent user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} exact path='/content/:id' render={() => (
            <ShowStory user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} exact path='/content/:id/edit' render={() => (
            <UpdateStory user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} exact path='/chapter/:id' render={() => (
            <ShowChapter user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} exact path='/chapter/:id/edit' render={() => (
            <UpdateChapter user={user} msgAlert={this.msgAlert} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
