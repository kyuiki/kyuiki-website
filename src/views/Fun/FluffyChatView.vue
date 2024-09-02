<template>
  <div class="">
    <div class="absolute flex flex-col p-2 gap-1">
      <strong>{{ messagePosts.length }} Messages</strong>
    </div>

    <div class="grid grid-cols-8 gap-2 w-full max-w-5xl mx-auto">
      <div class="col-span-1 flex flex-col gap-1 overflow-y-auto h-screen scroll-smooth">
        <!-- {{ guilds }} -->
        <button @click="onlyGuild = null">All</button>
        <button
          class="bg-secondary block rounded py-1 text-left px-2"
          v-for="(guild, i) in guilds"
          :key="guild.id"
          @click="onlyGuild = guild.id"
        >
          {{ guild.name }}
        </button>
      </div>

      <div class="col-span-2 bg-opacity-50 flex flex-col gap-1 overflow-y-auto h-screen scroll-smooth">
        <button @click="onlyChannel = null">All</button>
        <button
          class="bg-background block border border-secondary rounded py-2 text-left px-2"
          v-for="(channel, i) in channels.filter((x) => (onlyGuild ? x.guild == onlyGuild : true))"
          :key="channel.id"
          @click="onlyChannel = channel.id"
        >
          <!-- {{ channel }} -->
          {{ channel.name }}
        </button>
      </div>

      <div class="col-span-5 py-4 px-2 flex flex-col gap-2 overflow-y-auto h-screen scroll-smooth" ref="scrollDown">
        <div
          class="bg-secondary bg-opacity-50 p-2 rounded-md"
          v-for="msg in messagePosts.filter((x) =>
            onlyChannel ? x.channel.id == onlyChannel : onlyGuild ? x.guild.id == onlyGuild : true
          )"
          :key="msg.id"
        >
          <div class="flex gap-4">
            <div class="p-2 flex-shrink-0">
              <img :src="msg.author?.avatar" alt="" class="w-16 rounded-md overflow-hidden" />
            </div>
            <div class="">
              <div class="">
                <span class="font-bold text-lg" v-html="msg.author?.username"></span>
                <span v-show="msg.author?.bot" class="ml-2 rounded px-2 bg-accent">APP</span>
              </div>
              <div class="" v-html="replacer(msg.content ?? '[ empty ]')"></div>
              <div v-show="msg.attachments?.[0]" class="attachments">
                <div class="attachment-wrapper" v-for="(attach, i) in msg.attachments" :key="i">
                  <!-- <p v-show="attach.content_type?.includes('video')">{{attach}}</p> -->
                  <video class="w-full max-w-sm" v-if="attach.type?.includes('video')" controls>
                    <source :src="attach?.url" />
                  </video>
                  <img class="w-full max-w-sm" v-else :src="attach.url" alt="" />
                </div>
              </div>
              <div v-show="msg.embeds?.[0]" class="embeds">
                <div class="rounded bg-background p-3" v-for="(embed, i) in msg.embeds" :key="i">
                  <div>
                    <strong v-html="replacer(embed.title)"></strong>
                  </div>
                  <img
                    v-show="embed.type == 'image'"
                    :src="embed.thumbnail?.url ?? embed.url"
                    class="w-full max-w-sm"
                  />
                  <video v-show="embed.type == 'video'" class="w-full max-w-sm" controls>
                    <source :src="embed.video?.url ?? embed.url" />
                  </video>
                  <img v-show="embed.type == 'rich' && embed.image" :src="embed.image?.url" class="w-full max-w-sm" />
                  <div v-html="replacer(embed.description)"></div>
                  <div class="fields" v-for="(field, i) in embed.fields" :key="i">
                    <strong v-html="replacer(field.name)"></strong>
                    <span v-html="replacer(field.value)"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // import ws from "ws";
  import { ref } from "vue";

  let messagePosts = ref([]);
  let channels = ref([]);
  let guilds = ref([]);
  let mlimit = ref(10);
  let onlyChannel = ref(null);
  let onlyGuild = ref(null);
  let onlyat = ref(false),
    nobot = ref(false);
  const wsC = new WebSocket(
    "ws://localhost:4200"
    // "wss://gateway.qky.life"
  );

  let scrollDown = ref(null);

  wsC.onmessage = (out) => {
    const dataRaw = JSON.parse(out.data);

    if (dataRaw.i == 0) return dataRaw.data.forEach((x) => addMessage(x));
    const data = dataRaw.data;
    // if (data.guild_id != "368769930029563906") return;
    const max = mlimit.value;

    if (data.author?.bot && nobot.value) return console.log("Ignored Bot");

    if (!data.embeds?.length && !data.attachments?.length && onlyat.value)
      return console.log(`Ignored Non Files! ${data.attachments?.length} ${data.embeds?.length} ${onlyat.value}`);

    addMessage(data);
    // if (messagePost.value.length > max) {
    //   messagePost.value.splice(0, messagePost.value.length > max + 10 ? messagePost.value.length - max : 0);
    // }
    scrollDown.value.scrollTop = scrollDown?.value?.scrollHeight + 99999;
  };

  function addMessage(data) {
    messagePosts.value.push(data);
    const channel = channels.value.find((x) => x.id == data.channel.id);
    if (!channel) channels.value.push({ ...data.channel, guild: data.guild.id });
    const guild = guilds.value.find((x) => x.id == data.guild.id);
    if (!guild) guilds.value.push({ id: data.guild.id, name: data.guild.name });
  }

  console.log("B > ", messagePosts);
  function replacer(x) {
    if (!x) return x;
    return x
      .replace(
        /<(a?):(\w+):(\d+)>/gi,
        (_, anim, name, id) =>
          `<img class="emoji" draggable="false" alt="${name}" src="https://cdn.discordapp.com/emojis/${id}.${
            anim ? "gif" : "webp"
          }">`
      )
      .replace(/<([\@\#]&?)\d+>/gi, (_, type) => `[${type}Redacted](/)`);
  }
</script>
