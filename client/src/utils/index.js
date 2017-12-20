export function formatArtists(artists) {
  if (!artists || !artists.length || artists.length === 0) {
    return ''
  }
  return artists.map(a => a.name).join(', ')
}

export function msToMinAndSec(millis) {
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}
