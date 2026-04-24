import { parse } from 'yaml'
import contentRaw from './content.yml?raw'

const content = parse(contentRaw)

const fallbackHome = {
  serviceTypes: [],
  services: [],
  aboutCards: [],
}

export const homeContent = content?.home ?? fallbackHome

export const serviceTypes = homeContent.serviceTypes ?? []
export const services = homeContent.services ?? []
export const aboutCards = homeContent.aboutCards ?? []
