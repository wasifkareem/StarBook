import React from 'react';

// Helper function to format date


export function TweetRenderer({ text, entities, created_at }) {
  const allEntities = [
    ...(entities?.urls || []).map(e => ({
      type: 'url',
      start: e.indices[0],
      end: e.indices[1],
      content: e.display_url,
      href: e.expanded_url
    })),
    ...(entities?.user_mentions || []).map(e => ({
      type: 'mention',
      start: e.indices[0],
      end: e.indices[1]+1,
      content: ` @${e.screen_name+" "}`,
      href: `https://twitter.com/${e.screen_name}`
    })),
    ...(entities?.hashtags||[]).map(e => ({
      type: 'hashtag',
      start: e.indices[0],
      end: e.indices[1]+1,
      content: ` #${e.text}`,
      href: `https://x.com/hashtag/${e.text}?src=hashtag_click`
    })),
    ...(entities?.media|| []).map(e=>({
    type:'media',
    start:e.indices[0],
    end:e.indices[1]+7,
    content:''
    }))
    // Add hashtags or symbols here if needed
  ];
  // Sort by start index
  allEntities.sort((a, b) => a.start - b.start);

  const result = [];
  let lastIndex = 0;

  allEntities.forEach((entity, i) => {
    // Add plain text before entity
    if (lastIndex < entity.start) {
      result.push(text.slice(lastIndex, entity.start));
    }

    // Add entity as a link
    result.push(
      <a
        key={i}
        href={entity.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#1DA1F2', textDecoration: 'none' }}
      >
        {entity.content}
      </a>
    );

    lastIndex = entity.end;
  });

  // Add remaining text
  if (lastIndex < text?.length) {
    result.push(text.slice(lastIndex));
  }

  // Handle line breaks (`\n`)
  const withBreaks = result.flatMap((part, index) =>
    typeof part === 'string'
      ? part.split('\n').flatMap((line, i, arr) =>
          i < arr?.length - 1 ? [line, <br key={`br-${index}-${i}`} />] : [line]
        )
      : [part]
  );

  return <p className="font-sans text-[15px]" style={{ whiteSpace: 'pre-wrap' }}>{withBreaks}</p>;
}