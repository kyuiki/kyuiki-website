<template>
  <LayoutComp class="w-full md:col-span-2">
    <template #default>
      <div class="flex gap-2">
        <div class="p-1">
          <Icon icon="mingcute:calendar-time-add-fill" class="text-white" style="font-size: 2.5em" />
        </div>
        <div class="w-full">
          <p class="font-bold text-lg">Current Availability</p>
          <p class="text-sm opacity-75">My upcoming activity</p>
        </div>
        <!-- Live -->
        <div class="text-right flex items-end">
          <button class="bg-background p-1 rounded" @click="theMonth--">
            <Icon icon="mdi:chevron-left" class="text-white" />
          </button>
          <div class="px-2 w-fit">
            <input
              type="number"
              name=""
              class="bg-transparent no-button w-24 text-right text-2xl font-bold"
              id=""
              v-model="theYear"
            />

            <p class="px-1 relative-top-1 font-bold rounded">
              {{
                [
                  "Month 0? Whats that? .w.",
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December"
                ][theMonth]
              }}
            </p>
          </div>
          <button class="bg-background p-1 rounded" @click="theMonth++">
            <Icon icon="mdi:chevron-right" class="text-white" />
          </button>
        </div>
      </div>
      <div class="mt-4 flex">
        <div class="w-full">
          <div class="flex w-full max-md:flex-col gap-4 max-md:items-center justify-center">
            <div class="w-full max-w-96 flex-shrink-0">
              <div class="">
                <div class="grid gap-1 grid-cols-7">
                  <div
                    v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
                    :key="day"
                    class="p-1 bg-background text-sm rounded"
                  >
                    {{ day }}
                  </div>
                  <template v-for="week in currentCalendar.dates" :key="week">
                    <div
                      v-for="day in week"
                      :key="day"
                      class="rounded p-1 aspect-square !bg-opacity-50 [&:nth-child(7n)]:bg-red-500 relative"
                      :class="`${!day ? 'opacity-50 ' : ' '} ${
                        day?.date === selectedDate.date &&
                        currentCalendar?.month === selectedDate.month &&
                        currentCalendar?.year === selectedDate.year
                          ? 'bg-primary'
                          : 'bg-background'
                      }`"
                    >
                      {{ day?.date }}
                      <div class="-bottom-1 min-h-2 absolute -left-1 flex" v-if="day?.events">
                        <span v-for="(event, i) in day.events" :key="event.name" class="bg-background p-1 rounded-full">
                          <Icon :icon="event.icon" class="text-white text-sm" />
                        </span>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="w-full flex max-w-96 flex-col gap-1 relative pb-20">
              <div v-for="event in currentEvents" :key="event.name" class="rounded bg-background bg-opacity-25 p-1">
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <div class="bg-background bg-opacity-50 p-2 rounded">
                      <Icon :icon="event.icon" class="text-white text-2xl" />
                    </div>
                    <div class="ml-2">
                      <h3>{{ event.name }}</h3>
                      <p class="text-xs opacity-75">{{ event.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="rounded bg-primary absolute bg-opacity-25 p-1 bottom-0">
                <div class="flex">
                  <div class="flex items-start">
                    <div class="px-1 py-1">
                      <Icon icon="mingcute:information-line" class="text-white text-2xl" />
                    </div>
                    <div class="ml-2">
                      <h3>Do you want to book me? :3</h3>
                      <p class="text-xs opacity-75">
                        Please contact my telegram to book me hehe :3 I'm available at weekend~
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </LayoutComp>
</template>

<style scoped>
  .no-button::-webkit-inner-spin-button,
  .no-button::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import LayoutComp from "./LayoutComp.vue";

  const rn = new Date();
  const theMonth = ref(rn.getMonth() + 1);
  const theYear = ref(rn.getFullYear());
  const selectedDate = ref({
    date: rn.getDate(),
    month: rn.getMonth() + 1,
    year: rn.getFullYear()
  });

  const events = ref([]);

  const currentCalendar = computed(() =>
    dateToEventMapper(generateCalendar(theYear.value, theMonth.value), events.value)
  );
  const currentEvents = computed(() => getThisMonthEvents(theYear.value, theMonth.value, events.value));

  onMounted(() => {
    // https://vanilla.kyuiki.com/at/events.json
    fetch("https://vanilla.kyuiki.com/at/events.json")
      .then((response) => response.json())
      .then((data) => {
        events.value = data;
      });
  });

  watch([theMonth, theYear], ([month, year]) => {
    if (month < 1) {
      theMonth.value = 12;
      theYear.value--;
    } else if (month > 12) {
      theMonth.value = 1;
      theYear.value++;
    }
  });

  function generateCalendar(year, month) {
    const date = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = date.getDay();
    let output = [];
    let dayCounter = 1;
    let week = Array(7).fill(null);
    for (let i = 0; i < 7; i++) {
      if (i >= (firstDay === 0 ? 6 : firstDay - 1)) {
        week[i] = { date: dayCounter, day: i };
        dayCounter++;
      }
    }
    output.push(week);
    while (dayCounter <= daysInMonth) {
      let week = [];
      for (let i = 0; i < 7; i++) {
        if (dayCounter <= daysInMonth) {
          week.push({ date: dayCounter, day: i });
          dayCounter++;
        } else week.push(null);
      }
      output.push(week);
    }
    return { month, year, dates: output };
  }

  function getThisMonthEvents(year, month, events) {
    return events.filter((event) => {
      if (Array.isArray(event.date)) {
        const [start, end] = event.date;
        return (
          (start.month === month && (!start.year || start.year === year)) ||
          (end.month === month && (!end.year || end.year === year)) ||
          (start.month < month && end.month > month)
        );
      } else {
        return event.date.month === month && (!event.date.year || event.date.year === year);
      }
    });
  }

  function dateToEventMapper(calendar, events) {
    const { month, year, dates } = calendar;
    events.forEach((event) => {
      if (Array.isArray(event.date)) {
        const [start, end] = event.date;
        if (
          (start.month === month && (!start.year || start.year === year)) ||
          (end.month === month && (!end.year || end.year === year)) ||
          (start.month < month && end.month > month)
        ) {
          let startDate = start.month === month ? start.date : 1;
          let endDate = end.month === month ? end.date : new Date(year, month, 0).getDate();
          for (let d = startDate; d <= endDate; d++) {
            const dayEntry = dates.flat().find((day) => day && day.date === d);
            if (dayEntry) {
              dayEntry.events = dayEntry.events || [];
              dayEntry.events.push(event);
            }
          }
        }
      } else if (event.date.month === month && (!event.date.year || event.date.year === year)) {
        const dayEntry = dates.flat().find((day) => day && day.date === event.date.date);
        if (dayEntry) {
          dayEntry.events = dayEntry.events || [];
          dayEntry.events.push(event);
        }
      }
    });
    return { month, year, dates };
  }
</script>
