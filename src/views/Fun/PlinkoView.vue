<template>
  <div class="min-h-screen max-w-3xl mx-auto px-4">
    <div ref="MatterCanvas" class="mx-auto aspect-square w-fit canvasMatter relative">
      <div
        v-for="pin in pinPoints"
        class="text-center rounded my-[2px] mx-[2px] w-8 h-8 absolute duration-75"
        :class="pin.hit ? 'bg-primary scale-125' : 'bg-secondary'"
        :style="{
          top: ((pin.position.y - 36 / 2) / 720) * 100 + '%',
          left: ((pin.position.x - 36 / 2) / 720) * 100 + '%'
        }"
      >
        <div class="py-1 bg-primary rounded bg-op" :style="{ '--tw-bg-opacity': pin.opacityOf }">
          {{ pin.multiplier }}
        </div>
      </div>
    </div>

    <div class="bg-secondary mt-8 bg-opacity-50 rounded-md flex">
      <div class="p-2 w-full">
        <div class="relative">
          <p>Balance :</p>
          <div class="text-3xl mt-2 font-bold">
            <div class="absolute top-4 left-8 animation-up text-green-500" v-for="text in floatingTexts" :key="text.id">
              +{{ formatCurrency.format(text.amount) }}
            </div>
            <span> {{ formatCurrency.format(money) }} </span>
            <button @click="giveMeMoney" class="ml-2 text-primary text-lg hover:bg-secondary rounded px-1">
              <Icon icon="mingcute:bank-card-fill" class="inline-block text-2xl -mt-1 -rotate-12" />
              <span class="ml-1">+Add</span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex p-2 gap-2">
        <div class="flex flex-col gap-1">
          <input
            type="number"
            v-model="gambledMoney"
            class="bg-background text-white text-lg max-w-32 text-background px-2 py-1 rounded-md"
          />
          <button
            @click="AddMore(gambledMoney, true)"
            class="bg-primary text-background px-2 py-1 font-bold rounded-md"
          >
            Start
          </button>
        </div>
        <button
          @click="AddMore(0.3)"
          class="bg-primary text-background min-w-16 px-2 py-2 text-xl font-bold rounded-md"
        >
          0.3x
        </button>
        <button
          @click="AddMore(0.5)"
          class="bg-primary text-background px-2 py-2 text-xl min-w-16 font-bold rounded-md"
        >
          0.5x
        </button>
        <button
          @click="AddMore(1)"
          class="bg-red-800 min-w-16 px-2 py-2 text-xl font-bold rounded-md whitespace-nowrap"
        >
          All In!
        </button>
      </div>
    </div>

    <div class="bg-secondary mt-2 bg-opacity-50 rounded-md p-2 flex gap-4">
      <p class="text-md">Last betting for: {{ formatCurrency.format(gambled) }}</p>
      <p>Minimum Bet : {{ formatCurrency.format(5) }}</p>
    </div>
  </div>
</template>

<style scoped>
  .canvasMatter:deep(canvas) {
    background: transparent !important;
    width: 100% !important;
    height: 100% !important;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  .animation-up {
    animation: upwego 1.25s;
  }
  @keyframes upwego {
    to {
      transform: translateY(-100px);
      opacity: 0;
    }
  }
</style>

<script setup>
  import { ref, onMounted } from "vue";
  import MatterJS from "matter-js";

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  class EventBus {
    constructor() {
      this.callbacks = {};
    }

    emit(event, ...args) {
      if (this.callbacks[event]) {
        this.callbacks[event].forEach((callback) => {
          callback(...args);
        });
      }
    }

    on(event, callback) {
      if (!this.callbacks[event]) {
        this.callbacks[event] = [];
      }
      this.callbacks[event].push(callback);
    }

    off(event, callback) {
      if (this.callbacks[event]) {
        this.callbacks[event] = this.callbacks[event].filter((cb) => cb !== callback);
      }
    }
  }

  const MatterCanvas = ref(null);

  const money = ref(1000);
  const gambledMoney = ref(5);
  const ballses = ref([]);
  const pinPoints = ref([]);
  const gambled = ref(0);
  const floatingTexts = ref([]);

  const events = new EventBus();

  const giveMeMoney = () => {
    const added = parseFloat(window.prompt("How much?", 100000));
    if (isNaN(added)) return;
    money.value += added;
  };

  onMounted(() => {
    const Engine = MatterJS.Engine.create();
    const Render = MatterJS.Render.create({
      element: MatterCanvas.value,
      engine: Engine,
      options: {
        width: 720,
        height: 720,
        wireframes: false
      }
    });

    const plinkoPegs = [];
    const plinkoMultDetections = [];
    const worldSize = [Render.options.width, Render.options.height];

    // start from 3 pegs to 18 pegs increment by 1 and centerized
    for (let i = 3; i <= 18; i++) {
      for (let j = 0; j < i; j++) {
        // with gap of 100px
        const x = (j - i / 2) * 36 + worldSize[0] / 2 + 18;

        const y = (i - 3) * 36 + 96;

        const peg = MatterJS.Bodies.circle(x, y, 6, {
          isStatic: true,
          label: "peg",
          render: {
            opacity: 0.5,
            fillStyle: "white"
          },

          restitution: 0
        });

        plinkoPegs.push(peg);
      }
    }

    for (let i = 0; i < 9; i++) {
      const multiplier = [0.2, 0.3, 0.5, 0.75, 1, 1.2, 2, 4, 10];
      const x = i * 36 + worldSize[0] / 2;
      const y = worldSize[1] - 36;
      const options = {
        opacityOf: i / 9,
        isStatic: true,
        isSensor: true,
        render: {
          opacity: 0
        },
        restitution: 0
      };
      const multDetection = MatterJS.Bodies.rectangle(x, y, 32, 32, options);
      multDetection.multiplier = multiplier[i];
      if (i !== 0) {
        const multDetectionMirror = MatterJS.Bodies.rectangle(worldSize[0] - x, y, 32, 32, options);
        multDetectionMirror.multiplier = multiplier[i];
        plinkoMultDetections.push(multDetectionMirror);
      }

      plinkoMultDetections.push(multDetection);
    }

    events.on("addBall", () => {
      const ball = MatterJS.Bodies.circle(worldSize[0] / 2 + Math.random() * 36 - 36 / 2, 36, 6, {
        render: {
          fillStyle: "red"
        },
        restitution: 0.67
      });
      ball.bettingFor = gambled.value;
      ball.label = "ball";

      ballses.value.push(ball);
      money.value -= gambled.value;
      MatterJS.Composite.add(Engine.world, ball);
    });

    const loop = () => {
      requestAnimationFrame(loop);
      ballses.value = Engine.world.bodies.filter((body) => body.label === "ball");

      pinPoints.value = plinkoMultDetections;
    };
    loop();
    const audio = new Audio("/ding-101377.mp3");
    MatterJS.Events.on(Engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;

        if (bodyB.label === "ball" && bodyA.label === "peg") {
          // increase peg opacity
          bodyA.render.opacity = 1;
        }

        if (bodyA.multiplier) {
          // Play sound
          audio.currentTime = 0;
          audio.play();
          // Remove ball
          MatterJS.Composite.remove(Engine.world, bodyB);
          const id = new Date().getTime();
          const received = Math.round(bodyA.multiplier * bodyB.bettingFor * 100) / 100;
          money.value += received;
          floatingTexts.value.push({ amount: received, id: id });

          setTimeout(() => {
            floatingTexts.value = floatingTexts.value.filter((text) => text.id !== id);
          }, 1000);

          const mult = pinPoints.value.findIndex((pin) => pin.id === bodyA.id);
          pinPoints.value[mult].hit = true;
          setTimeout(() => {
            pinPoints.value[mult].hit = false;
          }, 100);
        }
        if (bodyA.label === "bounds") {
          MatterJS.Composite.remove(Engine.world, bodyB);
        }
      });
    });

    MatterJS.Events.on(Engine, "collisionEnd", (event) => {
      const pairs = event.pairs;
      pairs.forEach((pair) => {
        const { bodyA } = pair;
        if (bodyA.label === "peg") {
          bodyA.render.opacity = 0.5;
        }
      });
    });

    const bounds = [
      MatterJS.Bodies.rectangle(worldSize[0] / 2, worldSize[1], worldSize[0], 36, {
        label: "bounds",
        isSensor: true,
        render: {
          opacity: 0
        },
        isStatic: true
      }),
      MatterJS.Bodies.rectangle(worldSize[0] / 2, -18, worldSize[0], 36, {
        isSensor: true,
        label: "bounds",
        render: {
          opacity: 0
        },
        isStatic: true
      }),
      MatterJS.Bodies.rectangle(-18, worldSize[1] / 2, 36, worldSize[1], {
        isSensor: true,
        label: "bounds",
        render: {
          opacity: 0
        },
        isStatic: true
      }),
      MatterJS.Bodies.rectangle(worldSize[0] + 18, worldSize[1] / 2, 36, worldSize[1], {
        isSensor: true,
        label: "bounds",
        render: {
          opacity: 0
        },
        isStatic: true
      })
    ];

    MatterJS.Composite.add(Engine.world, [...plinkoPegs, ...plinkoMultDetections, ...bounds]);
    MatterJS.Render.run(Render);

    const Runner = MatterJS.Runner.create();
    MatterJS.Runner.run(Runner, Engine);
  });

  const AddMore = (mult, isBalance) => {
    const moneyMulted = (isBalance ? gambledMoney.value : money.value * mult).toFixed(2);
    if (money.value < moneyMulted || moneyMulted < 5) return;

    gambled.value = moneyMulted;
    events.emit("addBall");
  };
</script>
