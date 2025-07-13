<template>
  <div class="max-w-3xl mx-auto min-h-screen">
    <h1>RambleyLikeTestView</h1>

    <div class="rounded p-2 mt-16 items-start flex gap-2 mx-auto">
      <div class="bg-secondary w-32 aspect-square rounded-xl flex-shrink-0">
        <img
          :src="`/facial/${currentAct}${isYapping && blinking ? '.yap' : ''}.png`"
          class="rounded-3xl jump mix-blend-screen"
          alt=""
          :title="currentAct"
          :key="currentAct"
        />
      </div>
      <div class="bg-opacity-25 relative bg-secondary min-h-32 w-full overflow-hidden rounded">
        <div class="px-2 py-1 text-lg font-bold">
          <p>
            {{ currentDialog }}
          </p>
        </div>
        <div
          :key="currentAct + (isYapping ? '.yap' : '')"
          class="bg-primary bg-opacity-50 py-1 absolute bottom-0 loading-full"
          :style="{ animationDuration: durationAnimation + 's' }"
        ></div>
      </div>
    </div>
    <div class="p-2 flex gap-2" :class="isDisabled && 'pointer-events-none bg-red-900 bg-opacity-25'">
      <textarea
        v-model="inputText"
        :disabled="isDisabled"
        class="px-2 py-1 resize-none w-full rounded bg-secondary bg-opacity-25"
        placeholder="Talk to me! :D"
      ></textarea>
      <button @click="goodGirl" :disabled="isDisabled" class="bg-secondary rounded px-3 py-1">
        <Icon icon="mingcute:send-fill" class="text-4xl" />
      </button>
    </div>
  </div>
</template>

<style scoped>
  .loading-full {
    animation-name: loading-full;
    animation-timing-function: linear;
    animation-duration: 1000s;
    width: 100%;
  }
  .jump {
    animation-name: jump;
    animation-timing-function: ease-in-out;
    animation-duration: 0.3s;
  }
  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    20% {
      transform: translateY(-10%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes loading-full {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
</style>

<script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import samjs from "sam-js";

  const sam = new samjs({
    speed: 62,
    pitch: 40,
    throat: 100,
    mouth: 100
  });

  const currentAct = ref("happy.idle");
  const currentDialog = ref("");

  const isDisabled = ref(false);

  const blinking = ref(true);

  onMounted(() => {
    setInterval(() => {
      blinking.value = !blinking.value;
    }, 100);
  });

  const enumEmotions = ["happy", "sad", "excited", "surprised", "suspicious"];
  const enumAnimations = ["idle", "hiding", "blush"];

  const durationAnimation = ref(0);
  const blinkFull = ref(false);
  const isYapping = ref(false);
  const inputText = ref("");

  const TOKEN_UNREALSPEECH = "nshz63lhaDQxNdcN5YHwLi1I8tBV1Nbk0F4Yb1c1xDF23H91CQIXs7";

  const convertSyllableToTime = (text) => {
    const syllables = text.split("").length;
    return syllables * 75;
  };

  // parse script with timing /word & time
  const goodGirl = async () => {
    console.log("Start");
    isDisabled.value = true;
    const requestAI = await AIRequest(inputText.value).catch((err) => false);
    if (!requestAI) {
      console.error("Failed to fetch");
      return;
    }
    console.log(requestAI);
    const scriptLines = requestAI.split("\n");
    let lastAct = "";
    let lastDuration = 0;
    for (let i = 0; i < scriptLines.length; i++) {
      blinkFull.value = false;
      const line = scriptLines[i];
      const isAction = /\[(\w+\.\w+)\=?([\d\.]+)?\]/i.test(line);
      console.log(isAction, line);
      if (isAction) {
        const [action, duration] = line.match(/\[(\w+\.\w+)\=?([\d\.]+)?\]/i).slice(1);
        if (duration) {
          lastDuration = parseFloat(duration);
        }
        if (!isValidAction(action)) {
          console.error("Invalid action", action);
          continue;
        }
        lastAct = action;
        currentAct.value = action;
        durationAnimation.value = lastDuration;
      } else {
        currentDialog.value = line;
        blinkFull.value = true;
        // if (!!true) return;

        if (line.length > 0) {
          await new Promise(async (resolve) => {
            const countSyllables = line.length ? convertSyllableToTime(line) : 1000;
            const wavBuffer = await fetch("https://api.v7.unrealspeech.com/stream", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                accept: "text/plain",
                Authorization: `Bearer ${TOKEN_UNREALSPEECH}`
              },
              body: JSON.stringify({
                Text: line,
                VoiceId: "Liv",
                Bitrate: "192k",
                Speed: "0.15",
                Pitch: "1.2",
                temperature: 0.7,
                Codec: "libmp3lame"
              })
            }).then((res) => res.arrayBuffer());

            try {
              // const sanitizedText = line.replace(/[^a-zA-Z0-9\s]/g, "");

              // const wavBuffer = sam.wav(sanitizedText);

              const wavBlob = new Blob([wavBuffer], { type: "audio/mp3" });
              const wavUrl = URL.createObjectURL(wavBlob);
              const audio = new Audio(wavUrl);
              // get audio duration
              audio.addEventListener("loadedmetadata", () => {
                durationAnimation.value = audio.duration;
              });
              isYapping.value = true;
              audio.play();
              audio.onended = () => {
                isYapping.value = false;
                setTimeout(resolve, 500);
              };
            } catch (e) {
              console.error(e);

              setTimeout(resolve, 500);
            }
            // setTimeout(() => {
            // setTimeout(resolve, 500);
            // }, countSyllables);
          });
          currentDialog.value = "";
        }
        durationAnimation.value = 1;
        await new Promise((resolve) => setTimeout(resolve, (lastDuration || 0) * 1000));
      }
    } //
    isDisabled.value = false;
  };

  async function AIRequest(prompt) {
    console.log("Requesting AI", prompt);
    const waiting = await fetch("http://localhost:3000/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: prompt
      })
    }).catch((err) => console.error(err));
    console.log(waiting);
    if (!waiting.ok) {
      isDisabled.value = false;
      throw new Error("Failed to fetch");
    }
    const response = await waiting.json();
    return response.message;
  }

  function isValidAction(action) {
    return enumEmotions.includes(action.split(".")[0]) && enumAnimations.includes(action.split(".")[1]);
  }
</script>
