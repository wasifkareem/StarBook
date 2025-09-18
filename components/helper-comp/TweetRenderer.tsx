import { useAppContext } from '@/context/AppContext';
import React, { ReactElement, useState } from 'react';
import z from 'zod';

const UrlEntitySchema = z.object({
  indices: z.tuple([z.number(), z.number()]),
  display_url: z.string(),
  expanded_url: z.string(),
});

const MentionEntitySchema = z.object({
  indices: z.tuple([z.number(), z.number()]),
  screen_name: z.string(),
});

const HashtagEntitySchema = z.object({
  indices: z.tuple([z.number(), z.number()]),
  text: z.string(),
});

const MediaEntitySchema = z.object({
  indices: z.tuple([z.number(), z.number()]),
});

const EntitiesSchema = z.object({
  urls: z.array(UrlEntitySchema).optional(),
  user_mentions: z.array(MentionEntitySchema).optional(),
  hashtags: z.array(HashtagEntitySchema).optional(),
  media: z.array(MediaEntitySchema).optional(),
});

const TweetRendererSchema = z.object({
  text: z.string(),
  entities: EntitiesSchema.optional(),
  isAdmin:z.boolean().optional()
});

type TweetRendererProps = z.infer<typeof TweetRendererSchema>;

type RenderEntity =
  | {
      type: 'url';
      start: number;
      end: number;
      content: string;
      href: string;
    }
  | {
    type: 'mention';
    start: number;
    end: number;
    content: string;
    href: string;
  }
  | {
      type: 'hashtag';
      start: number;
      end: number;
      content: string;
      href: string;
    }
  | {
      type: 'media';
      start: number;
      end: number;
      content: string;
      href?: undefined;
    };

export function TweetRenderer({ text, entities, isAdmin}: TweetRendererProps): ReactElement {
  const { state } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const CHARACTER_LIMIT = 180;
  const isLongText = text.length > CHARACTER_LIMIT;
  
  // Truncate text if needed
  const displayText = isLongText && !isExpanded 
    ? text.slice(0, CHARACTER_LIMIT) + '...'
    : text;

  const urls = entities?.urls ?? [];
  const mentions = entities?.user_mentions ?? [];
  const hashtags = entities?.hashtags ?? [];
  const media = entities?.media ?? [];

  const allEntities: RenderEntity[] = [
    ...urls.map((e) => ({
      type: 'url' as const,
      start: e.indices[0],
      end: e.indices[1],
      content: e.display_url,
      href: e.expanded_url,
    })),
    ...mentions.map((e) => ({
      type: 'mention' as const,
      start: e.indices[0],
      end: e.indices[1] + 1,
      content: ` @${e.screen_name} `,
      href: `https://twitter.com/${e.screen_name}`,
    })),
    ...hashtags.map((e) => ({
      type: 'hashtag' as const,
      start: e.indices[0],
      end: e.indices[1] + 1,
      content: ` #${e.text}`,
      href: `https://x.com/hashtag/${e.text}?src=hashtag_click`,
    })),
    ...media.map((e) => ({
      type: 'media' as const,
      start: e.indices[0],
      end: e.indices[1] + 7,
      content: '',
    })),
  ];

  // Filter entities that are within the display text range
  const visibleEntities = isLongText && !isExpanded
    ? allEntities.filter(entity => entity.start < CHARACTER_LIMIT)
    : allEntities;

  visibleEntities.sort((a, b) => a.start - b.start);

  const result: Array<string | React.JSX.Element> = [];
  let lastIndex = 0;

  visibleEntities.forEach((entity, i) => {
    if (lastIndex < entity.start) {
      result.push(displayText.slice(lastIndex, entity.start));
    }

    result.push(
      <span key={`${entity.type}-${entity.start}-${i}`} style={{ color: '#1DA1F2', textDecoration: 'none' }}>
        {entity.content}
      </span>
    );

    lastIndex = entity.end;
  });

  if (lastIndex < displayText.length) {
    result.push(displayText.slice(lastIndex));
  }

  const withBreaks: Array<string | React.JSX.Element> = result.flatMap((part, index) =>
    typeof part === 'string'
      ? part.split('\n').flatMap((line, i, arr) =>
          i < arr.length - 1 ? [line, <br key={`br-${index}-${i}`} />] : [line]
        )
      : [part]
  );

  return (
    <div>
      {isAdmin ?<p 
        className={`font-sans ml-1 text-[15px] my-7`} 
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {withBreaks}
      </p>:<p 
        className={`font-sans ml-1 ${state.field=='sm' && "text-[13px] my-5"} ${state.field=='base' && "text-[15px] my-7"} ${state.field=='lg' && "text-[18px] my-10"}`} 
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {withBreaks}
      </p>}
      
      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`text-blue-500 hover:text-blue-700 hover:underline ml-1 ${state.field=='sm' && "text-[12px]"} ${state.field=='base' && "text-[14px]"} ${state.field=='lg' && "text-[16px]"}`}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}