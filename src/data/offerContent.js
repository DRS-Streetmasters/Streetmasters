const localized = (nl, en) => ({ nl, en })

const offerBenefits = [
  {
    title: localized('Gecertificeerde Experts', 'Certified Experts'),
    description: localized('Officieel erkend installateur van premium coatings.', 'Officially certified installer of premium coatings.'),
  },
  {
    title: localized('Studio Condities', 'Studio Conditions'),
    description: localized('Stofvrije, geconditioneerde omgeving.', 'Dust-free, climate-controlled environment.'),
  },
  {
    title: localized('Lange Garantie', 'Extended Warranty'),
    description: localized('Op geselecteerde behandelingen volledige zekerheid.', 'Full peace of mind on selected treatments.'),
  },
]

const getText = (value, locale) => value?.[locale] ?? value?.nl ?? ''

export const getOfferBenefits = (locale = 'nl') =>
  offerBenefits.map((benefit) => ({
    title: getText(benefit.title, locale),
    description: getText(benefit.description, locale),
  }))

export { offerBenefits }
