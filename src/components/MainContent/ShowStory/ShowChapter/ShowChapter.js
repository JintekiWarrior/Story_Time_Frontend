import React, { Fragment, useEffect, useState } from 'react'
import { showChapter, deleteChapter } from './../../../../api/chapter'
import { withRouter } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

const ShowChapter = (props) => {
  // state variable to hold the information
  const [chapter, setChapter] = useState({ name: '', body: '' })
  // state to check if item is deleted and go back to the previous page.
  const [chapterDeleted, setChapterDeleted] = useState(false)
  // axios request to show the single chapter
  const { id } = props.match.params
  useEffect(() => {
    showChapter(id, props.user)
      .then(res => {
        setChapter({ name: res.data.chapter.name, body: res.data.chapter.body })
      })
  }, [])
  const chapterDelete = (event) => {
    event.preventDefault()
    deleteChapter(id, props.user)
      .then(() => setChapterDeleted(true))
  }

  if (chapterDeleted) {
    props.history.goBack()
  }
  // render the content to the page
  console.log('chapter:', chapter)
  return (
    <Fragment>
      <h3>{chapter.name}</h3>
      <p>{chapter.body}</p>
      <Button onClick={chapterDelete}>Delete</Button>
    </Fragment>
  )
}

export default withRouter(ShowChapter)