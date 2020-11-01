export type StorageSite = 'local' | 'session'

function setItem (key: string, val: string, site: StorageSite = 'session') {
  if (site === 'session') {
    sessionStorage.setItem(key, val)
  } else {
    localStorage.setItem(key, val)
  }
}

function getItem (key: string, site: StorageSite = 'session'): string | null {
  if (site === 'session') {
    return sessionStorage.getItem(key)
  } else {
    return localStorage.getItem(key)
  }
}

function removeItem (key: string, site: StorageSite = 'session') {
  if (site === 'session') {
    sessionStorage.removeItem(key)
  } else {
    localStorage.removeItem(key)
  }
}

function clearStorage (site: StorageSite = 'session') {
  if (site === 'session') {
    sessionStorage.clear()
  } else {
    localStorage.clear()
  }
}

export default Object.freeze({
  setItem,
  getItem,
  removeItem,
  clearStorage
})