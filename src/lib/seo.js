export function setPageMeta(title, description) {
  document.title = `${title.replace(/\s+/g, ' ').trim()} | Streetmasters`
  document.querySelector('meta[name="description"]').content = description.replace(/\s+/g, ' ').trim().slice(0, 160)
}
