const serviceCategories = [
  {
    id: 'exterior',
    title: 'Exterior Care',
    services: [
      {
        id: 'ceramic-coating',
        name: 'Ceramic Coating',
        cardDescription: 'Extreme glans en moleculaire bescherming tegen UV, oxidatie en chemische vervuiling.',
        offerDescription: 'Duurzame bescherming',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAtm2fVavx9cG5ys_2VtqbtX-jIs9v51ElBYY01dHR2kz7LhL4fOgVdxTyhApJc3w59CmfQ28iq7G9sfj04OluPgrOYtpXWqhZk--ClEjax44coMvuYZKa6xW7Q45DkkJ9KjDYQe4FNPJQ_ufGb_5OsnHgIBMcfd3bIpHRUeii84YCedNfJ7at4ijHdhL6ImrPgz9QOrHdtnM7UWSFzRAYwUJNzpn3ULz6jvBAqrqqmahs6IXOmmy1DGbhH-EcpjFno45tvyTqOtuU',
        icon: 'diamond',
        keywords: 'ceramic coating glans bescherming',
        showOnServicesPage: true,
      },
      {
        id: 'ppf',
        name: 'PPF (Folie)',
        cardDescription: 'Onzichtbare, zelfhelende folie die uw lak beschermt tegen steenslag en krassen.',
        offerDescription: 'Onzichtbare schild',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhSHdpASyPJUptoQg53mOGzluhW-91r7cupBl63yEoC0D3k6egngAw3cxwyehGyE37KcBGISO47a3vCMEkB78WOtTGrTk1KOxZFyi7P7HpSoT0TeD5IguhqxgNzBzTN-j4PA6gpEhUCjBKQRtyBtaKzrrA4r2IfqQ0fRcOMZH-Mm5VPWy9oBxp3gJZtxz_2lo-dmVKL41SjAnzoHmMmUyNX-PtcTtZq0XoR2sNvhvwHHtX2YIPBEe3nMneIHTv3yGuzqQ_XBPKE',
        icon: 'layers',
        keywords: 'ppf paint protection film folie onzichtbaar schild',
        showOnServicesPage: true,
      },
      {
        id: 'paint-correction',
        name: 'Paint Correction',
        cardDescription: 'Verwijder swirls en diepe krassen voor een spiegelglad resultaat en maximale reflectie.',
        offerDescription: 'Herstel van glans',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
        icon: 'palette',
        keywords: 'paint correction polijsten herstel glans krasjes',
        showOnServicesPage: true,
      },
      {
        id: 'general-detailing',
        name: 'General Detailing',
        cardDescription: 'Grondige reiniging van velgen, wielkasten en lakwerk voor een showroom resultaat.',
        offerDescription: 'Volledige exterieurreiniging',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD6qYo5W-Ndus4pay4YZZL8K_OoO0RoC1eXjZ79xpx6S7ZDJceDBIR1_CtNraUzc6pjt4KFtKylz2s1VBFm-jtCCFLKKmC57XnwbcPYgpV41lv-ZnPAwQKwQA7DQ32ZQvM7TK5AcKT7fgZ60mtA3egrjBO2OmYpMC5o9Fq55xuQoFH9NpukJReipWMfVnUAjKNYd0yjgbAEz9ZbADHi7KRGdJEue-AMxxUakCwkHqiAdogzruUUR47LPNLAcZTPQJqxJddgJOXIhiw',
        icon: 'local_car_wash',
        keywords: 'general detailing exterieur reiniging',
        showOnServicesPage: true,
      },
      {
        id: 'glass-coating',
        name: 'Glass Coating',
        cardDescription: 'Hydrofobe coating voor verbeterd zicht en langdurige bescherming.',
        offerDescription: 'Optimale regenasvoer',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhSHdpASyPJUptoQg53mOGzluhW-91r7cupBl63yEoC0D3k6egngAw3cxwyehGyE37KcBGISO47a3vCMEkB78WOtTGrTk1KOxZFyi7P7HpSoT0TeD5IguhqxgNzBzTN-j4PA6gpEhUCjBKQRtyBtaKzrrA4r2IfqQ0fRcOMZH-Mm5VPWy9oBxp3gJZtxz_2lo-dmVKL41SjAnzoHmMmUyNX-PtcTtZq0XoR2sNvhvwHHtX2YIPBEe3nMneIHTv3yGuzqQ_XBPKE',
        icon: 'visibility',
        keywords: 'glass coating ruiten coating zicht regen',
        showOnServicesPage: false,
      },
      {
        id: 'wheel-coating',
        name: 'Wheel Coating',
        cardDescription: 'Bescherming tegen remstof en vuil voor eenvoudiger onderhoud.',
        offerDescription: 'Makkelijker schoonmaken',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAtm2fVavx9cG5ys_2VtqbtX-jIs9v51ElBYY01dHR2kz7LhL4fOgVdxTyhApJc3w59CmfQ28iq7G9sfj04OluPgrOYtpXWqhZk--ClEjax44coMvuYZKa6xW7Q45DkkJ9KjDYQe4FNPJQ_ufGb_5OsnHgIBMcfd3bIpHRUeii84YCedNfJ7at4ijHdhL6ImrPgz9QOrHdtnM7UWSFzRAYwUJNzpn3ULz6jvBAqrqqmahs6IXOmmy1DGbhH-EcpjFno45tvyTqOtuU',
        icon: 'toys',
        keywords: 'wheel coating velgen coating remstof',
        showOnServicesPage: false,
      },
    ],
  },
  {
    id: 'interior',
    title: 'Interior Detailing',
    services: [
      {
        id: 'deep-cleaning',
        name: 'Deep Cleaning',
        cardDescription: 'Dieptereiniging van bekleding, panelen en details voor een frisse cabine.',
        offerDescription: 'Grondige reiniging',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
        icon: 'cleaning_services',
        keywords: 'deep cleaning interieur reiniging stomen',
        showOnServicesPage: false,
      },
      {
        id: 'leather-treatment',
        name: 'Leather Treatment',
        cardDescription: 'Voeding en bescherming van leder voor langdurige soepelheid.',
        offerDescription: 'Behoud van souplesse',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
        icon: 'texture',
        keywords: 'leather treatment leer behandeling voeden',
        showOnServicesPage: false,
      },
      {
        id: 'alcantara-care',
        name: 'Alcantara Care',
        cardDescription: 'Gespecialiseerde behandeling voor alcantara en delicate stoffen.',
        offerDescription: 'Specialistische zorg',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
        icon: 'dry_cleaning',
        keywords: 'alcantara care suede reiniging',
        showOnServicesPage: false,
      },
      {
        id: 'odor-removal',
        name: 'Odor Removal',
        cardDescription: 'Doeltreffende geurverwijdering voor een fris interieur.',
        offerDescription: 'Fris en reukloos',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I',
        icon: 'air',
        keywords: 'odor removal geur verwijderen ozon roken',
        showOnServicesPage: false,
      },
    ],
  },
  {
    id: 'visual',
    title: 'Visual Styling',
    services: [
      {
        id: 'full-wrap',
        name: 'Full Wrap',
        cardDescription: 'Complete kleurtransformatie met premium vinyl van 3M of Avery Dennison.',
        offerDescription: 'Volledige transformatie',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD6qYo5W-Ndus4pay4YZZL8K_OoO0RoC1eXjZ79xpx6S7ZDJceDBIR1_CtNraUzc6pjt4KFtKylz2s1VBFm-jtCCFLKKmC57XnwbcPYgpV41lv-ZnPAwQKwQA7DQ32ZQvM7TK5AcKT7fgZ60mtA3egrjBO2OmYpMC5o9Fq55xuQoFH9NpukJReipWMfVnUAjKNYd0yjgbAEz9ZbADHi7KRGdJEue-AMxxUakCwkHqiAdogzruUUR47LPNLAcZTPQJqxJddgJOXIhiw',
        icon: 'format_paint',
        keywords: 'full wrap kleur wrappen wrap',
        showOnServicesPage: true,
      },
      {
        id: 'accent-wraps',
        name: 'Accent Wraps',
        cardDescription: 'Chrome delete, dak wrapping of spiegelkappen voor subtiele upgrades.',
        offerDescription: 'Subtiele upgrades',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhSHdpASyPJUptoQg53mOGzluhW-91r7cupBl63yEoC0D3k6egngAw3cxwyehGyE37KcBGISO47a3vCMEkB78WOtTGrTk1KOxZFyi7P7HpSoT0TeD5IguhqxgNzBzTN-j4PA6gpEhUCjBKQRtyBtaKzrrA4r2IfqQ0fRcOMZH-Mm5VPWy9oBxp3gJZtxz_2lo-dmVKL41SjAnzoHmMmUyNX-PtcTtZq0XoR2sNvhvwHHtX2YIPBEe3nMneIHTv3yGuzqQ_XBPKE',
        icon: 'remove_circle_outline',
        keywords: 'accent wraps chrome delete ontchromen zwart',
        showOnServicesPage: true,
      },
      {
        id: 'aesthetic-upgrades',
        name: 'Aesthetic Upgrades',
        cardDescription: 'Van custom badges tot remklauwen lakken. De puntjes op de i voor uw unieke look.',
        offerDescription: 'Unieke details',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAtm2fVavx9cG5ys_2VtqbtX-jIs9v51ElBYY01dHR2kz7LhL4fOgVdxTyhApJc3w59CmfQ28iq7G9sfj04OluPgrOYtpXWqhZk--ClEjax44coMvuYZKa6xW7Q45DkkJ9KjDYQe4FNPJQ_ufGb_5OsnHgIBMcfd3bIpHRUeii84YCedNfJ7at4ijHdhL6ImrPgz9QOrHdtnM7UWSFzRAYwUJNzpn3ULz6jvBAqrqqmahs6IXOmmy1DGbhH-EcpjFno45tvyTqOtuU',
        icon: 'token',
        keywords: 'aesthetic upgrades custom badging emblemen logo',
        showOnServicesPage: true,
      },
      {
        id: 'tinting',
        name: 'Tinting',
        cardDescription: 'Ramentinting voor privacy en een strakke afwerking.',
        offerDescription: 'Privacy en stijl',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhSHdpASyPJUptoQg53mOGzluhW-91r7cupBl63yEoC0D3k6egngAw3cxwyehGyE37KcBGISO47a3vCMEkB78WOtTGrTk1KOxZFyi7P7HpSoT0TeD5IguhqxgNzBzTN-j4PA6gpEhUCjBKQRtyBtaKzrrA4r2IfqQ0fRcOMZH-Mm5VPWy9oBxp3gJZtxz_2lo-dmVKL41SjAnzoHmMmUyNX-PtcTtZq0XoR2sNvhvwHHtX2YIPBEe3nMneIHTv3yGuzqQ_XBPKE',
        icon: 'tonality',
        keywords: 'tinting ramen blinderen',
        showOnServicesPage: false,
      },
    ],
  },
]

const mapForOffer = (category) => ({
  id: category.id,
  title: category.title,
  services: category.services.map((service) => ({
    id: service.id,
    name: service.name,
    description: service.offerDescription,
    icon: service.icon,
    keywords: service.keywords,
  })),
})

const mapForCards = (categoryId) => {
  const category = serviceCategories.find((item) => item.id === categoryId)

  if (!category) {
    return []
  }

  return category.services
    .filter((service) => service.showOnServicesPage)
    .map((service) => ({
      title: service.name,
      description: service.cardDescription,
      image: service.image,
    }))
}

export const offerServiceCategories = serviceCategories.map(mapForOffer)

export const exteriorServices = mapForCards('exterior')
export const wrappingServices = mapForCards('visual')

export const interiorFeatures = [
  'Alcantara restauratie',
  'Dieptereiniging textiel',
  'Geurverwijdering',
  'Ventilatie reiniging',
]
