const localized = (nl, en) => ({ nl, en })

const getText = (value, locale) => {
  if (typeof value === 'string') {
    return value
  }

  return value?.[locale] ?? value?.nl ?? ''
}

const serviceCategories = [
  {
    id: 'exterior',
    title: localized('Exterior Care', 'Exterior Care'),
    services: [
      {
        id: 'ceramic-coating',
        name: localized('Ceramic Coating', 'Ceramic Coating'),
        cardDescription: localized(
          'Extreme glans en moleculaire bescherming tegen UV, oxidatie en chemische vervuiling.',
          'Extreme gloss and molecular protection against UV, oxidation and chemical contamination.'
        ),
        offerDescription: localized('Duurzame bescherming', 'Durable protection'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAtm2fVavx9cG5ys_2VtqbtX-jIs9v51ElBYY01dHR2kz7LhL4fOgVdxTyhApJc3w59CmfQ28iq7G9sfj04OluPgrOYtpXWqhZk--ClEjax44coMvuYZKa6xW7Q45DkkJ9KjDYQe4FNPJQ_ufGb_5OsnHgIBMcfd3bIpHRUeii84YCedNfJ7at4ijHdhL6ImrPgz9QOrHdtnM7UWSFzRAYwUJNzpn3ULz6jvBAqrqqmahs6IXOmmy1DGbhH-EcpjFno45tvyTqOtuU',
        icon: 'diamond',
        keywords: localized('ceramic coating glans bescherming', 'ceramic coating gloss protection'),
        showOnServicesPage: true,
        showOnHome: true,
      },
      {
        id: 'ppf',
        name: localized('PPF (Folie)', 'PPF (Film)'),
        cardDescription: localized(
          'Onzichtbare, zelfhelende folie die uw lak beschermt tegen steenslag en krassen.',
          'Invisible self-healing film that protects your paint from stone chips and scratches.'
        ),
        offerDescription: localized('Onzichtbare schild', 'Invisible shield'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhSHdpASyPJUptoQg53mOGzluhW-91r7cupBl63yEoC0D3k6egngAw3cxwyehGyE37KcBGISO47a3vCMEkB78WOtTGrTk1KOxZFyi7P7HpSoT0TeD5IguhqxgNzBzTN-j4PA6gpEhUCjBKQRtyBtaKzrrA4r2IfqQ0fRcOMZH-Mm5VPWy9oBxp3gJZtxz_2lo-dmVKL41SjAnzoHmMmUyNX-PtcTtZq0XoR2sNvhvwHHtX2YIPBEe3nMneIHTv3yGuzqQ_XBPKE',
        icon: 'layers',
        keywords: localized('ppf paint protection film folie onzichtbaar schild', 'ppf paint protection film invisible shield'),
        showOnServicesPage: true,
        showOnHome: false,
      },
      {
        id: 'paint-correction',
        name: localized('Paint Correction', 'Paint Correction'),
        cardDescription: localized(
          'Verwijder swirls en diepe krassen voor een spiegelglad resultaat en maximale reflectie.',
          'Remove swirls and deep scratches for a mirror-like finish and maximum reflection.'
        ),
        offerDescription: localized('Herstel van glans', 'Gloss restoration'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
        icon: 'palette',
        keywords: localized('paint correction polijsten herstel glans krasjes', 'paint correction polish restore gloss scratches'),
        showOnServicesPage: true,
        showOnHome: false,
      },
      {
        id: 'general-detailing',
        name: localized('General Detailing', 'General Detailing'),
        cardDescription: localized(
          'Grondige reiniging van velgen, wielkasten en lakwerk voor een showroom resultaat.',
          'Thorough cleaning of wheels, arches and paintwork for a showroom finish.'
        ),
        offerDescription: localized('Volledige exterieurreiniging', 'Complete exterior cleaning'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD6qYo5W-Ndus4pay4YZZL8K_OoO0RoC1eXjZ79xpx6S7ZDJceDBIR1_CtNraUzc6pjt4KFtKylz2s1VBFm-jtCCFLKKmC57XnwbcPYgpV41lv-ZnPAwQKwQA7DQ32ZQvM7TK5AcKT7fgZ60mtA3egrjBO2OmYpMC5o9Fq55xuQoFH9NpukJReipWMfVnUAjKNYd0yjgbAEz9ZbADHi7KRGdJEue-AMxxUakCwkHqiAdogzruUUR47LPNLAcZTPQJqxJddgJOXIhiw',
        icon: 'local_car_wash',
        keywords: localized('general detailing exterieur reiniging', 'general detailing exterior cleaning'),
        showOnServicesPage: true,
        showOnHome: false,
      },
      {
        id: 'glass-coating',
        name: localized('Glass Coating', 'Glass Coating'),
        cardDescription: localized('Hydrofobe coating voor verbeterd zicht en langdurige bescherming.', 'Hydrophobic coating for better visibility and long-term protection.'),
        offerDescription: localized('Optimale regenasvoer', 'Optimized rain runoff'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhSHdpASyPJUptoQg53mOGzluhW-91r7cupBl63yEoC0D3k6egngAw3cxwyehGyE37KcBGISO47a3vCMEkB78WOtTGrTk1KOxZFyi7P7HpSoT0TeD5IguhqxgNzBzTN-j4PA6gpEhUCjBKQRtyBtaKzrrA4r2IfqQ0fRcOMZH-Mm5VPWy9oBxp3gJZtxz_2lo-dmVKL41SjAnzoHmMmUyNX-PtcTtZq0XoR2sNvhvwHHtX2YIPBEe3nMneIHTv3yGuzqQ_XBPKE',
        icon: 'visibility',
        keywords: localized('glass coating ruiten coating zicht regen', 'glass coating windows visibility rain'),
        showOnServicesPage: false,
        showOnHome: false,
      },
      {
        id: 'wheel-coating',
        name: localized('Wheel Coating', 'Wheel Coating'),
        cardDescription: localized('Bescherming tegen remstof en vuil voor eenvoudiger onderhoud.', 'Protection against brake dust and dirt for easier maintenance.'),
        offerDescription: localized('Makkelijker schoonmaken', 'Easier cleaning'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAtm2fVavx9cG5ys_2VtqbtX-jIs9v51ElBYY01dHR2kz7LhL4fOgVdxTyhApJc3w59CmfQ28iq7G9sfj04OluPgrOYtpXWqhZk--ClEjax44coMvuYZKa6xW7Q45DkkJ9KjDYQe4FNPJQ_ufGb_5OsnHgIBMcfd3bIpHRUeii84YCedNfJ7at4ijHdhL6ImrPgz9QOrHdtnM7UWSFzRAYwUJNzpn3ULz6jvBAqrqqmahs6IXOmmy1DGbhH-EcpjFno45tvyTqOtuU',
        icon: 'toys',
        keywords: localized('wheel coating velgen coating remstof', 'wheel coating rims brake dust'),
        showOnServicesPage: false,
        showOnHome: false,
      },
    ],
  },
  {
    id: 'interior',
    title: localized('Interior Detailing', 'Interior Detailing'),
    services: [
      {
        id: 'deep-cleaning',
        name: localized('Deep Cleaning', 'Deep Cleaning'),
        cardDescription: localized('Dieptereiniging van bekleding, panelen en details voor een frisse cabine.', 'Deep cleaning of upholstery, panels and details for a fresh cabin.'),
        offerDescription: localized('Grondige reiniging', 'Deep cleaning'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
        icon: 'cleaning_services',
        keywords: localized('deep cleaning interieur reiniging stomen', 'deep cleaning interior steam cleaning'),
        showOnServicesPage: false,
        showOnHome: true,
      },
      {
        id: 'leather-treatment',
        name: localized('Leather Treatment', 'Leather Treatment'),
        cardDescription: localized('Voeding en bescherming van leder voor langdurige soepelheid.', 'Nourishment and protection for leather to keep it supple long-term.'),
        offerDescription: localized('Behoud van souplesse', 'Maintains suppleness'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
        icon: 'texture',
        keywords: localized('leather treatment leer behandeling voeden', 'leather treatment nourish protect'),
        showOnServicesPage: false,
        showOnHome: false,
      },
      {
        id: 'alcantara-care',
        name: localized('Alcantara Care', 'Alcantara Care'),
        cardDescription: localized('Gespecialiseerde behandeling voor alcantara en delicate stoffen.', 'Specialized treatment for alcantara and delicate fabrics.'),
        offerDescription: localized('Specialistische zorg', 'Specialized care'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
        icon: 'dry_cleaning',
        keywords: localized('alcantara care suede reiniging', 'alcantara care suede cleaning'),
        showOnServicesPage: false,
        showOnHome: false,
      },
      {
        id: 'odor-removal',
        name: localized('Odor Removal', 'Odor Removal'),
        cardDescription: localized('Doeltreffende geurverwijdering voor een fris interieur.', 'Effective odor removal for a fresh interior.'),
        offerDescription: localized('Fris en reukloos', 'Fresh and odor-free'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
        icon: 'air',
        keywords: localized('odor removal geur verwijderen ozon roken', 'odor removal ozone smoke'),
        showOnServicesPage: false,
        showOnHome: false,
      },
    ],
  },
  {
    id: 'visual',
    title: localized('Visual Styling', 'Visual Styling'),
    services: [
      {
        id: 'full-wrap',
        name: localized('Full Wrap', 'Full Wrap'),
        cardDescription: localized(
          'Complete kleurtransformatie met premium vinyl van 3M of Avery Dennison.',
          'Complete color transformation with premium vinyl from 3M or Avery Dennison.'
        ),
        offerDescription: localized('Volledige transformatie', 'Full transformation'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD6qYo5W-Ndus4pay4YZZL8K_OoO0RoC1eXjZ79xpx6S7ZDJceDBIR1_CtNraUzc6pjt4KFtKylz2s1VBFm-jtCCFLKKmC57XnwbcPYgpV41lv-ZnPAwQKwQA7DQ32ZQvM7TK5AcKT7fgZ60mtA3egrjBO2OmYpMC5o9Fq55xuQoFH9NpukJReipWMfVnUAjKNYd0yjgbAEz9ZbADHi7KRGdJEue-AMxxUakCwkHqiAdogzruUUR47LPNLAcZTPQJqxJddgJOXIhiw',
        icon: 'format_paint',
        keywords: localized('full wrap kleur wrappen wrap', 'full wrap color wrap'),
        showOnServicesPage: true,
        showOnHome: true,
      },
      {
        id: 'accent-wraps',
        name: localized('Accent Wraps', 'Accent Wraps'),
        cardDescription: localized(
          'Chrome delete, dak wrapping of spiegelkappen voor subtiele upgrades.',
          'Chrome delete, roof wrapping or mirror caps for subtle upgrades.'
        ),
        offerDescription: localized('Subtiele upgrades', 'Subtle upgrades'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhSHdpASyPJUptoQg53mOGzluhW-91r7cupBl63yEoC0D3k6egngAw3cxwyehGyE37KcBGISO47a3vCMEkB78WOtTGrTk1KOxZFyi7P7HpSoT0TeD5IguhqxgNzBzTN-j4PA6gpEhUCjBKQRtyBtaKzrrA4r2IfqQ0fRcOMZH-Mm5VPWy9oBxp3gJZtxz_2lo-dmVKL41SjAnzoHmMmUyNX-PtcTtZq0XoR2sNvhvwHHtX2YIPBEe3nMneIHTv3yGuzqQ_XBPKE',
        icon: 'remove_circle_outline',
        keywords: localized('accent wraps chrome delete ontchromen zwart', 'accent wraps chrome delete black trim'),
        showOnServicesPage: true,
        showOnHome: false,
      },
      {
        id: 'aesthetic-upgrades',
        name: localized('Aesthetic Upgrades', 'Aesthetic Upgrades'),
        cardDescription: localized(
          'Van custom badges tot remklauwen lakken. De puntjes op de i voor uw unieke look.',
          'From custom badges to painted brake calipers. The finishing touches for your unique look.'
        ),
        offerDescription: localized('Unieke details', 'Unique details'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAtm2fVavx9cG5ys_2VtqbtX-jIs9v51ElBYY01dHR2kz7LhL4fOgVdxTyhApJc3w59CmfQ28iq7G9sfj04OluPgrOYtpXWqhZk--ClEjax44coMvuYZKa6xW7Q45DkkJ9KjDYQe4FNPJQ_ufGb_5OsnHgIBMcfd3bIpHRUeii84YCedNfJ7at4ijHdhL6ImrPgz9QOrHdtnM7UWSFzRAYwUJNzpn3ULz6jvBAqrqqmahs6IXOmmy1DGbhH-EcpjFno45tvyTqOtuU',
        icon: 'token',
        keywords: localized('aesthetic upgrades custom badging emblemen logo', 'aesthetic upgrades custom badging emblem logo'),
        showOnServicesPage: true,
        showOnHome: false,
      },
      {
        id: 'tinting',
        name: localized('Tinting', 'Tinting'),
        cardDescription: localized('Ramentinting voor privacy en een strakke afwerking.', 'Window tinting for privacy and a clean finish.'),
        offerDescription: localized('Privacy en stijl', 'Privacy and style'),
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhSHdpASyPJUptoQg53mOGzluhW-91r7cupBl63yEoC0D3k6egngAw3cxwyehGyE37KcBGISO47a3vCMEkB78WOtTGrTk1KOxZFyi7P7HpSoT0TeD5IguhqxgNzBzTN-j4PA6gpEhUCjBKQRtyBtaKzrrA4r2IfqQ0fRcOMZH-Mm5VPWy9oBxp3gJZtxz_2lo-dmVKL41SjAnzoHmMmUyNX-PtcTtZq0XoR2sNvhvwHHtX2YIPBEe3nMneIHTv3yGuzqQ_XBPKE',
        icon: 'tonality',
        keywords: localized('tinting ramen blinderen', 'tinting windows'),
        showOnServicesPage: false,
        showOnHome: false,
      },
    ],
  },
]

const allServices = serviceCategories.flatMap((category) => category.services)

const localizeCategory = (category, locale) => {
  if (!category) {
    return { id: '', title: '', services: [] }
  }

  return {
    id: category.id,
    title: getText(category.title, locale),
    services: category.services.map((service) => ({
    id: service.id,
    name: getText(service.name, locale),
    description: getText(service.offerDescription, locale),
    cardDescription: getText(service.cardDescription, locale),
    icon: service.icon,
    image: service.image,
    keywords: getText(service.keywords, locale),
    showOnServicesPage: service.showOnServicesPage,
    showOnHome: service.showOnHome,
  })),
  }
}

export const getOfferServiceCategories = (locale = 'nl') =>
  serviceCategories.map((category) => localizeCategory(category, locale)).map((category) => ({
    id: category.id,
    title: category.title,
    services: category.services.map((service) => ({
      id: service.id,
      name: service.name,
      description: service.description,
      icon: service.icon,
      keywords: service.keywords,
    })),
  }))

const servicesForCards = (categoryId, locale) => {
  const category = localizeCategory(serviceCategories.find((item) => item.id === categoryId), locale)

  return category.services
    .filter((service) => service.showOnServicesPage)
    .map((service) => ({
      title: service.name,
      description: service.cardDescription,
      image: service.image,
    }))
}

export const getExteriorServices = (locale = 'nl') => servicesForCards('exterior', locale)
export const getWrappingServices = (locale = 'nl') => servicesForCards('visual', locale)

export const getInteriorFeatures = (locale = 'nl') =>
  localizeCategory(serviceCategories.find((category) => category.id === 'interior'), locale).services.map((service) => service.name)

export const getHomeServiceTypes = (locale = 'nl') =>
  serviceCategories
    .map((category) => localizeCategory(category, locale))
    .flatMap((category) => category.services.map((service) => service.name))

export const getHomeServices = (locale = 'nl') =>
  allServices
    .filter((service) => service.showOnHome)
    .map((service) => ({
      id: service.id,
      title: getText(service.name, locale),
      description: getText(service.cardDescription, locale),
      image: service.image,
    }))

const serviceMockImages = {
  'ceramic-coating':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAtm2fVavx9cG5ys_2VtqbtX-jIs9v51ElBYY01dHR2kz7LhL4fOgVdxTyhApJc3w59CmfQ28iq7G9sfj04OluPgrOYtpXWqhZk--ClEjax44coMvuYZKa6xW7Q45DkkJ9KjDYQe4FNPJQ_ufGb_5OsnHgIBMcfd3bIpHRUeii84YCedNfJ7at4ijHdhL6ImrPgz9QOrHdtnM7UWSFzRAYwUJNzpn3ULz6jvBAqrqqmahs6IXOmmy1DGbhH-EcpjFno45tvyTqOtuU',
  ppf: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhSHdpASyPJUptoQg53mOGzluhW-91r7cupBl63yEoC0D3k6egngAw3cxwyehGyE37KcBGISO47a3vCMEkB78WOtTGrTk1KOxZFyi7P7HpSoT0TeD5IguhqxgNzBzTN-j4PA6gpEhUCjBKQRtyBtaKzrrA4r2IfqQ0fRcOMZH-Mm5VPWy9oBxp3gJZtxz_2lo-dmVKL41SjAnzoHmMmUyNX-PtcTtZq0XoR2sNvhvwHHtX2YIPBEe3nMneIHTv3yGuzqQ_XBPKE',
  'paint-correction': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
  'general-detailing':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAtm2fVavx9cG5ys_2VtqbtX-jIs9v51ElBYY01dHR2kz7LhL4fOgVdxTyhApJc3w59CmfQ28iq7G9sfj04OluPgrOYtpXWqhZk--ClEjax44coMvuYZKa6xW7Q45DkkJ9KjDYQe4FNPJQ_ufGb_5OsnHgIBMcfd3bIpHRUeii84YCedNfJ7at4ijHdhL6ImrPgz9QOrHdtnM7UWSFzRAYwUJNzpn3ULz6jvBAqrqqmahs6IXOmmy1DGbhH-EcpjFno45tvyTqOtuU',
  'glass-coating': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhSHdpASyPJUptoQg53mOGzluhW-91r7cupBl63yEoC0D3k6egngAw3cxwyehGyE37KcBGISO47a3vCMEkB78WOtTGrTk1KOxZFyi7P7HpSoT0TeD5IguhqxgNzBzTN-j4PA6gpEhUCjBKQRtyBtaKzrrA4r2IfqQ0fRcOMZH-Mm5VPWy9oBxp3gJZtxz_2lo-dmVKL41SjAnzoHmMmUyNX-PtcTtZq0XoR2sNvhvwHHtX2YIPBEe3nMneIHTv3yGuzqQ_XBPKE',
  'wheel-coating':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAtm2fVavx9cG5ys_2VtqbtX-jIs9v51ElBYY01dHR2kz7LhL4fOgVdxTyhApJc3w59CmfQ28iq7G9sfj04OluPgrOYtpXWqhZk--ClEjax44coMvuYZKa6xW7Q45DkkJ9KjDYQe4FNPJQ_ufGb_5OsnHgIBMcfd3bIpHRUeii84YCedNfJ7at4ijHdhL6ImrPgz9QOrHdtnM7UWSFzRAYwUJNzpn3ULz6jvBAqrqqmahs6IXOmmy1DGbhH-EcpjFno45tvyTqOtuU',
  'deep-cleaning': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
  'leather-treatment': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
  'alcantara-care': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
  'odor-removal': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
  'full-wrap': 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6qYo5W-Ndus4pay4YZZL8K_OoO0RoC1eXjZ79xpx6S7ZDJceDBIR1_CtNraUzc6pjt4KFtKylz2s1VBFm-jtCCFLKKmC57XnwbcPYgpV41lv-ZnPAwQKwQA7DQ32ZQvM7TK5AcKT7fgZ60mtA3egrjBO2OmYpMC5o9Fq55xuQoFH9NpukJReipWMfVnUAjKNYd0yjgbAEz9ZbADHi7KRGdJEue-AMxxUakCwkHqiAdogzruUUR47LPNLAcZTPQJqxJddgJOXIhiw',
  'accent-wraps': 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6qYo5W-Ndus4pay4YZZL8K_OoO0RoC1eXjZ79xpx6S7ZDJceDBIR1_CtNraUzc6pjt4KFtKylz2s1VBFm-jtCCFLKKmC57XnwbcPYgpV41lv-ZnPAwQKwQA7DQ32ZQvM7TK5AcKT7fgZ60mtA3egrjBO2OmYpMC5o9Fq55xuQoFH9NpukJReipWMfVnUAjKNYd0yjgbAEz9ZbADHi7KRGdJEue-AMxxUakCwkHqiAdogzruUUR47LPNLAcZTPQJqxJddgJOXIhiw',
  'aesthetic-upgrades': 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6qYo5W-Ndus4pay4YZZL8K_OoO0RoC1eXjZ79xpx6S7ZDJceDBIR1_CtNraUzc6pjt4KFtKylz2s1VBFm-jtCCFLKKmC57XnwbcPYgpV41lv-ZnPAwQKwQA7DQ32ZQvM7TK5AcKT7fgZ60mtA3egrjBO2OmYpMC5o9Fq55xuQoFH9NpukJReipWMfVnUAjKNYd0yjgbAEz9ZbADHi7KRGdJEue-AMxxUakCwkHqiAdogzruUUR47LPNLAcZTPQJqxJddgJOXIhiw',
  tinting: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhSHdpASyPJUptoQg53mOGzluhW-91r7cupBl63yEoC0D3k6egngAw3cxwyehGyE37KcBGISO47a3vCMEkB78WOtTGrTk1KOxZFyi7P7HpSoT0TeD5IguhqxgNzBzTN-j4PA6gpEhUCjBKQRtyBtaKzrrA4r2IfqQ0fRcOMZH-Mm5VPWy9oBxp3gJZtxz_2lo-dmVKL41SjAnzoHmMmUyNX-PtcTtZq0XoR2sNvhvwHHtX2YIPBEe3nMneIHTv3yGuzqQ_XBPKE',
}

export const getAllServicesWithMockImages = (locale = 'nl') =>
  allServices.map((service) => ({
    id: service.id,
    title: getText(service.name, locale),
    description: getText(service.cardDescription, locale),
    image: serviceMockImages[service.id] ?? service.image,
  }))
