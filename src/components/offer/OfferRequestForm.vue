<script setup>
import { computed, reactive, ref } from 'vue'
import AppButton from '../ui/AppButton.vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
})

const serviceSearch = ref('')
const selectedServices = ref([])
const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref('')
const recipientEmail = 'dries@streetmasters.be'

const form = reactive({
  brandModel: '',
  year: '',
  preferredDate: '',
  preferredTime: 'Ochtend (09:00 - 12:00)',
  name: '',
  email: '',
  message: '',
})

const filteredCategories = computed(() => {
  const query = serviceSearch.value.trim().toLowerCase()

  return props.categories
    .map((category) => {
      const services = category.services.filter((service) => {
        if (!query) {
          return true
        }

        const haystack = `${service.name} ${service.keywords}`.toLowerCase()
        return haystack.includes(query)
      })

      return {
        ...category,
        services,
      }
    })
    .filter((category) => category.services.length > 0 || !query)
})

const hasActiveSearch = computed(() => serviceSearch.value.trim().length > 0)
const tomorrowDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toISOString().split('T')[0]
})

const resetForm = () => {
  form.brandModel = ''
  form.year = ''
  form.preferredDate = ''
  form.preferredTime = 'Ochtend (09:00 - 12:00)'
  form.name = ''
  form.email = ''
  form.message = ''
  selectedServices.value = []
  serviceSearch.value = ''
}

const submitForm = async () => {
  submitError.value = ''
  submitSuccess.value = ''

  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

  if (!endpoint || endpoint.includes('your-form-id')) {
    submitError.value = 'Formspree endpoint ontbreekt. Stel VITE_FORMSPREE_ENDPOINT in.'
    return
  }

  if (!form.name || !form.email || !form.brandModel) {
    submitError.value = 'Vul minimaal naam, e-mail en merk/model in.'
    return
  }

  if (form.preferredDate) {
    const selectedDate = new Date(`${form.preferredDate}T00:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate <= today) {
      submitError.value = 'Kies een datum die in de toekomst ligt.'
      return
    }
  }

  isSubmitting.value = true

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: recipientEmail,
        name: form.name,
        email: form.email,
        _replyto: form.email,
        brand_model: form.brandModel,
        year: form.year,
        preferred_date: form.preferredDate,
        preferred_time: form.preferredTime,
        services: selectedServices.value,
        message: form.message,
        _subject: `Nieuwe offerte aanvraag voor ${recipientEmail} - ${form.brandModel}`,
      }),
    })

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}))
      const firstError = payload?.errors?.[0]?.message
      throw new Error(firstError || 'Kon formulier niet verzenden. Probeer opnieuw.')
    }

    submitSuccess.value = 'Dank je, je offerteaanvraag is verzonden. We nemen snel contact op.'
    resetForm()
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Er ging iets mis bij verzenden.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form class="space-y-6 md:space-y-10" @submit.prevent="submitForm">
    <section class="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface-container-low/85 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm md:rounded-[2rem] md:p-10">
      <div class="pointer-events-none absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-20 md:opacity-10">
        <span class="material-symbols-outlined text-7xl md:text-8xl">directions_car</span>
      </div>
      <div class="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
        <span class="font-headline text-2xl font-bold text-primary/30 md:text-3xl">01</span>
        <h2 class="font-headline text-lg font-bold tracking-tight uppercase md:text-xl">Voertuig Details</h2>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <div class="space-y-2">
          <label class="font-label text-xs tracking-widest text-on-surface-variant uppercase md:text-sm">Merk & Model</label>
          <input
            v-model="form.brandModel"
            class="w-full border-0 border-b border-outline-variant bg-transparent py-2 text-sm transition-colors placeholder:text-stone-700 focus:border-secondary focus:ring-0 md:py-2.5 md:text-base"
            name="brand_model"
            placeholder="bijv. Porsche 911 GT3"
            required
            type="text"
          />
        </div>
        <div class="space-y-2">
          <label class="font-label text-xs tracking-widest text-on-surface-variant uppercase md:text-sm">Bouwjaar</label>
          <input
            v-model="form.year"
            class="w-full border-0 border-b border-outline-variant bg-transparent py-2 text-sm transition-colors placeholder:text-stone-700 focus:border-secondary focus:ring-0 md:py-2.5 md:text-base"
            name="year"
            placeholder="bijv. 2023"
            type="text"
          />
        </div>
      </div>
    </section>

    <section class="relative flex max-h-[650px] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface-container-low/85 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm md:rounded-[2rem] md:p-10">
      <div class="pointer-events-none absolute top-0 right-0 p-8 opacity-5 md:opacity-10">
        <span class="material-symbols-outlined text-7xl md:text-8xl">auto_fix</span>
      </div>

      <div class="sticky top-0 z-10 bg-surface-container-low/95 pb-5 backdrop-blur-sm">
        <div class="mb-5 flex items-center gap-3 md:gap-4">
          <span class="font-headline text-2xl font-bold text-primary/30 md:text-3xl">02</span>
          <h2 class="font-headline text-lg font-bold tracking-tight uppercase md:text-xl">Service Selectie</h2>
        </div>

        <div class="relative w-full md:max-w-sm">
          <span class="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-lg text-on-surface-variant">search</span>
          <input
            id="service-search"
            v-model="serviceSearch"
            class="w-full rounded-xl border border-outline-variant bg-surface-container-highest/50 py-2 pr-4 pl-9 text-xs transition-all placeholder:text-stone-600 focus:border-primary focus:ring-1 focus:ring-primary md:text-sm"
            placeholder="Zoek een service..."
            type="text"
          />
        </div>
      </div>

      <div class="custom-scrollbar -mr-4 flex-1 overflow-y-auto pr-2 md:-mr-6 lg:-mr-8" style="max-height: 360px">
        <div class="space-y-8 pb-4">
          <div v-for="category in filteredCategories" :key="category.id">
            <h3 class="mb-4 flex items-center gap-2 font-headline text-xs tracking-[0.2em] text-primary uppercase md:text-sm">
              <span class="h-[1px] w-8 bg-primary/30"></span> {{ category.title }}
            </h3>

            <div class="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
              <label
                v-for="service in category.services"
                :key="service.id"
                class="cursor-pointer"
              >
                <input v-model="selectedServices" :value="service.name" class="peer hidden" name="services" type="checkbox" />
                <div
                  class="h-full rounded-xl border border-transparent bg-surface-container-highest p-3 transition-all active:scale-[0.98] peer-checked:border-primary peer-checked:bg-primary/10"
                  :class="hasActiveSearch ? 'border-primary/30 bg-primary/10' : ''"
                >
                  <span class="material-symbols-outlined mb-1.5 text-xl text-primary">{{ service.icon }}</span>
                  <p class="mb-1 font-headline text-xs font-bold uppercase md:text-sm">{{ service.name }}</p>
                  <p class="text-[11px] leading-tight text-on-surface-variant md:text-xs">{{ service.description }}</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <p class="mt-5 text-xs leading-relaxed text-on-surface-variant italic">Zoek via het veld hierboven of vermeld overige wensen bij stap 04.</p>
    </section>

    <section class="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface-container-low/85 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm md:rounded-[2rem] md:p-10">
      <div class="pointer-events-none absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-20 md:opacity-10">
        <span class="material-symbols-outlined text-7xl md:text-8xl">calendar_today</span>
      </div>
      <div class="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
        <span class="font-headline text-2xl font-bold text-primary/30 md:text-3xl">03</span>
        <h2 class="font-headline text-lg font-bold tracking-tight uppercase md:text-xl">Gewenste Periode</h2>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <div class="space-y-2">
          <label class="font-label text-xs tracking-widest text-on-surface-variant uppercase md:text-sm">Datum</label>
          <input
            v-model="form.preferredDate"
            :min="tomorrowDate"
            class="date-input w-full border-0 border-b border-outline-variant bg-transparent py-2 text-sm text-white transition-colors focus:border-secondary focus:ring-0 md:py-2.5 md:text-base"
            name="preferred_date"
            type="date"
          />
        </div>
        <div class="space-y-2">
          <label class="font-label text-xs tracking-widest text-on-surface-variant uppercase md:text-sm">Tijdstip</label>
          <select
            v-model="form.preferredTime"
            class="w-full appearance-none border-0 border-b border-outline-variant bg-transparent py-2 text-sm transition-colors focus:border-secondary focus:ring-0 md:py-2.5 md:text-base"
            name="preferred_time"
          >
            <option class="bg-surface text-on-surface">Ochtend (09:00 - 12:00)</option>
            <option class="bg-surface text-on-surface">Middag (13:00 - 17:00)</option>
          </select>
        </div>
      </div>
    </section>

    <section class="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface-container-low/85 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm md:rounded-[2rem] md:p-10">
      <div class="pointer-events-none absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-20 md:opacity-10">
        <span class="material-symbols-outlined text-7xl md:text-8xl">contact_mail</span>
      </div>
      <div class="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
        <span class="font-headline text-2xl font-bold text-primary/30 md:text-3xl">04</span>
        <h2 class="font-headline text-lg font-bold tracking-tight uppercase md:text-xl">Contact Informatie</h2>
      </div>
      <div class="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-2 md:gap-8">
        <div class="space-y-2">
          <label class="font-label text-xs tracking-widest text-on-surface-variant uppercase md:text-sm">Naam</label>
          <input
            v-model="form.name"
            class="w-full border-0 border-b border-outline-variant bg-transparent py-2 text-sm transition-colors placeholder:text-stone-700 focus:border-secondary focus:ring-0 md:py-2.5 md:text-base"
            name="name"
            placeholder="Uw volledige naam"
            required
            type="text"
          />
        </div>
        <div class="space-y-2">
          <label class="font-label text-xs tracking-widest text-on-surface-variant uppercase md:text-sm">E-mail</label>
          <input
            v-model="form.email"
            class="w-full border-0 border-b border-outline-variant bg-transparent py-2 text-sm transition-colors placeholder:text-stone-700 focus:border-secondary focus:ring-0 md:py-2.5 md:text-base"
            name="email"
            placeholder="naam@voorbeeld.nl"
            required
            type="email"
          />
        </div>
        <div class="space-y-2 md:col-span-2">
          <label class="font-label text-xs tracking-widest text-on-surface-variant uppercase md:text-sm">Bericht (Optioneel)</label>
          <textarea
            v-model="form.message"
            class="w-full resize-none border-0 border-b border-outline-variant bg-transparent py-2 text-sm transition-colors placeholder:text-stone-700 focus:border-secondary focus:ring-0 md:py-2.5 md:text-base"
            name="message"
            placeholder="Speciale wensen of opmerkingen..."
            rows="2"
          ></textarea>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <AppButton class="w-full md:w-auto md:px-12 md:text-lg hover:shadow-[0_0_30px_rgba(255,179,178,0.3)] active:scale-[0.97]" :disabled="isSubmitting" size="lg" type="submit">
          {{ isSubmitting ? 'Bezig met verzenden...' : 'Offerte aanvragen' }}
        </AppButton>

        <p v-if="submitSuccess" class="text-sm text-primary">{{ submitSuccess }}</p>
        <p v-if="submitError" class="text-sm text-error">{{ submitError }}</p>
      </div>
    </section>
  </form>
</template>

<style scoped>
.date-input::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
