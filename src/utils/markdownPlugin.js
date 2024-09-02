export const Redaction = function (md) {
  function redactedText(state) {
    const tokens = state.tokens;

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === "inline") {
        const children = tokens[i].children;
        const newTokens = [];

        for (let j = 0; j < children.length; j++) {
          const token = children[j];

          if (token.type === "text") {
            const text = token.content;
            const regex = /;-(.*?)-;/g;
            let lastIndex = 0;
            let match;

            console.log("text", text);

            // Process all matches within the text
            while ((match = regex.exec(text)) !== null) {
              const start = match.index;
              const end = regex.lastIndex;

              // Add the text before the match
              if (start > lastIndex) {
                const textToken = new state.Token("text", "", 0);
                textToken.content = text.slice(lastIndex, start);
                newTokens.push(textToken);
              }

              // Process the content inside ;-...-;
              const content = match[1];
              const contentTokens = md.parseInline(content, state.env)[0].children;

              // Wrap the content in a <span class="redacted">
              const openToken = new state.Token("html_inline", "", 0);
              openToken.content = `<Redaction>`;
              newTokens.push(openToken);

              // Add the parsed content tokens
              newTokens.push(...contentTokens);

              const closeToken = new state.Token("html_inline", "", 0);
              closeToken.content = `</Redaction>`;
              newTokens.push(closeToken);

              lastIndex = end;
            }

            // Add any remaining text after the last match
            if (lastIndex < text.length) {
              const textToken = new state.Token("text", "", 0);
              textToken.content = text.slice(lastIndex);
              newTokens.push(textToken);
            }
          } else {
            // For non-text tokens, just push them as is
            newTokens.push(token);
          }
        }

        // Replace the original token's children with the new tokens
        tokens[i].children = newTokens;
      }
    }
  }

  md.core.ruler.after("inline", "redactedText", redactedText);
};

export const Spoiler = function (md) {
  function spoilerText(state) {
    const tokens = state.tokens;

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === "inline") {
        const children = tokens[i].children;
        const newTokens = [];

        for (let j = 0; j < children.length; j++) {
          const token = children[j];

          if (token.type === "text") {
            const text = token.content;
            const regex = /\|\|(.*?)\|\|/g;
            let lastIndex = 0;
            let match;

            console.log("text", text);

            // Process all matches within the text
            while ((match = regex.exec(text)) !== null) {
              const start = match.index;
              const end = regex.lastIndex;

              // Add the text before the match
              if (start > lastIndex) {
                const textToken = new state.Token("text", "", 0);
                textToken.content = text.slice(lastIndex, start);
                newTokens.push(textToken);
              }

              // Process the content inside ;-...-;
              const content = match[1];
              const contentTokens = md.parseInline(content, state.env)[0].children;

              // Wrap the content in a <span class="redacted">
              const openToken = new state.Token("html_inline", "", 0);
              openToken.content = `<Spoiler>`;
              newTokens.push(openToken);

              // Add the parsed content tokens
              newTokens.push(...contentTokens);

              const closeToken = new state.Token("html_inline", "", 0);
              closeToken.content = `</Spoiler>`;
              newTokens.push(closeToken);

              lastIndex = end;
            }

            // Add any remaining text after the last match
            if (lastIndex < text.length) {
              const textToken = new state.Token("text", "", 0);
              textToken.content = text.slice(lastIndex);
              newTokens.push(textToken);
            }
          } else {
            // For non-text tokens, just push them as is
            newTokens.push(token);
          }
        }

        // Replace the original token's children with the new tokens
        tokens[i].children = newTokens;
      }
    }
  }

  md.core.ruler.after("inline", "spoilerText", spoilerText);
};
