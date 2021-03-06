import apiUrl from '../apiConfig'
import axios from 'axios'

export const createStory = (story, user) => {
  return axios({
    url: apiUrl + '/stories/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      story: {
        title: story
      }
    }
  })
}

export const indexStory = (user) => {
  return axios({
    url: apiUrl + '/stories/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showStory = (storyId, user) => {
  return axios({
    url: apiUrl + '/stories/' + storyId,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const deleteStory = (storyId, user) => {
  return axios({
    url: apiUrl + '/stories/' + storyId,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateStory = (storyId, newStory, user) => {
  return axios({
    url: apiUrl + '/stories/' + storyId,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      story: {
        title: newStory
      }
    }
  })
}
