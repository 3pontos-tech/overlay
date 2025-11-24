export const splitAccentText = (text: string) => {
  const parts = text.split(/(<![^>]+!>)/).filter(Boolean);

  return parts.map((part) => {
    const accentText = part.match(/<!(.*?)!>/)?.[1];
    if (accentText)
      return {
        type: "highlighted" as const,
        text: accentText,
      };

    return {
      type: "default" as const,
      text: part,
    };
  });
};
