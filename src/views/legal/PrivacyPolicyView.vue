<template>
  <div class="p-2 mx-auto max-w-5xl">
    <div class="border-2 border-secondary">
      <div class="p-4 bg-background border-b-2 border-secondary border-dashed">
        <p class="float-right text-sm">
          <span class="opacity-75"> Last Updated: </span>
          <strong> Aug 14, 2024 </strong>
        </p>
        <h1 class="text-3xl font-bold">Privacy Policy</h1>
      </div>
      <div class="px-4 py-2 pb-4 bg-background">
        <MarkdownComp :content="privacyPolicy" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import MarkdownComp from "@/components/MarkdownComponent.vue";

  const privacyPolicy = ref(
    `
### What information do we collect?
- **Email Address**: We collect your email address when you sign up for an account.
- **Hashed IP Address**: We collect your **Hashed IP Address** when you visit our website and use our services.

---

### How do we use your information?
- **Email Address**: We use your email address to authenticate your account.
- **Hashed IP Address**: We store your Hashed IP Address to prevent unauthorized access to your account, and to prevent abuse of our services. Hashed meaning we do not store your actual IP Address, but a hashed version of it. Which means we cannot reverse the hash to get your actual IP Address.

---
### Removal of your information
When you delete your account, we delete all information associated with your account. This includes your email address and hashed IP Address. There will be no way to recover your account once it's deleted.

However. For posts, comments, etc. you've created, we do not delete them. We keep them as is, but we disassociate them from your account. Meaning, your username will be removed from the post, and your account will be marked as deleted.

But, If you want your posts, comments, etc. to be deleted, you can check the "Delete all my posts, comments, etc." option when deleting your account. This will delete all posts, comments, etc. you've created.

If in any case you forgot to check the option, you can contact us to delete your posts, comments, etc. manually.
`
  );
</script>
